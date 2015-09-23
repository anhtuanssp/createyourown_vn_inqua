;(function ($,window,document,undefined){
	
	CP.MainCanvas = function (){
		this.getActiveObject = function (){

			if(this.is_state){
				return this.canvas.getActiveObject();
			}else{
				return this.canvas_back.getActiveObject();
			}
			
		}
	};
	CP.MainCanvas.prototype.$el = null;
	CP.MainCanvas.prototype.$elDriectionProduct = null;

	CP.MainCanvas.prototype.$elCanvasFront = null;
	CP.MainCanvas.prototype.$elCanvasBack = null;

	CP.MainCanvas.prototype.html = '';
	CP.MainCanvas.prototype.canvas = null;
	CP.MainCanvas.prototype.canvas_back = null;
	CP.MainCanvas.prototype.widthCanvas = 600;
	CP.MainCanvas.prototype.heightCanvas = 500;

	CP.MainCanvas.prototype.casePhone = null;
	CP.MainCanvas.prototype.casePhone_mask = null;

	CP.MainCanvas.prototype.id_product = 0;

	//Class and id
	CP.MainCanvas.prototype.hoverDragClass = "hover-drag";
	CP.MainCanvas.prototype.hoverDragIconClass  = "hover-drag-icon";

	CP.MainCanvas.prototype.getIdProduct = function(){
		return this.id_product;
	}

	CP.MainCanvas.prototype.casePhone_back = null;
	CP.MainCanvas.prototype.casePhone_back_mask = null;

	CP.MainCanvas.prototype.maskBackgroundCanvas = null;

	CP.MainCanvas.prototype.centerX = 0;
	CP.MainCanvas.prototype.centerY = 0;

	CP.MainCanvas.prototype.textDict = [];
	CP.MainCanvas.prototype.assetImgDict = [];

	CP.MainCanvas.prototype.is_state = true;//front
	CP.MainCanvas.prototype.hasBack = false;

	CP.MainCanvas.prototype.lineWidth = 12;
	CP.MainCanvas.prototype.lineColor = '#000';

	jQuery.event.props.push('dataTransfer');

	CP.MainCanvas.prototype.init = function (){
		this.html = '<div class="main-canvas-container" >'+
						'<div class="direction_product" style="  position: absolute;top: -54px;left: 4%;cursor: pointer;">'+
							'<span class="size-32">'+
								'<i class="icon ion-ios-loop"></i>'+
								'<span class="name_status"></span>'+
							'</span>'+
						'</div>'+

						'<div class="canvas_front">'+
							'<canvas id="{0}" width="{1}" height="{2}" style="z-index:8"></canvas>'+
						'</div>'+
						
						'<div class="canvas_back" style="  position: absolute;top: 0;left:10px;visibility:hidden">'+
							'<canvas id="matsau" width="600" height="500"></canvas>'+
						'</div>'+

					'</div>';
		this.html = this.html.format(MYLIB.constant.main_canvas_id,this.widthCanvas,this.heightCanvas);

		this.$el = $(this.html);

		this.$elDriectionProduct = this.$el.find('.direction_product');
		this.$elCanvasFront = this.$el.find('.canvas_front');
		this.$elCanvasBack = this.$el.find('.canvas_back');

		this.bindEvents();
	}


	CP.MainCanvas.prototype.getElement = function () {

		return this.$el;

	}
	CP.MainCanvas.prototype.getCanvas = function () {

		return this.casePhone;

	}

	//RENDER CANVAS
	CP.MainCanvas.prototype.renderLayout = function () {


		this.canvas = new fabric.Canvas(MYLIB.constant.main_canvas_id,
			{ renderOnAddition: false, hoverCursor: 'pointer', selection: true,isDrawingMode: false });
		this.canvas_back = new fabric.Canvas(matsau,
			{ renderOnAddition: false, hoverCursor: 'pointer', selection: true,isDrawingMode: false  });
		var that = this;

		this.canvas.on('after:render', function (e) {

		});
		this.canvas.on('before:selection:cleared',function(e){
	
		});
		this.canvas.on({
			'touch:gesture' : function() {
				console.log('TOUCH:GESTURE');
			},
			'touch:drag': function() {
				console.log('TOUCH:DRAG');
			},
			'touch:orientation': function() {
				
			},
			'touch:shake': function() {

			},
			'touch:longpress': function() {

			},     
			'object:selected': function(opt) {
		        //hook up dynamic zorder
				// opt.target.bringToFront();
		    }
		});

	}

	CP.MainCanvas.prototype.showBackProductHandle = function(event){

		if(this.is_state){
			this.$elCanvasFront.css('visibility', 'hidden');
			this.$elCanvasBack.css('visibility','visible');
			this.is_state = false;
			this.$el.find('.name_status').text('Mặt sau')
		}else{
			this.$elCanvasFront.css('visibility', 'visible');
			this.$elCanvasBack.css('visibility','hidden');
			this.is_state = true;
			this.$el.find('.name_status').text('Mặt trước')
		}
	}

	// EVENT
	CP.MainCanvas.prototype.bindEvents = function () {

		/**
		 * VERY IMPORTANT
		 * Please do not edit if not nessesary
		 */
		MYLIB.eventManager.subscribe(this,MYLIB.eventNames.chooseProductItem,'chooseProductHandle');
		MYLIB.eventManager.subscribe(this,MYLIB.eventNames.saveCanvas,'saveCanvasHandle');
		MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_submit_text,'addTextHandle');
		MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_fontSize,'fontSizeHandle');
		MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_change_color,'changeColorHandle');
		MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_delete_item,'deleteHandle');
		MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_duplicate_item,'duplicateHandle');
		MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_change_font,'changeFontHandle');
		MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_opacity,'changeOpacityHandle');
		MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_switch_drawmode,'switchDrawModeHandle');
		MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_free_draw,'freeDrawHandle');
		MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_set_line_width_free_draw,'setLineWidthFreeDrawHandle');
		MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_set_line_color_free_draw,'setLineColorFreeDrawHandle');
		

		//IMAGE UPLOAD
		MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_upload_from_computer,'addImageUploadHandle');
		MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_upload_from_asset,'addImageUploadFormAssetHandle');

		$(window).unbind('keydown').bind('keydown',this,this.onKeyDownHandler);
		
		if( !MYLIB.detectBrower() ) {
			var that = this;
			this.$el.addClass(this.hoverDragIconClass)
			this.$el.bind('dragenter', function(e){
				console.log('dragenter');
				
	      		if (e.preventDefault) { e.preventDefault(); }
	      			return false;
			});
			this.$el.bind('dragleave', function(e){
				that.$el.removeClass(that.hoverDragClass);
	      		if (e.preventDefault) { e.preventDefault(); }
	      			return false;
			});
	   		this.$el.bind('dragover', function(e){
	   			that.$el.addClass(that.hoverDragClass);
				if (e.preventDefault) { e.preventDefault(); }
					return false;
	   		});
	   		this.$el.bind('drop',function(e){
	   			that.dragDropImageToCanvas.call(that,e)
	   		});

		}

	}
	CP.MainCanvas.prototype.dragDropImageToCanvas = function(e){
		if (e.preventDefault) { e.preventDefault(); } // stops the browser from redirecting off to the image.
		this.$el.removeClass(this.hoverDragClass);
		var that = this;
	     jQuery.each( e.dataTransfer.files, function(index, file){
	     	var mimeType= file.type; //mime type of file list first entry
	     	console.log(mimeType);

	     	if(!MYLIB.checkValidMineType(mimeType)){
	     		alert('File phải là hình, chỉ chấp nhận các file kiểu PNG, JPG, JPEG');
	     		return false;
	     	}
	     	
			var fileReader = new FileReader();
			    fileReader.onload = (function(file) {
			       return function(e) { 
			       // body.append('<div class="dataurl"><strong>' + file.fileName + '</strong>' + e.target.result + '</div>') 
			       		console.log(file.name);
			       		MYLIB.eventManager.fireEvent(that,MYLIB.eventNames.event_upload_from_computer,e.target.result);
			       }; 
			    })(file);
			fileReader.readAsDataURL(file);
		});


		return false;
	}
	// HANDLE EVENT
	CP.MainCanvas.prototype.deleteHandle = function (event){
		var activeObject = this.getActiveObject();
	    if (activeObject){

		    if(this.is_state){
				//FRONT
		    	this.canvas.remove(activeObject);
		    	this.canvas.renderAll();
			}else{
		    	this.canvas_back.remove(activeObject);
	    		this.canvas_back.renderAll();
			}

	    }
	}
	CP.MainCanvas.prototype.duplicateHandle = function (event) {
		var activeObject = this.getActiveObject();
	        if (activeObject){
	        	var duplicate = fabric.util.object.clone(activeObject);

    			if(this.is_state){
					//FRONT
					this.canvas.add(duplicate);
	        		this.canvas.renderAll();
				}else{
					this.canvas_back.add(duplicate);
	        		this.canvas_back.renderAll();
				}
	        }
	}
	CP.MainCanvas.prototype.onKeyDownHandler= function(e) {
		var that = e.data;
	   switch (e.keyCode) {
	      case 46: // delete
	         var activeObject = that.getActiveObject();
	         if (activeObject){

	         	//IF TEXT
	         	//REMOVE OBJECT FROM CANVAS AND this.TextDict
	         	var activeType = activeObject.type || 'khongro';

	         	switch(activeType){
	         		
	         		case 'MyText':
	    
	         			for (var i = 0; i < that.textDict.length; i++) {
	         				var textId = that.textDict[i].getID();
	         				var activeTextId = activeObject.getID();
	         				if(textId === activeTextId){
	         					console.log('Find');
	         					that.textDict.splice(i, 1)
	         				}
	         			};
	         			console.log(that.textDict);
				         if(that.is_state){
							//FRONT
							that.canvas.remove(activeObject);
						}else{
							that.canvas_back.remove(activeObject);
						}
	         			
	         			break;
	         		default:
	         			if(that.is_state){
							//FRONT
							that.canvas.remove(activeObject);
						}else{
							that.canvas_back.remove(activeObject);
						}
	         			break;
	         	}

	         }
	         return;
	   }
	}
	CP.MainCanvas.prototype.fontSizeHandle = function (event) {
		var fontSizeValue = event.data;
		console.log(fontSizeValue);
		var activeObject = this.getActiveObject();

		if (activeObject){

			var activeType = activeObject.type || 'khongro';

         	switch(activeType){
         		
         		case 'text':
         			activeObject.fontSize = fontSizeValue;
		         	if(this.is_state){
						//FRONT
						this.canvas.renderAll();
					}else{
						this.canvas_back.renderAll();
					}
         			break;
         	}
		}
	}
	CP.MainCanvas.prototype.changeColorHandle = function (event){
		console.log('change color');
		var hexColor = event.data;

		console.log(hexColor);

		var activeObject = this.getActiveObject();

		if (activeObject){

			activeObject.set({fill : '#'+hexColor});
			if(this.is_state){
				//FRONT
				this.canvas.renderAll();
			}else{
				this.canvas_back.renderAll();
			}

		}
	}
	CP.MainCanvas.prototype.chooseProductHandle = function (event) {

		MYLIB.eventManager.fireEvent(
			this,MYLIB.eventNames.event_load_product_success,event.data.price);


		var data = event.data;

		var _this = this;

		// set id product
		this.id_product = data.product_id;

		/**
		 * Check coi san pham co mat sau hay khong
		 */
		
		this.hasBack = data.isBack;

		if(this.hasBack){
			this.$elDriectionProduct.show();
			this.$elDriectionProduct
				.unbind('click')
				.bind('click',this.showBackProductHandle.bind(this));
			this.$el.find('.name_status').text('Mặt trước')
		}else{
			this.$elDriectionProduct.hide();
			this.$elDriectionProduct.unbind('click')
		}

		/**
		* Load front
		*/
	
		MYLIB.LOADING();

		this.casePhone_mask = data.product_img_primary_mask;
		
		this.canvas.clear();
		if(this.hasBack){
			this.canvas_back.clear();
		}

		//LOAD IMAGE CASE PHONE
		fabric.Image.fromURL(data.product_img_primary, function(oImg) {
			_this.canvas.setWidth( _this.widthCanvas )
  		  	_this.canvas.setHeight( _this.heightCanvas )
	  		var numberScale = _this.canvas.width / oImg.width;
			if( numberScale  < 1 ){
					oImg.scale(numberScale);
			}else{
				numberScale = 1;
			}

			_this.casePhone = oImg;
		  	_this.canvas.add(_this.casePhone);
		  	_this.casePhone.selectable  =  false;
		  	_this.centerX = _this.casePhone.currentWidth / 2;
  		  	_this.centerY = _this.casePhone.currentHeight / 2;

  		  	//OVERLAY IMAGE MASK
  		  	_this.canvas.setOverlayImage(data.product_img_primary_mask, _this.canvas.renderAll.bind(_this.canvas),{
				scaleX : numberScale,
				scaleY : numberScale
			} );

			 _this.canvas.setWidth( _this.casePhone.currentWidth )
  		  	_this.canvas.setHeight( _this.casePhone.currentHeight )
			_this.canvas.renderAll();

			MYLIB.REMOVE_LOADING();
		});

		if(this.hasBack){
			/**
			 * Load back 
			 */
			MYLIB.LOADING();
			this.casePhone_back_mask = data.product_img_back_mask;
			this.canvas_back.clear();

			//LOAD IMAGE CASE PHONE
			fabric.Image.fromURL(data.product_img_back, function(oImg) {
				_this.canvas_back.setWidth( _this.widthCanvas )
	  		  	_this.canvas_back.setHeight( _this.heightCanvas )
		  		var numberScale = _this.canvas_back.width / oImg.width;
				if( numberScale  < 1 ){
						oImg.scale(numberScale);
				}else{
					numberScale = 1;
				}

				_this.casePhone_back = oImg;
			  	_this.canvas_back.add(_this.casePhone_back);
			  	_this.casePhone_back.selectable  =  false;
			  	_this.centerX = _this.casePhone_back.currentWidth / 2;
	  		  	_this.centerY = _this.casePhone_back.currentHeight / 2;

	  		  	//OVERLAY IMAGE MASK
	  		  	_this.canvas_back.setOverlayImage(data.product_img_back_mask, 
	  		  		_this.canvas_back.renderAll.bind(_this.canvas_back),{
					scaleX : numberScale,
					scaleY : numberScale
				} );

				 _this.canvas_back.setWidth( _this.casePhone_back.currentWidth )
	  		  	_this.canvas_back.setHeight( _this.casePhone_back.currentHeight )
				_this.canvas_back.renderAll();
				MYLIB.REMOVE_LOADING();
			});
		}

	}


	CP.MainCanvas.prototype.addTextHandle = function (event) {
		var textValue = event.data;

		var textObj = new fabric.IText(textValue);

		textObj.fontSize = CP_INIT.text.fontSize;
		textObj.fontFamily = CP_INIT.text.fontFamilyDefault;

		textObj.left = this.centerX-50;
		textObj.top = this.centerY-50;


		this.textDict.push(textObj);

		if(this.is_state){
			//FRONT
			this.canvas.add(textObj);
			this.canvas.renderAll();
		}else{
			this.canvas_back.add(textObj);
			this.canvas_back.renderAll();
		}
		

		
	}


	CP.MainCanvas.prototype.addImageUploadHandle = function (event) {
		var that = this;
		var src = event.data;
		var scrCopy = event.data;
		MYLIB.eventManager.fireEvent(that,MYLIB.eventNames.event_display_img,scrCopy)
		
		var imgObj = new Image();
		imgObj.src = src;
		MYLIB.LOADING();
		imgObj.onload = function () {
			MYLIB.REMOVE_LOADING();
		  var image = new fabric.Image(imgObj,{
  				centeredScaling : true,
  				centeredRotation : true
		  });
		  var numberScale = that.casePhone.currentWidth / imgObj.width;
		  if( numberScale  < 1 ){
		  		image.scale(numberScale);
		  }
		  var objcount = that.canvas.getObjects().length;

			if(that.is_state){
				//FRONT
				console.log('ADD IMAGE TO FRONT');
			  that.canvas.add(image);
			  that.canvas.renderAll();
			}else{
				console.log('ADD IMAGE TO BACk');
			  that.canvas_back.add(image);
			  that.canvas_back.renderAll();
			}


		}
	}

	CP.MainCanvas.prototype.addImageUploadFormAssetHandle = function (event){
		var that = this;
		var src = event.data.src;
		var scrCopy = event.data.src;
		var id = event.data.id;
		var thumb = event.data.thumb;
		MYLIB.eventManager.fireEvent(that,MYLIB.eventNames.event_display_img,scrCopy)
		
		var imgObj = new Image();
		imgObj.src = src;
		MYLIB.LOADING();
		imgObj.onload = function () {
			MYLIB.REMOVE_LOADING();
		  var image = new fabric.Image(imgObj,{
		  	 	// left: that.centerX-100,
  				// top: that.centerY-100,
  				centeredScaling : true,
  				centeredRotation : true
		  });
		  var numberScale = that.casePhone.currentWidth / imgObj.width;
		
		  if( numberScale  < 1 ){
		  		image.scale(numberScale);
		  }
		  var objcount = that.canvas.getObjects().length;

		if(that.is_state){
			//FRONT
			console.log('ADD IMAGE TO FRONT');
		  that.canvas.add(image);
		  that.canvas.renderAll();
		}else{
			console.log('ADD IMAGE TO BACk');
		  that.canvas_back.add(image);
		  that.canvas_back.renderAll();
		}

		  if(that.assetImgDict){
		  	that.assetImgDict.push({id : id, src : src,thumb : thumb})
		  }
		  console.log(that.assetImgDict);

		}
	}

	//DRAW SHAPE 
	CP.MainCanvas.prototype.drawShape = function (type){
		switch(type){
			case 'CIRCLE':
				// statements_1
				console.log('DRAW CIRCLE NOW');
				var that = this;
				var circle = new fabric.Circle({
				  radius: 50, left: that.centerX-100, top:  that.centerY-100, borderColor  : '#000'
				});

				if(that.is_state){
					//FRONT
					this.canvas.add(circle);
					this.canvas.renderAll();
				}else{
					this.canvas_back.add(circle);
					this.canvas_back.renderAll();
				}
				break;
			case 'RECT':
				// statements_1
				console.log('DRAW RECT NOW');
				  var rect = new fabric.Rect({
				    left: 150,
				    top: 200,
				    originX: 'left',
				    originY: 'top',
				    width: 150,
				    height: 120,
				    // angle: -10,
				    fill: 'green',
				    transparentCorners: false
				  });

				if(this.is_state){
					//FRONT
					this.canvas.add(rect);
					this.canvas.renderAll();
				}else{
					this.canvas_back.add(rect);
					this.canvas_back.renderAll();
				}
				break;
			default:
				// statements_def
				break;
		}
	}
	//SHOW UP HANDLE
	CP.MainCanvas.prototype.showUpHandle = function (event){
		console.log('SHOW UP ');
		if(this.getActiveObject()){
			this.getActiveObject().bringForward();
		}
		
	}
	CP.MainCanvas.prototype.BackToUpHandle = function (){
		console.log('BACK');
		if(this.getActiveObject()){
			this.getActiveObject().sendBackwards();
		}
	}
	CP.MainCanvas.prototype.rotateRepeatHandle = function (){
		console.log('BACK');
		var that = this;
		if(this.getActiveObject()){
			this.rotateObject(90);
		}
	}

	CP.MainCanvas.prototype.rotateObject = function (angleOffset) {
	    var obj = this.getActiveObject(),
	        resetOrigin = false;

	    if (!obj) return;

	    var angle = obj.getAngle() + angleOffset;

	    if ((obj.originX !== 'center' || obj.originY !== 'center') && obj.centeredRotation) {
	        obj.setOriginToCenter && obj.setOriginToCenter();
	        resetOrigin = true;
	    }

	    angle = angle > 360 ? 90 : angle < 0 ? 270 : angle;

	    obj.setAngle(angle).setCoords();

	    if (resetOrigin) {
	        obj.setCenterToOrigin && obj.setCenterToOrigin();
	    }

		if(this.is_state){
			//FRONT
			this.canvas.renderAll();
		}else{
			this.canvas_back.renderAll();
		}
	}

	CP.MainCanvas.prototype.saveCanvasHandle = function (event) {

		// this.canvas.deactivateAll().renderAll();
		// this.canvas.setOverlayImage(null)
		// this.canvas.remove(this.canvas.item(0));
		// var svg = this.canvas.toSVG();	

		// return this.canvas.toDataURL({
		// 	format: 'png',
 	// 		 multiplier: 2
		// })
		// 
		console.log(this.getImageFrontToPrint());
			

	} 

	CP.MainCanvas.prototype.saveCanvasToSVG = function (event){
		this.canvas.deactivateAll().renderAll();
		return this.canvas.item(1).toSVG();
	}

	CP.MainCanvas.prototype.saveCanvasToImg = function (event) {
		this.canvas.deactivateAll().renderAll();
		var svg = this.canvas.toSVG();	
		return this.canvas.toDataURL();
	} 

	CP.MainCanvas.prototype.saveCanvasBackToImg = function (event) {
		this.canvas_back.deactivateAll().renderAll();
		var svg = this.canvas_back.toSVG();	
		return this.canvas_back.toDataURL();
	} 

	CP.MainCanvas.prototype.getImageFrontToPrint = function(event){

		this.canvas.deactivateAll().renderAll();
		this.canvas.setOverlayImage(null)
		this.canvas.remove(this.canvas.item(0));

		var dataurl = this.canvas.toDataURL({
			format: 'png',
 			 multiplier: 2
		});
		console.log(dataurl);
		return dataurl;

	}

	CP.MainCanvas.prototype.getImageBackToPrint = function(event){

		this.canvas_back.deactivateAll().renderAll();
		this.canvas_back.setOverlayImage(null)
		this.canvas_back.remove(this.canvas_back.item(0));

		var dataurl = this.canvas_back.toDataURL({
			format: 'png',
 			multiplier: 2
		});
		console.log(dataurl);
		return dataurl;
		
	}

	CP.MainCanvas.prototype.zoomHandle = function (event){
		var type = event;
		console.log('ZOOm');
		var activeObject = this.getActiveObject();
		if(!activeObject)
			return;

		switch(type){
			case 'ZOOMIN':
				var scale  = activeObject.getScaleX();
				activeObject.scale(parseFloat(scale+0.05)).setCoords();
		    	if(this.is_state){
					//FRONT
					this.canvas.renderAll();
				}else{
					this.canvas_back.renderAll();
				}
				break;
			case 'ZOOMOUT':
				var scale  = activeObject.getScaleX();
				activeObject.scale(parseFloat(scale-0.05)).setCoords();
		    	if(this.is_state){
					//FRONT
					this.canvas.renderAll();
				}else{
					this.canvas_back.renderAll();
				}
				break;

		}
	}

	CP.MainCanvas.prototype.rotateHandle = function (event){
		var type = event;
		console.log('ROTATE');
		var activeObject = this.getActiveObject();
		if(!activeObject)
			return;

		switch(type){
			case 'ROTATELEFT':
				var ag  = activeObject.getAngle();
				activeObject.setAngle(parseInt(ag-10)).setCoords();
    			if(this.is_state){
					//FRONT
					this.canvas.renderAll();
				}else{
					this.canvas_back.renderAll();
				}
				break;
			case 'ROTATERIGHT':
				var ag  = activeObject.getAngle();
				activeObject.setAngle(parseInt(ag+10)).setCoords();
    			if(this.is_state){
					//FRONT
					this.canvas.renderAll();
				}else{
					this.canvas_back.renderAll();
				}
				break;

		}
	}

	CP.MainCanvas.prototype.changeFontHandle = function(event){
		var text = this.getActiveObject();
		var font = event.data;

		text.fontFamily = font;
		
		if(this.is_state){
			//FRONT
			this.canvas.renderAll();
		}else{
			this.canvas_back.renderAll();
		}
		

	}

	CP.MainCanvas.prototype.changeOpacityHandle = function (event) {
		console.log('Change opacity');
		var opacity = event.data;

		var activeObj = this.getActiveObject();

		if(activeObj){
			activeObj.opacity = opacity/100;
			if(this.is_state){
				//FRONT
				this.canvas.renderAll();
			}else{
				this.canvas_back.renderAll();
			}
		}
	}

	CP.MainCanvas.prototype.switchDrawModeHandle = function(event){
		var status = event.data;
		this.canvas.isDrawingMode = status;
		if(this.hasBack)
			this.canvas_back.isDrawingMode = status;

		console.log(status)
	}
	
	CP.MainCanvas.prototype.freeDrawHandle = function(event){
		var type = event.data;
		if(this.is_state){
			this.canvas.freeDrawingBrush = new fabric[type + 'Brush'](this.canvas);
			this.canvas.freeDrawingBrush.width = parseInt(this.lineWidth, 10) || 1;
			this.canvas.freeDrawingBrush.color = this.lineColor;
		}else{
			this.canvas_back.freeDrawingBrush = new fabric[type + 'Brush'](this.canvas_back);
			this.canvas_back.freeDrawingBrush.width = parseInt(this.lineWidth, 10) || 1;
			this.canvas_back.freeDrawingBrush.color = this.lineColor;
		}

	}

	CP.MainCanvas.prototype.setLineWidthFreeDrawHandle = function(event){
		var type = event.data;
		this.lineWidth = type;
		if(this.is_state){
			this.canvas.freeDrawingBrush.width = parseInt(this.lineWidth, 10) || 1
		}else{
			this.canvas_back.freeDrawingBrush.width = parseInt(this.lineWidth, 10) || 1
		}
	}
	CP.MainCanvas.prototype.setLineColorFreeDrawHandle = function(event){
		var type = event.data;
		this.lineColor = type;
		if(this.is_state){
			this.canvas.freeDrawingBrush.color = this.lineColor;
		}else{
			this.canvas_back.freeDrawingBrush.color = this.lineColor;
		}
	}
	

	MYLIB.mixin(CP.MainCanvas, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)