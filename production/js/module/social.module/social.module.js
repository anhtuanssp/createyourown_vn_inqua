;(function ($,window,document,undefined){
	'use strick'
	CP.SocialModule = function (){
		this.controller = null;
	};


	CP.SocialModule.prototype.init = function () {
		this.controller = new CP.SocialController();
		this.controller.init();
	}


	MYLIB.mixin(CP.SocialModule, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)