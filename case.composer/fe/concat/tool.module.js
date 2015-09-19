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
		// console.log(this);
		var maincanvas = this.callbackScopeRightModule.mainCanvas;
		maincanvas.showUpHandle.call(maincanvas)
	}

	CP.ToolController.prototype.backObjectUpHandle = function () {
		// console.log(this);
		var maincanvas = this.callbackScopeRightModule.mainCanvas;
		maincanvas.BackToUpHandle.call(maincanvas)
	}
	CP.ToolController.prototype.rotateRepeatHandle = function () {
		// console.log(this);
		var maincanvas = this.callbackScopeRightModule.mainCanvas;
		maincanvas.rotateRepeatHandle.call(maincanvas)
	}
	CP.ToolController.prototype.checkOutHandle = function () {
		// console.log('CALL CHECKOUT NOW');
		/**
		 * RESET OVELARY IMAGE
		 */
		this.callbackScopeRightModule.mainCanvas.resetOverlayImageCanvas();
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
;(function ($,window,document,undefined){
	
	CP.ToolsModule = function (){
		this.controller = null;

		this.callbackScopeRightModule = null;
	};


	CP.ToolsModule.prototype.init = function (callbackScopeRightModule,succesLoadLayout) {
		this.controller = new CP.ToolController();
		this.callBackFunction = callbackScopeRightModule;

		this.controller.init(callbackScopeRightModule,succesLoadLayout);
	}


	MYLIB.mixin(CP.ToolsModule, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)
;(function ($,window,document,undefined){
	
	CP.ToolModelService = function (){
		this.path = 'js/module/tool.module/view/tool.view.html';
		this.data = {
			title : 'Tools'
		}
	};

	
	CP.ToolModelService.prototype.init = function () {
		return true;
	}


	CP.ToolModelService.prototype.getElement = function () {

	}

	CP.ToolModelService.prototype.bindEvent = function () {
		
	}



	MYLIB.mixin(CP.ToolModelService, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)
;(function ($,window,document,undefined){
	
	CP.ToolView = function (){
		this.$el = null;
		this.$btnShowup = null;
		this.$btnBackup = null;
		this.$btnRotateRepeat = null;
		this.$btnCheckOut = null;
		this.$btnOpenEffectImgs = null;
		this.$btnOpenFont = null;
		this.$btnOpenEditImgs = null;

		this.modelService = null;
		this.init = function (modelService){
			this.modelService = modelService;
		}
	};

	
	CP.ToolView.prototype.render = function (successHandle) {
		var that = this;
		$.get(this.modelService.path, function(tmp) {
			var source = $(tmp).html();
			var template = Handlebars.compile(source);
			var result = template(that.modelService.data);
			
			that.$el = $(result);
			that.initElement.call(that);
			successHandle.call(this);
		});
	}

	CP.ToolView.prototype.initElement = function () {
		var that = this;
		this.$btnShowup = this.$el.find('.show-up');
		this.$btnBackup = this.$el.find('.back-up');
		this.$btnRotateRepeat = this.$el.find('.rotate-repeat');
		this.$btnCheckOut = this.$el.find('.checkout-btn');
		this.$btnOpenEffectImgs = this.$el.find('.open-effect-img');
		this.$btnOpenFont = this.$el.find('.open-fonts');
		this.$btnOpenEditImgs = this.$el.find('.open-edit-img');
		$('[data-toggle="tooltip"]').tooltip()
	}

	CP.ToolView.prototype.getElement = function () {
		return this.$el;
	}

	CP.ToolView.prototype.bindEvent = function (scopeController) {
		this.$btnShowup
			.unbind('click touchstart')
			.bind('click touchstart', scopeController.showObjectUpHandle.bind(scopeController));
		this.$btnBackup
			.unbind('click touchstart')
			.bind('click touchstart', scopeController.backObjectUpHandle.bind(scopeController));
		this.$btnRotateRepeat
			.unbind('click touchstart')
			.bind('click touchstart', scopeController.rotateRepeatHandle.bind(scopeController));
		// this.$btnCheckOut
		// 	.unbind('click touchstart')
		// 	.bind('click touchstart', scopeController.checkOutHandle.bind(scopeController));
		var that = this;
		MYLIB.click(that.$btnCheckOut,scopeController.checkOutHandle.bind(scopeController));
		this.$btnOpenEffectImgs
			.unbind('click touchstart')
			.bind('click touchstart', scopeController.openPopupEditImgs.bind(scopeController));
		this.$btnOpenFont
			.unbind('click touchstart')
			.bind('click touchstart', scopeController.openPopupFonts.bind(scopeController));

		MYLIB.click(that.$btnOpenEditImgs,scopeController.openPopupEditPictures.bind(scopeController));

	}



	MYLIB.mixin(CP.ToolView, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)