	'use strick'
	CP.DisplayImgModule = function (){
		this.controller = null;
	};


	CP.DisplayImgModule.prototype.init = function () {
		this.controller = new CP.DisplayImgController();
		this.controller.init();
	}

	MYLIB.mixin(CP.DisplayImgModule, MYLIB.Event.ObserverMixin);