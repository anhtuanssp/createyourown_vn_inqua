;(function ($,window,document,undefined){
	'use strick'
	CP.UploadFromFacebookModule = function (){
		this.html = 
		'<div data-step="1" data-intro="Chọn hình từ facebook của các bạn" class="upload-facebook-img" style="margin: 5px 0px 5px 0px;">'+
			'<div class="facebook-img-button">'+
				'<button type="button" class="btn btn-default choose-image-from-facebook"'+
					' style="width:100%;position:relative;padding:10px">'+
				  '<i class="fa fa-facebook-square fa-2x" aria-hidden="true" '+
				  		'style="position:absolute;left:5px;top:7px;color:#3a5795"></i> Hình Facebook'+
				'</button>'+
				'<br/>'+
			'</div>'+
		'</div>';
		this.$el = null;
		this.$btnFacebook = null;

		this.facebookApplication = null;
	};


	CP.UploadFromFacebookModule.prototype.init = function () {
		this.$el = $(this.html);
		this.$btnFacebook = this.$el.find('.choose-image-from-facebook');
		this.facebookApplication = new CP.PopupFacebookModule();
		this.bindEvent();
	}

	CP.UploadFromFacebookModule.prototype.getElement = function () {
		return this.$el;
	}

	CP.UploadFromFacebookModule.prototype.bindEvent = function () {
		this.$btnFacebook
			.unbind('click touchstart')
			.bind('click touchstart',this,this.openPopupFacebookImagesHandler);
	}

	//openPopupFacebookImagesHandler
	CP.UploadFromFacebookModule.prototype.openPopupFacebookImagesHandler = function (event) {
		var that = event.data;
		var user = CP.SingletonUser.getInstance();
		var facebookObj = user.getFacebook();

		MYLIB.LOADING();

		user.checkFacebookObj(function(res){

			MYLIB.REMOVE_LOADING(function (){
				that.initFacebookApplication();
			});

		},function(){

			user.loginFacebook(function(){
				
				MYLIB.REMOVE_LOADING(function (){
					that.initFacebookApplication();
				});

			});
			
		},function(){
			// MYLIB.LOADING();
			user.loginFacebook(function(){

				MYLIB.REMOVE_LOADING(function (){
					that.initFacebookApplication();
				});

			});
		});
		
		
	} 

	CP.UploadFromFacebookModule.prototype.initFacebookApplication = function () {
		// console.log('Init Facebook Application');
		
		if(this.facebookApplication.firstRender){

			this.facebookApplication.show();

		}else{
			
			this.facebookApplication.init();
			this.facebookApplication.show();
			
		}
	}

	MYLIB.mixin(CP.UploadFromFacebookModule, MYLIB.Event.ObserverMixin);
})(jQuery,window,document);