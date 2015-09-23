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
		console.log(event.data);
		// var number  = $(event.currentTarget).data('number');
		// console.log(this.callbackScopeDashboard.rightModule.mainCanvas);

		var maincanvasModuleCallback = this.callbackScopeDashboard.rightModule.mainCanvas;
		maincanvasModuleCallback.zoomHandle.call(maincanvasModuleCallback,event.data);
	}

	CP.ControlController.prototype.rotateHandle = function (event){
		console.log(event.data);
		var maincanvasModuleCallback = this.callbackScopeDashboard.rightModule.mainCanvas;
		maincanvasModuleCallback.rotateHandle.call(maincanvasModuleCallback,event.data);
	}


	MYLIB.mixin(CP.ControlController, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)