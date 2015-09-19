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