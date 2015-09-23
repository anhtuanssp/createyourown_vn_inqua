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