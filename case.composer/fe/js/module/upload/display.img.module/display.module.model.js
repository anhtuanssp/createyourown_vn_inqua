;(function ($,window,document,undefined){
	
	CP.DisplayImgModuleModel = function (){
		this.ID = 'display-img-module';
		this.CLASS = 'display-img-module';
		this.data = {}
	};

	
	CP.DisplayImgModuleModel.prototype.init = function () {
		return true;
	}




	MYLIB.mixin(CP.DisplayImgModuleModel, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)