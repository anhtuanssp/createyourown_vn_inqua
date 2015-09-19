;(function ($,window,document,undefined){
	
	CP.ColorModule = function (){
		this.controller = null;
	};


	CP.ColorModule.prototype.init = function () {
		this.controller = new CP.ColorController();
		this.controller.init();
	}


	MYLIB.mixin(CP.ColorModule, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)