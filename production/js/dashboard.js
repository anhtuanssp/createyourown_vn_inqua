;(function ($,window,document,undefined){
	
	CP.Dashboard = function (){

		var _this = this;
		var html = '<div id="{0}"" class="{1}"></div>';

		this.$el = null;
		this.leftModule = null;
		this.rightModule = null;
		this.controlModule = null;

		this.editImgsModule = null;
		this.editFontModule = null;
		this.snapshotPopupModule = null;
		this.cropImageModule = null;

		//DASHBOARD SẼ QUẢN LÝ ORDER CỦA USER
		this.orderModule = null;

		MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_open_edit_imgs,'openEditImgsHandles');
		MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_open_font_edit,'openPopupFontHandles');
		MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_open_snapshot,'openPopupSnapshotHandles');
		MYLIB.eventManager.subscribe(this,'OPEN_EDIT_PICTURES','openPopupEditPicturesHandler')

		this.init = function () {
			
			this.initModules();

			this.leftModule = new CP.LeftZone();

			this.leftModule.init();


			this.renderLayout();

			//BIND EVENT
			MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_checkout,'checkOutHandle');

			

		}

		this.initDesignProduct = function (argId) {

			this.initModules();

			this.leftModule = new CP.LeftZone();

			this.leftModule.initDesignProduct(argId);


			this.renderLayout();

			//BIND EVENT
			MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_checkout,'checkOutHandle');
		}

		this.initModules = function (){

			html = html.format(MYLIB.constant.dashboard_id,MYLIB.constant.dashboard_class);
			
			this.$el = $(html);

			this.rightModule = new CP.RightZone();

			this.rightModule.init();

			this.controlModule = new CP.ControlModule();

			this.controlModule.init(this);

			this.orderModule = new CP.OrderModule(this);

			this.editImgsModule = new CP.EditImgsModule(this);
			this.editImgsModule.init();

			this.editFontModule = new CP.EditFontModule(this);
			this.editFontModule.init();

			this.snapshotPopupModule = new CP.SnapShotModule(this);
			this.snapshotPopupModule.init();
			
			this.cropImageModule = new CP.CropImageModule(this);
			this.cropImageModule.init();

		}

		this.getElement = function () {

			return this.$el;

		}

		this.renderLayout = function () {

			this.$el.append(this.leftModule.getElement());
			
			this.$el.append(this.rightModule.getElement());

			this.$el.append(this.controlModule.getElement());
		}


	};


	//CHECKOUT HANDLE
	CP.Dashboard.prototype.checkOutHandle = function (){
		// console.log('DASHBOARD SẼ SỬ LÝ');
		/**
		 * 1. CHECK CANVAS INIT OR NOT?
		 */
		var instanceCanvas = this.rightModule.mainCanvas.getCanvas();
		if(!instanceCanvas){
			alert('Vui lòng chọn sản phẩm để design trước khi order!')
			return
		}
		/**
		 * 2. CHECK USER IS ANONYMOUS HAY ĐÃ ĐĂNG NHẬP RỒI
		 */
		if(this.checkStatusUser()){

			this.orderModule.init();
			this.orderModule.show();

		}
	}	

	/**
	 * CHECK USER LOGIN
	 */
	CP.Dashboard.prototype.checkStatusUser = function () {
		return true;
	}

	/**
	 * Handle event MYLIB.eventNames.event_open_edit_imgs
	 */
	CP.Dashboard.prototype.openEditImgsHandles = function () {
		// check chọn hình hay chưa
		var maincanvas = this.rightModule.getMainCanvas();
		var activeObject = maincanvas.getActiveObject();

		// console.log(activeObject);
		if(activeObject){
			var type = activeObject.type;
			if(type =='image'){
				var src = activeObject.getSrc();
				// console.log(activeObject);
				this.editImgsModule.show(src)
			}else{
				alert('Vui lòng chọn hình ảnh trước')
			}

		}else{
			alert('Vui lòng chọn hình ảnh trước')
		}
		
	}

	/**
	 * Handle event openPopupFontHandles from toolController
	 */
	CP.Dashboard.prototype.openPopupFontHandles = function () {
		// console.log('OPEN POPUP FONT');
				// check chọn hình hay chưa
		var maincanvas = this.rightModule.getMainCanvas();
		var activeObject = maincanvas.getActiveObject();

		// console.log(activeObject);
		if(activeObject){
			var type = activeObject.type;
			if(type =='i-text'){
				this.editFontModule.show()
			}else{
				alert('Vui lòng chọn text trước')
			}

		}else{
			alert('Vui lòng chọn text trước')
		}
	}

	CP.Dashboard.prototype.appleEffectImg = function (src){
		
		var maincanvas = this.rightModule.getMainCanvas();
		var activeObject = maincanvas.getActiveObject();
		var elementActive = activeObject.getElement();

		MYLIB.eventManager.fireEvent(this,MYLIB.eventNames.event_upload_from_computer,src);
		if(maincanvas.is_layerCircle){
	    	maincanvas.canvas_layerCircle.remove(activeObject);
	    	
			maincanvas.canvas_layerCircle.renderAll();
		}else{
			if(maincanvas.is_state){
				maincanvas.canvas.remove(activeObject);
				
		    	maincanvas.canvas.renderAll();
			}else{
				maincanvas.canvas_back.remove(activeObject);
				
				maincanvas.canvas_back.renderAll();
			}
		}
        

	}

	CP.Dashboard.prototype.openPopupEditPicturesHandler = function(){
		// check chọn hình hay chưa
		var maincanvas = this.rightModule.getMainCanvas();
		var activeObject = maincanvas.getActiveObject();

		// console.log(activeObject);
		if(activeObject){
			var type = activeObject.type;
			if(type =='image'){
				var src = activeObject.getSrc();
				// console.log(activeObject);
				this.cropImageModule.show(src)
			}else{
				alert('Vui lòng chọn hình ảnh trước')
			}

		}else{
			alert('Vui lòng chọn hình ảnh trước')
		}
	}

	CP.Dashboard.prototype.openPopupSnapshotHandles = function(){
		this.snapshotPopupModule.show()
	}

})(jQuery,window,document)