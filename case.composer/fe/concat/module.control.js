;(function ($,window,document,undefined){
	
	CP.ControlController = function (){
		//VIEW
		this.view = null;
		//model
		this.model = null;

		//CALLBACK FROM DASHBOARD
		this.callbackScopeDashboard = null;
	};

 
	CP.ControlController.prototype.init = function (callbackScopeDashboard,succesLoadLayout) {

		this.callbackScopeDashboard = callbackScopeDashboard;

		this.view = new CP.ControlView();
		this.model = new CP.ControlModelSerive();
		this.model.init();

		this.view.init(this.model);

		this.view.render(this.renderView.bind(this,succesLoadLayout));

		// this.bindEvent();
	}

	CP.ControlController.prototype.renderView = function (succesLoadLayout) {
		//CALLBACK FUNCTION FROM MODULE
		succesLoadLayout.call(this);
		this.bindEvent();
		
	}

	CP.ControlController.prototype.bindEvent = function () {
		this.view.bindEvent(this)
	}


	CP.ControlController.prototype.zoomHandle = function (event){
		// console.log(event.data);
		// var number  = $(event.currentTarget).data('number');
		// console.log(this.callbackScopeDashboard.rightModule.mainCanvas);

		var maincanvasModuleCallback = this.callbackScopeDashboard.rightModule.mainCanvas;
		maincanvasModuleCallback.zoomHandle.call(maincanvasModuleCallback,event.data);
	}

	CP.ControlController.prototype.rotateHandle = function (event){
		// console.log(event.data);
		var maincanvasModuleCallback = this.callbackScopeDashboard.rightModule.mainCanvas;
		maincanvasModuleCallback.rotateHandle.call(maincanvasModuleCallback,event.data);
	}


	MYLIB.mixin(CP.ControlController, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)
;(function ($,window,document,undefined){
	
	CP.ControlModuleObject = function (){
		this.controller = null;

		this.callBackFunction = null;
	};


	CP.ControlModuleObject.prototype.init = function (callbackScopeDashboard,succesLoadLayout) {
		this.controller = new CP.ControlController();
		this.callBackFunction = callbackScopeDashboard;

		this.controller.init(callbackScopeDashboard,succesLoadLayout);
	}


	MYLIB.mixin(CP.ControlModuleObject, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)
;(function ($,window,document,undefined){
	
	CP.ControlModelSerive = function (){
		this.path = 'js/module/module.control/view/template.html';
		this.data = {
			title : 'Chỉnh sửa',
			zoom : {
				title : 'Zom',
				class : 'zoom-control'
			},
			rotate  : {
				title : 'Rotate',
				class : 'rotate-control'
			},
		}
	};

	
	CP.ControlModelSerive.prototype.init = function () {
		return true;
	}


	CP.ControlModelSerive.prototype.getElement = function () {

	}

	CP.ControlModelSerive.prototype.bindEvent = function () {
		
	}



	MYLIB.mixin(CP.ControlModelSerive, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)
;(function ($,window,document,undefined){
	
	CP.ControlView = function (){
		this.$el = null;
		this.$btnZoomIn = null;
		this.$btnZoomOut = null;

		this.rotateRight = null;
		this.rotateLeft = null;

		this.modelService = null;
		this.init = function (modelService){
			this.modelService = modelService;
		}
	};

	
	CP.ControlView.prototype.render = function (successHandle) {
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

	CP.ControlView.prototype.initElement = function () {
		var that = this;
		// console.log(that.modelService.circle.class);/
		this.$btnZoomIn = this.$el.find('.zoom-in');
		this.$btnZoomOut = this.$el.find('.zoom-out');
		this.rotateRight = this.$el.find('.rotate-right');
		this.rotateLeft = this.$el.find('.rotate-left');
		// this.$btnRect = this.$el.find('.'+that.modelService.data.rect.class);
	}

	CP.ControlView.prototype.getElement = function () {
		return this.$el;
	}

	CP.ControlView.prototype.bindEvent = function (scopeController) {
		this.$btnZoomIn
			.unbind('click touchstart')
			.bind('click touchstart','ZOOMIN',scopeController.zoomHandle.bind(scopeController))
		this.$btnZoomOut
			.unbind('click touchstart')
			.bind('click touchstart','ZOOMOUT',scopeController.zoomHandle.bind(scopeController));

		this.rotateRight
			.unbind('click touchstart')
			.bind('click touchstart','ROTATERIGHT',scopeController.rotateHandle.bind(scopeController));
		this.rotateLeft
			.unbind('click touchstart')
			.bind('click touchstart','ROTATELEFT',scopeController.rotateHandle.bind(scopeController));
	}



	MYLIB.mixin(CP.ControlView, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)