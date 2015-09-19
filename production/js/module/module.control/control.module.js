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