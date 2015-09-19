;(function ($,window,document,undefined){
	
	CP.PopupFacebookPhotosModule = function (){
		this.$el = null;
		this.html = '<div class="photos-albums"></div>';
		this.dictPhoto = {};
		this.facebookService = new CP.FacebookService();
	};

	CP.PopupFacebookPhotosModule.prototype.init = function(){
		this.$el = $(this.html);
	};

	CP.PopupFacebookPhotosModule.prototype.getElement = function(){
		return this.$el;
	};

	CP.PopupFacebookPhotosModule.prototype.show = function(albumsId){
		this.hideAll();
		if(this.dictPhoto[albumsId]){
			this.dictPhoto[albumsId].show();
		}else{
			this.renderPhotosPage(albumsId);
		}
	};
	CP.PopupFacebookPhotosModule.prototype.renderPhotosPage = function (albumsId){
		this.dictPhoto[albumsId] = new CP.PopupFacebookPhotos();
		var that = this;
		MYLIB.LOADING();
		this.facebookService.getImagesFromAlbums(albumsId,20,'',function(res){
			that.dictPhoto[albumsId].init(res,albumsId);
			that.$el.append(that.dictPhoto[albumsId].getElement());
			that.dictPhoto[albumsId].show();
			that.dictPhoto[albumsId].bindEvent();
			MYLIB.REMOVE_LOADING();
		},'');

	}
	CP.PopupFacebookPhotosModule.prototype.hideAll = function (){
		_.each(this.dictPhoto, function (obj) {

			obj.hide();

		});
	}

})(jQuery,window,document)