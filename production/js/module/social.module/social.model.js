;(function ($,window,document,undefined){
	
	CP.SocialModel = function (){
		this.hrefFacebook = 'facebook.com';
		this.urlImgFacebook = 'imgs/theme/facebook.png';
		this.hrefGplus = 'google.com',
		this.urlImgGplus = 'imgs/theme/gplus.png'
	};

	
	CP.SocialModel.prototype.init = function () {
		return true;
	}


	CP.SocialModel.prototype.getElement = function () {

	}

	CP.SocialModel.prototype.bindEvent = function () {
		
	}



	MYLIB.mixin(CP.SocialModel, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)