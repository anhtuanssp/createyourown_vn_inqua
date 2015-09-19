;(function ($,window,document,undefined){
	
	CP.PopupAssetsModulePhotos = function (){
		this.$el = null;
		this.html = '<div  class="list-photos-album"></div>';
		this.dataPhoto = null;
		this.albumId = null;

	};

	CP.PopupAssetsModulePhotos.prototype.init = function(data,aId){
		this.dataPhoto = data;
		this.albumId = aId;
		this.$el = $(this.html);

		this.renderLayout(data);
		
	};
	CP.PopupAssetsModulePhotos.prototype.renderLayout = function (data){
		var that = this;
		data.reverse()

		_.each(data, function(value, key, list){
		
			var item = new CP.PopupAssetsModulePhotosItem();
			item.init(value);
			that.$el.append(item.getElement());
		
		});
	}
	CP.PopupAssetsModulePhotos.prototype.show = function () {
		this.$el.removeClass('no-show')
	}
	CP.PopupAssetsModulePhotos.prototype.hide = function () {
		this.$el.addClass('no-show')
	}

	CP.PopupAssetsModulePhotos.prototype.getElement = function(){
		return this.$el;
	};
	CP.PopupAssetsModulePhotos.prototype.bindEvent = function(){


	};


})(jQuery,window,document)