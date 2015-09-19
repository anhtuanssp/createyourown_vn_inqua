;(function ($,window,document,undefined){
	
	CP.ShapeController = function (){
		//VIEW
		this.view = null;
		//model
		this.model = null;

		//CALLBACK FROM DASHBOARD
		this.callbackScopeDashboard = null;
	};

 
	CP.ShapeController.prototype.init = function (callbackScopeDashboard,succesLoadLayout) {

		this.callbackScopeDashboard = callbackScopeDashboard;

		this.view = new CP.ShapeView();
		this.model = new CP.ShaperModelSerive();
		this.model.init();

		this.view.init(this.model);

		this.view.render(this.renderView.bind(this,succesLoadLayout));

		// this.bindEvent();
	}

	CP.ShapeController.prototype.renderView = function (succesLoadLayout) {
		//CALLBACK FUNCTION FROM MODULE
		succesLoadLayout.call(this);
		this.bindEvent();
		
	}

	CP.ShapeController.prototype.bindEvent = function () {
		this.view.bindEvent(this)
	}


	CP.ShapeController.prototype.drawShape = function (event){
		// console.log(event.data);
		// console.log(this.callbackScopeDashboard.rightModule.mainCanvas);

		var maincanvasModuleCallback = this.callbackScopeDashboard.rightModule.mainCanvas;
		maincanvasModuleCallback.drawShape.call(maincanvasModuleCallback,event.data);
	}


	MYLIB.mixin(CP.ShapeController, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)
;(function ($,window,document,undefined){
	
	CP.ShapeModule = function (){
		this.controller = null;
		this.callBackFunction = null;
	};


	CP.ShapeModule.prototype.init = function (callbackScopeDashboard,succesLoadLayout) {
		this.controller = new CP.ShapeController();
		this.callBackFunction = callbackScopeDashboard;

		this.controller.init(callbackScopeDashboard,succesLoadLayout);
	}


	MYLIB.mixin(CP.ShapeModule, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)
;(function ($,window,document,undefined){
	
	CP.ShaperModelSerive = function (){
		this.path = 'js/module/shape.module/view/template.html';
		this.data = {
			title : 'Chọn hình shape',
			circle : {
				title : 'Hình tròn',
				class : 'circle-shape'
			},
			rect  : {
				title : 'Hình vuông',
				class : 'rect-shape'
			}
		}
	};

	
	CP.ShaperModelSerive.prototype.init = function () {
		return true;
	}


	CP.ShaperModelSerive.prototype.getElement = function () {

	}

	CP.ShaperModelSerive.prototype.bindEvent = function () {
		
	}



	MYLIB.mixin(CP.ShaperModelSerive, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)
;(function ($,window,document,undefined){
	
	CP.ShapeView = function (){
		this.$el = null;
		this.$btnCircle = null;
		this.$btnRect = null;

		this.modelService = null;
		this.init = function (modelService){
			this.modelService = modelService;
		}
	};

	
	CP.ShapeView.prototype.render = function (successHandle) {
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

	CP.ShapeView.prototype.initElement = function () {
		var that = this;
		// console.log(that.modelService.circle.class);/
		this.$btnCircle = this.$el.find('.'+that.modelService.data.circle.class);
		this.$btnRect = this.$el.find('.'+that.modelService.data.rect.class);
	}

	CP.ShapeView.prototype.getElement = function () {
		return this.$el;
	}

	CP.ShapeView.prototype.bindEvent = function (scopeController) {
		this.$btnCircle
			.unbind('click touchstart')
			.bind('click touchstart','CIRCLE',scopeController.drawShape.bind(scopeController))
		this.$btnRect
			.unbind('click touchstart')
			.bind('click touchstart','RECT',scopeController.drawShape.bind(scopeController))
	}



	MYLIB.mixin(CP.ShapeView, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)