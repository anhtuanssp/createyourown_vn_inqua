;(function ($,window,document,undefined){
	
	CP.ToolController = function (){
		//VIEW
		this.view = null;
		//model
		this.model = null;

		//CALLBACK FROM DASHBOARD
		this.callbackScopeRightModule = null;
	};

 
	CP.ToolController.prototype.init = function (callbackScopeRightModule,succesLoadLayout) {

		this.callbackScopeRightModule = callbackScopeRightModule;

		this.view = new CP.ToolView();
		this.model = new CP.ToolModelService();

		this.model.init();

		this.view.init(this.model);

		this.view.render(this.renderView.bind(this,succesLoadLayout));

		// this.bindEvent();
	}

	CP.ToolController.prototype.renderView = function (succesLoadLayout) {
		//CALLBACK FUNCTION FROM MODULE
		succesLoadLayout.call(this);
		this.bindEvent();
		
	}

	CP.ToolController.prototype.bindEvent = function () {
		this.view.bindEvent(this);
	}

	//HANDLE EVENT
	CP.ToolController.prototype.showObjectUpHandle = function (){
		console.log(this);
		var maincanvas = this.callbackScopeRightModule.mainCanvas;
		maincanvas.showUpHandle.call(maincanvas)
	}

	CP.ToolController.prototype.backObjectUpHandle = function () {
		console.log(this);
		var maincanvas = this.callbackScopeRightModule.mainCanvas;
		maincanvas.BackToUpHandle.call(maincanvas)
	}
	CP.ToolController.prototype.rotateRepeatHandle = function () {
		console.log(this);
		var maincanvas = this.callbackScopeRightModule.mainCanvas;
		maincanvas.rotateRepeatHandle.call(maincanvas)
	}
	CP.ToolController.prototype.checkOutHandle = function () {
		console.log('CALL CHECKOUT NOW');
		MYLIB.eventManager.fireEvent(this,MYLIB.eventNames.event_checkout,true);
	}

	CP.ToolController.prototype.openPopupEditImgs = function (){
		/**
		 * Dashboard will handle it
		 */
		MYLIB.eventManager.fireEvent(this, MYLIB.eventNames.event_open_edit_imgs,true);
	}

	CP.ToolController.prototype.openPopupFonts = function () {
		/**
		 * Dashboard will handle it
		 */
		MYLIB.eventManager.fireEvent(this, MYLIB.eventNames.event_open_font_edit,true);
	}

	CP.ToolController.prototype.openPopupEditPictures = function(){
		/**
		 * Dashboard will handle it
		 */
		MYLIB.eventManager.fireEvent(this, 'OPEN_EDIT_PICTURES',true);
	}

	MYLIB.mixin(CP.ToolController, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)