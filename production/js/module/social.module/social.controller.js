;(function ($,window,document,undefined){
	'use strick'
	CP.SocialController = function (){
		//VIEW
		this.view = null;
		//model
		this.model = null;

		this.facebookService = null;
	};


	CP.SocialController.prototype.init = function () {
		this.view = new CP.SocialView();
		this.view.init();

		this.model = new CP.SocialModel();
		this.model.init();

		this.facebookService = new CP.FacebookService();

		this.view.render([this.model.hrefFacebook,this.model.urlImgFacebook,this.model.hrefFacebook,
							this.model.hrefGplus,this.model.urlImgGplus]);

		this.bindEvent();
	}


	CP.SocialController.prototype.bindEvent = function () {
		this.view.bindEvent(this)
	}

	//FUNCTION CONTROLLER
	CP.SocialController.prototype.openFacebookHandle = function (event){
		event.preventDefault();
		var that = event.data;

		return false;
	}


	MYLIB.mixin(CP.SocialController, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)