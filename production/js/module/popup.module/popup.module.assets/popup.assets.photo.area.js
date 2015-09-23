;(function ($,window,document,undefined){
	
	CP.PopupAssetsModulePhotosArea = function (){
		this.$el = null;
		this.html = '<div class="photos-albums"></div>';
		this.dictPhoto = {};
		this.service = new CP.AssetsSerice();
	};

	CP.PopupAssetsModulePhotosArea.prototype.init = function(){
		this.$el = $(this.html);
	};

	CP.PopupAssetsModulePhotosArea.prototype.getElement = function(){
		return this.$el;
	};

	CP.PopupAssetsModulePhotosArea.prototype.show = function(albumsId){
		this.hideAll();
		if(this.dictPhoto[albumsId]){
			this.dictPhoto[albumsId].show();
		}else{
			this.renderPhotosPage(albumsId);
		}
	};
	CP.PopupAssetsModulePhotosArea.prototype.renderPhotosPage = function (albumsId){
		this.dictPhoto[albumsId] = new CP.PopupAssetsModulePhotos();
		var that = this;
		
		MYLIB.LOADING();
		var aj = this.service.getAssetsMediaByCates(albumsId);

		aj.done(function(data){
			that.dictPhoto[albumsId].init(data,albumsId);
			that.$el.append(that.dictPhoto[albumsId].getElement());
			that.dictPhoto[albumsId].show();
			that.dictPhoto[albumsId].bindEvent();
			MYLIB.REMOVE_LOADING();
		});
		aj.error(function() {
			MYLIB.REMOVE_LOADING();
			alert('Something wrong, vui lòng thử lại')
		});

	}
	CP.PopupAssetsModulePhotosArea.prototype.hideAll = function (){
		_.each(this.dictPhoto, function (obj) {

			obj.hide();

		});
	}

})(jQuery,window,document)