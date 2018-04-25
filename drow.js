class Drow{
	
	constructor(data={}) {
		this.parameters(data);
	}
	parameters(data={}) {
		if("width" in data) this.width = parseInt(data['width']);
		else this.width = 1200;
		if("height" in data) this.height = parseInt(data['height']);
		else this.height = 600;
		if("mark_X" in data) this.mark_X = data['mark_X'];
		else this.mark_X = 'X';
		if("mark_Y" in data) this.mark_Y  = data['mark_Y'];
		else this.mark_Y  = 'Y';
		if("title" in data) this.title = data['title'];
		else this.title = 'No name';
		if("border_X_left" in data) this.border_X_left = parseInt(data['border_X_left']);
		else this.border_X_left = 75;
		if("border_X_right" in data) this.border_X_right = parseInt(data['border_X_right']);
		else this.border_X_right = 75;
		if("border_Y_top" in data) this.border_Y_top = parseInt(data['border_Y_top']);
		else this.border_Y_top = 55;
		if("border_Y_bottom" in data) this.border_Y_bottom = parseInt(data['border_Y_bottom']);
		else this.border_Y_bottom = 40;
		if("max_X" in data) this.max_X = parseFloat(data['max_X']);
		else this.max_X = 100;
		if("max_Y" in data) this.max_Y = parseFloat(data['max_Y']);
		else this.max_Y = 100;
		if("min_X" in data) this.min_X = parseFloat(data['min_X']);
		else this.min_X = 0;
		if("min_Y" in data) this.min_Y = parseFloat(data['min_Y']);
		else this.min_Y = 0;
		if("color_border" in data) this.color_border = data['color_border'];
		else this.color_border = "rgb(110, 110, 110)";
		if("color_mark" in data) this.color_mark = data['color_mark'];
		else this.color_mark = '#1a92d1';
		if("background_color" in data) this.background_color = data['background_color'];
		else this.background_color = '#fff';
		if("color" in data) this.color = data['default_color'];
		else this.color = '#000';
		if("font_size_title" in data) this.font_size_title = parseInt(data['font_size_title']);
		else this.font_size_title = '24';
		if("font_size_mark" in data) this.font_size_mark = parseInt(data['font_size_mark']);
		else this.font_size_mark = '24';
		if("img_type" in data) this.img_type = data['img_type'];
		else this.img_type = 'img';
	}
//метод розраховує параметри для маштабування і відображення даних на графіку
zoomOption(){
	this.Xe = (this.width - this.border_X_left -this.border_X_right) / (this.max_X -  this.min_X);
	this.dX = this.border_X_left - this.min_X * this.Xe;
	this.Ye = (this.height - this.border_Y_top - this.border_Y_bottom) / (this.min_Y -  this.max_Y);
	this.dY =  this.border_Y_top - this.max_Y * this.Ye;
}
//відмальовує рамку навкого графіка
border(){
	this.ctx.lineWidth = 2;
	this.ctx.strokeStyle = this.color_border;
	this.ctx.rect(this.border_X_left , this.border_Y_top, (this.width - this.border_X_right-this.border_X_left) , (this.height-this.border_Y_bottom-this.border_Y_top));
	this.ctx.stroke();
}
background(){
	this.ctx.beginPath();
	this.ctx.rect(0, 0, this.width, this.height);
	this.ctx.fillStyle = this.background_color;
	this.ctx.fill();
}
//відмальовує назву графіка
writeTitle(){
	this.ctx.font = this.font_size_title+'px Calibri';
	this.ctx.fillStyle = this.color_mark ;
	var w = this.ctx.measureText(this.title).width;
	this.ctx.fillText(this.title, (this.width-w)/2, 25);
	this.ctx.stroke();
}
//відмальовує підписи координат графіка
mark_X_Y(){
	this.ctx.font = this.font_size_title+'px Calibri';
	this.ctx.fillStyle = this.color_mark ;
	this.ctx.fillText(this.mark_X, this.width+5-this.border_X_right, this.height-this.border_Y_bottom);
	this.ctx.fillText(this.mark_Y, this.border_X_left, this.border_Y_top-8);
	this.ctx.stroke();
}
//відмальовує сітку паралельоно осі Y, виводит значення на осі X
//приймає параметри int $n=4, $flag=1
//$n - кількість пунктирних ліній
//$flag - 1 -виводить лінії і значення по Х, 0-виводить тільки лінії, -1 -виводить тільки значення
//$r округлення значння до певного порядку
 grid_X(n=10, flag=0, r=2, font_size=20){
		var x, dx, value;
		this.ctx.lineWidth = 1;
		this.ctx.font = font_size+'px Calibri';
		x = (this.width - (this.border_X_left + this.border_X_right)) / (n+1);
		dx = this.border_X_left + x;
		this.ctx.beginPath();
		for(var i=0; i<n; i++){
			this.ctx.moveTo(dx, this.height-this.border_Y_bottom);
			this.ctx.lineTo(dx, this.height-this.border_Y_bottom+5);
			if(flag==1 || flag ==0){
				this.ctx.strokeStyle = this.color_border;
				this.ctx.moveTo(dx, this.border_Y_top);
				this.ctx.lineTo(dx, this.height-this.border_Y_bottom);
			}
			if(flag==1 || flag ==-1){
				this.ctx.fillStyle = this.color_mark ;
				value = ((dx - this.dX)/this.Xe).toFixed(r);
				this.ctx.fillText(value, dx-this.ctx.measureText(value).width/2, this.height - this.border_Y_bottom+20);
				
			}
			dx+=x;
		}
		
		if(flag==1 || flag ==-1){
			this.ctx.fillText(this.min_X.toFixed(r), this.border_X_left-this.ctx.measureText(this.min_X.toFixed(r)).width/2, this.height - this.border_Y_bottom+20);
			this.ctx.fillText(this.max_X.toFixed(r), this.width-this.border_X_right-this.ctx.measureText(this.max_X.toFixed(r)).width/2, this.height - this.border_Y_bottom+20);
		}
		
		this.ctx.stroke();
		
	}
//відмальовує сітку паралельоно осі X, виводит значення на осі Y
	//приймає параметри int $n=4, $flag=1
	//$n - кількість пунктирних ліній
	//$flag - 1 -виводить лінії і значення по Y, 0-виводить тільки лінії, -1 -виводить тільки значення
	//$r округлення значння до певного порядку
	 grid_Y(n=5, flag=1, r=2,font_size=20){
		var y, dy, value; 
		this.ctx.lineWidth = 1;
		this.ctx.font = font_size+'px Calibri';
		var y = (this.height - (this.border_Y_bottom + this.border_Y_top)) / (n+1);
		var dy = this.border_Y_top + y;
		this.ctx.beginPath();
		for(var i=0; i<n; i++){
			this.ctx.moveTo(this.border_X_left-5, dy);
			this.ctx.lineTo(this.border_X_left, dy);
			if(flag==1 || flag ==0){
				this.ctx.strokeStyle = this.color_border;
				this.ctx.moveTo(this.border_X_left, dy);
				this.ctx.lineTo(this.width-this.border_X_right, dy);
			}
			if(flag==1 || flag ==-1){
				this.ctx.fillStyle = this.color_mark ;
				value = ((dy - this.dY) / this.Ye).toFixed(r);
				this.ctx.fillText(value, this.border_X_left - this.ctx.measureText(value).width-5, dy+7);
			}
			dy+=y;
		}
		
		if(flag==1 || flag ==-1){
			this.ctx.fillText(this.min_Y.toFixed(r), this.border_X_left-this.ctx.measureText(this.min_Y.toFixed(r)).width-5, this.height - this.border_Y_bottom+5);
			this.ctx.fillText(this.max_Y.toFixed(r), this.border_X_left-this.ctx.measureText(this.max_Y.toFixed(r)).width-5, this.border_Y_top+5);
		}
		
		this.ctx.stroke();
		
	}	
//Метод створює канву
 createCanvas(idDiv, idCanvas) {
		//var div = document.getElementById("myList");
		var div = document.getElementById(idDiv);
		/*div.style.width = this.width+'px';
		div.style.height = this.height+'px';*/
		
		var oldCanvas = document.getElementById(idCanvas);
		if(oldCanvas) oldCanvas.remove();
		
		var c = document.createElement('canvas');
		c.setAttribute('class', 'canvas');
		c.setAttribute('width', this.width);
		c.setAttribute('height', this.height);
		if (this.img_type =='img') c.style.display='none';
		c.setAttribute('id', idCanvas);
		div.appendChild(c);
		this.canvas = document.getElementById(idCanvas);
		this.ctx = this.canvas.getContext('2d');
	}
 createImg(c,data){ alert(this.img_type);
	if (this.img_type =='canvas') return true;
	var oldimg = document.getElementById('img_'+data['div_id']);
	if(oldimg) oldimg.remove();
	var img = document.createElement('img');
	var div = document.getElementById(data['div_id']);
		img.setAttribute('class', 'img');
		img.setAttribute('id', 'img_'+data['div_id']);
		img.setAttribute('class', 'js_plot');
		img.setAttribute('data_name_img', data['div_id']);
		img.setAttribute('src', c);
		div.appendChild(img);
}
	initialization(data){
		this.parameters(data);
		this.createCanvas(data['div_id'], data['div_id']+'_canvas');
		this.zoomOption();
		if(parseInt(data['background'])==1) this.background();
		
		if(data['bordre_flaf'] !=0 )this.border();
		if(data['title_flaf'] !=0 )this.writeTitle();
		if(data['mark_X_Y_flaf'] !=0 )this.mark_X_Y();
		if(data['grid_X'] && data['grid_X']!=0){
			let line=10, flag=1, round=2, font_size=20;
			if(data['grid_X']['line']) line = parseInt(data['grid_X']['line']);
			if(data['grid_X']['flag']) flag = parseInt(data['grid_X']['flag']);
			if(data['grid_X']['round']) round = parseInt(data['grid_X']['round']);
			if(data['grid_X']['font_size']) font_size = parseInt(data['grid_X']['font_size']);
			this.grid_X(line, flag, round, font_size);
		}
		else if(data['grid_X']!=0)this.grid_X(10, 1, 2);
		//******************************************************//
		//******************************************************//
		if(data['grid_Y'] && data['grid_Y']!=0){
			let line=10, flag=1, round=2, font_size=20;
			if(data['grid_Y']['line']) line = parseInt(data['grid_Y']['line']);
			if(data['grid_Y']['flag']) flag = parseInt(data['grid_Y']['flag']);
			if(data['grid_Y']['round']) round = parseInt(data['grid_Y']['round']);
			if(data['grid_Y']['font_size']) font_size = parseInt(data['grid_Y']['font_size']);
			this.grid_Y(line, flag, round, font_size);
		}
		else if(data['grid_Y']!=0) this.grid_Y(10, 1, 2);
		//******************************************************//
		//******************************************************//

	}
	graph(arr, data={}){
		
		var min_X = Infinity, max_X = -Infinity, min_Y = Infinity, max_Y = -Infinity, x, key, i,xe,ye, radius, style, break_i=0;
		for(key in arr) {			
			for(x in arr[key]){
				if ( parseFloat(x) < min_X) min_X = parseFloat(x);
				if ( parseFloat(x) > max_X) max_X = parseFloat(x);
				if ( parseFloat(arr[key][x]) < min_Y) min_Y = parseFloat(arr[key][x]);
				if ( parseFloat(arr[key][x]) > max_Y) max_Y = parseFloat(arr[key][x]);
			}
		}

		this.max_X = max_X;
		this.max_Y = max_Y;
		this.min_X = min_X;
		this.min_Y = min_Y;
		
		this.initialization(data);
		
		this.ctx.lineWidth = 3;
		radius = 2;
		style = 1;
		if(data['style']){
			if(data['style']['lineWidth'] && parseInt(data['style']['lineWidth'])>0) this.ctx.lineWidth = parseInt(data['style']['lineWidth']);
			if(data['style']['radius']/* && parseInt(data['style']['lineWidth'])>0*/) radius = parseInt(data['style']['radius']);
			//style 1-лінії з залитими крапками, 2 - самі лінії, 3-лінія з прозорими крапками, 4 - залиті крапки, 5 - прозорі крапки
			if(data['style']['style'] && parseInt(data['style']['style'])>0) style = parseInt(data['style']['style']);
		}
		//побудова ліній
		if(style==1 || style==2 || style==3){
			break_i=0;
			for(key in arr) {
				break_i++;
				//якщо є переданий колір в настройках використовуєм його
				if(data['color']){
					if(data['color'][key]){
						this.ctx.strokeStyle = data['color'][key];
					}
				}//берем стандартний колір	
				else{
					this.ctx.strokeStyle = this.color;
				}
				
				this.ctx.beginPath();
				i=0;
				for(x in arr[key]){
					xe = parseFloat(x) * this.Xe + this.dX;
					ye = parseFloat(arr[key][x]) * this.Ye + this.dY;			
					if (i<1){
						this.ctx.moveTo(xe,ye);
					}
					else{
						this.ctx.lineTo(xe,ye);
					}
					i++;
				}
				this.ctx.stroke();
			}
		}
		//малюєм фігури на лінії
		if(style==1 || style==3|| style==4|| style==5){
			break_i=0;
			this.ctx.beginPath();
			for(key in arr) {
				break_i++;
				if(data['color']){
					if(data['color'][key]){//якщо передали колір берем його
						if(data['background']==1 && !(style==1 || style==4)) this.ctx.fillStyle = this.background_color; //якщо відмальовуєм фон і потрібно малювати пусті кружки , берем колір фону для заливки.
						else this.ctx.fillStyle = data['color'][key];						
						this.ctx.strokeStyle = data['color'][key];
					}
				}
				else{
					if(data['background']==1 && !(style==1 || style==4)) this.ctx.fillStyle = this.background_color;
					else this.ctx.fillStyle = data['color'][key];						
					this.ctx.strokeStyle = data['color'][key];
				}
				for(x in arr[key]){
					xe = parseFloat(x) * this.Xe + this.dX;
					ye = parseFloat(arr[key][x]) * this.Ye + this.dY;
					this.ctx.beginPath();
					this.ctx.arc(xe, ye, radius, 0, 2 * Math.PI, false);
					this.ctx.stroke();
					if(style==1 || style==3 || style==4 || style==5){ //робим заливу фігури
						this.ctx.fill();
					}
				}	
			}	
		}
		
		if(data['legenda']){
			this.legenda(data, break_i);
		}
		
		var img = this.canvas.toDataURL('image/png',1);
		this.createImg(img, data);
		return	true;		
	}
	legenda(data, break_i){
		var x0 = this.width-this.border_X_right+5, x1 = this.border_X_right-5, y0 = this.border_Y_top, y1, k, i=0;
		console.log(break_i);
		for(k in data['legenda']){
			if(i==break_i) break;
			i++;
			if(data['color'][k]) {this.ctx.fillStyle = data['color'][k]; this.ctx.strokeStyle = data['color'][k];}
			else {this.ctx.fillStyle = this.color; this.ctx.strokeStyle = this.color;}
			this.ctx.fillRect(x0+5, y0+i*20-12, 10, 10);
			this.ctx.fillText(data['legenda'][k], x0+20, y0+i*20);
		}
		
		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = this.color_border;
		this.ctx.rect(x0 , y0, x1 , i*20+5);
		this.ctx.stroke();
	}
	gist_X(arr, data={}){
		
		var min_X = Infinity, max_X = -Infinity, min_Y = Infinity, max_Y = -Infinity, x, key, i,xe,ye, border, style, count={}, n=0, h, d, d_px, d_px_2;
		
		for(key in arr) { 
			for(x in arr[key]){
				if ( parseFloat(x) < min_X) min_X = parseFloat(x);
				if ( parseFloat(x) > max_X) max_X = parseFloat(x);
				if ( parseFloat(arr[key][x]) < min_Y) min_Y = parseFloat(arr[key][x])
				if ( parseFloat(arr[key][x]) > max_Y) max_Y = parseFloat(arr[key][x])
				count["'"+arr[key][x]+"'"]=0;
			}
		}
	
		if(!data['max_X']) data['max_X'] = max_X;
		if(!data['max_Y']) data['max_Y'] = max_Y;
		if(!data['min_X']) data['min_X'] = min_X;
		if(!data['min_Y']) data['min_Y'] = min_Y;
	
	
		for(var k in count) n++; //кількість гістаграм що не перекрились
		h = max_Y - min_Y;	//діапазон значення
			d = h/n- h/n/5; //максимальна товщина гістаграми
			d_px = parseInt(((this.height-this.border_Y_bottom-this.border_Y_top)-(this.height-this.border_Y_bottom-this.border_Y_top)/5)/n);
			d_px_2 = parseInt(d_px/2);
		if(!data['style']['width'] || parseInt(data['style']['width'])<=0){	
			if((min_Y-d/4)<data['min_Y']) data['min_Y'] = parseFloat(data['min_Y']) - d/2;
			if((max_Y+d/4)>data['max_Y']) data['max_Y'] = parseFloat(data['max_Y']) + d/2;
		}
		
		border = 0;
		style = 1;
		if(data['style']){
			if(data['style']['border'] && parseInt(data['style']['border'])>0) border = parseInt(data['style']['border']);
			
			if(data['style']['style'] && parseInt(data['style']['style'])>0) style = parseInt(data['style']['style']);

			if(data['style']['width'] && parseInt(data['style']['width'])>0){
				d = parseInt(data['style']['width'])*(h/n- h/n/5)/d_px_2;
				d_px_2 = parseInt(data['style']['width']);
				if((min_Y-d/4)<data['min_Y']) data['min_Y'] = parseFloat(data['min_Y']) - d/2;
				if((max_Y+d/4)>data['max_Y'])  data['max_Y'] = parseFloat(data['max_Y']) + d/2;
			}
		
		}
		
		this.initialization(data);

		for(key in arr) {
			this.ctx.beginPath();
				//якщо є переданий колір в настройках використовуєм його
				if(data['color']){
					if(data['color'][key])
						this.ctx.fillStyle = data['color'][key];
					else
						this.ctx.fillStyle = this.color;
				}
				if(border !=0){
					if(data['border'][key])
						this.ctx.strokeStyle = data['border'][key];
					else
						this.ctx.strokeStyle = this.color;
				}
				
				this.ctx.lineWidth = border;
				for(x in arr[key]){
					xe = parseFloat(x) * this.Xe + this.dX - this.border_X_left-border/2;
					ye = parseFloat(arr[key][x]) * this.Ye + this.dY-border/2-d_px_2/2;
					this.ctx.fillRect(this.border_X_left+border/2,ye,xe,d_px_2);
					this.ctx.rect(this.border_X_left+border/2,ye,xe,d_px_2);
					if(data['style']['mark']){
						var x_mark, y_mark;
						this.ctx.font = data['style']['mark']+'px Calibri';
						x_mark = this.border_X_left+border/2 + xe + 10;
						y_mark = ye  + (d_px_2)/2 + parseInt(data['style']['mark'])/4;
						this.ctx.fillText(x, x_mark, y_mark) ;
					}
				}
				this.ctx.stroke();
			}
		
		var img = this.canvas.toDataURL('image/png',1);
		this.createImg(img, data);
		return	true;		
	}
	
	gist_Y(arr, data={}){
		var min_X = Infinity, max_X = -Infinity, min_Y = Infinity, max_Y = -Infinity, x, key, i,xe,ye, border, style, count={}, n=0, h, d, d_px, d_px_2;
		
		for(key in arr) { 
			for(x in arr[key]){
				if ( parseFloat(x) < min_X) min_X = parseFloat(x);
				if ( parseFloat(x) > max_X) max_X = parseFloat(x);
				if ( parseFloat(arr[key][x]) < min_Y) min_Y = parseFloat(arr[key][x])
				if ( parseFloat(arr[key][x]) > max_Y) max_Y = parseFloat(arr[key][x])
				count["'"+x+"'"]=0;
			}
		}
	
		if(!data['max_X']) data['max_X'] = max_X;
		if(!data['max_Y']) data['max_Y'] = max_Y;
		if(!data['min_X']) data['min_X'] = min_X;
		if(!data['min_Y']) data['min_Y'] = min_Y;
	
	
		for(var k in count) n++; //кількість гістаграм що не перекрились
		h = max_X - min_X;	//діапазон значення
			d = h/n- h/n/5; //максимальна товщина гістаграми
			d_px = parseInt(((this.height-this.border_X_right-this.border_X_left)-(this.height-this.border_X_right-this.border_X_left)/5)/n);
			d_px_2 = parseInt(d_px/2);
		if(!data['style']['width'] || parseInt(data['style']['width'])<=0){	
			if((min_X-d/4)<data['min_X']) data['min_X'] = parseFloat(data['min_X']) - d/2;
			if((max_X+d/4)>data['max_X']) data['max_X'] = parseFloat(data['max_X']) + d/2;
		}
		
		border = 0;
		style = 1;
		if(data['style']){
			if(data['style']['border'] && parseInt(data['style']['border'])>0) border = parseInt(data['style']['border']);
			
			if(data['style']['style'] && parseInt(data['style']['style'])>0) style = parseInt(data['style']['style']);

			if(data['style']['width'] && parseInt(data['style']['width'])>0){
				d = parseInt(data['style']['width'])*(h/n- h/n/5)/d_px_2;
				d_px_2 = parseInt(data['style']['width']);
				if((min_X-d/4)<data['min_X']) data['min_X'] = parseFloat(data['min_X']) - d/2;
				if((max_X+d/4)>data['max_X'])  data['max_X'] = parseFloat(data['max_X']) + d/2;
			}
		
		}
		
		this.initialization(data);

		for(key in arr) {
			this.ctx.beginPath();
				//якщо є переданий колір в настройках використовуєм його
				if(data['color']){
					if(data['color'][key])
						this.ctx.fillStyle = data['color'][key];
					else
						this.ctx.fillStyle = this.color;
				}
				if(border !=0){
					if(data['border'][key])
						this.ctx.strokeStyle = data['border'][key];
					else
						this.ctx.strokeStyle = this.color;
				}
				
				this.ctx.lineWidth = border;
				for(x in arr[key]){
					xe = parseFloat(x) * this.Xe + this.dX-d_px_2/2;
					ye = parseFloat(arr[key][x]) * this.Ye + this.dY;
					this.ctx.fillRect(xe, ye, d_px_2, this.height-this.border_Y_bottom-ye-border);
					this.ctx.rect(xe, ye, d_px_2, this.height-this.border_Y_bottom-ye-border);
					if(data['style']['mark']){
						var x_mark, y_mark;
						this.ctx.font = data['style']['mark']+'px Calibri';
						x_mark = xe + d_px_2/2 - parseFloat(this.ctx.measureText(arr[key][x]).width)/2;
						y_mark = ye - 5;
						this.ctx.fillText(arr[key][x], x_mark, y_mark) ;
					}
					if(data['grid_X_key']>0){
						var x_mark, y_mark;
						this.ctx.font = data['grid_X_key']+'px Calibri';
						x_mark = xe + d_px_2/2 - parseFloat(this.ctx.measureText(x).width)/2;
						y_mark = this.height-this.border_Y_bottom +  parseInt(data['grid_X_key']);
						this.ctx.fillText(x, x_mark, y_mark) ;
					}
				}
				this.ctx.stroke();
			}
		
		var img = this.canvas.toDataURL('image/png',1);
		this.createImg(img, data);	
		return	true;	
	}
					
}		
// end class Drow------------------------------------------------------------------