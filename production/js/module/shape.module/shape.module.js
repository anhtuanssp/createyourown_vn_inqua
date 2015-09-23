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