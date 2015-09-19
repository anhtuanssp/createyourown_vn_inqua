;(function ($,window,document,undefined){
	
	CP.PopupFacebookPhotos = function (){
		this.$el = null;
		this.html = '<div class="list-photos-album"><div class="next-photos">Load tiếp hình <i class="fa fa-angle-double-right fa-2x"></i></div></div>';
		this.dataPhoto = null;
		this.albumId = null;
		this.$btnNext = null;
	};

	CP.PopupFacebookPhotos.prototype.init = function(data,aId){
		this.dataPhoto = data;
		this.albumId = aId;
		this.$el = $(this.html);
		this.$btnNext = this.$el.find('.next-photos');
		this.renderLayout(data.data);
		
	};
	CP.PopupFacebookPhotos.prototype.renderLayout = function (data){
		var that = this;
		_.each(data, function(value, key, list){
		
			var item = new CP.PopupFacebookPhotosItem();
			item.init(value);
			that.$el.append(item.getElement());
		
		});
	}
	CP.PopupFacebookPhotos.prototype.show = function () {
		this.$el.removeClass('no-show')
	}
	CP.PopupFacebookPhotos.prototype.hide = function () {
		this.$el.addClass('no-show')
	}

	CP.PopupFacebookPhotos.prototype.getElement = function(){
		return this.$el;
	};
	CP.PopupFacebookPhotos.prototype.bindEvent = function(){
		this.$btnNext
			.unbind('click touchstart')
			.bind('click touchstart', this.loadMorePhototsHandle.bind(this));
		var that = this;
		// this.$el.jscroll({
		//     loadingHtml: '<img src="imgs/theme/spin.svg" alt="Loading" /> Loading...',
		//     padding: 20,
		//     callback: that.loadMorePhototsHandle,
		// });
	};
	CP.PopupFacebookPhotos.prototype.loadMorePhototsHandle = function () {
		var facebookService = new CP.FacebookService();

		// var $target = $('html,body'); 
		

		var that = this;
		MYLIB.LOADING();
		// that.$el.animate({ scrollTop: that.$el.prop("scrollHeight") }, 3000);
		facebookService.getImagesFromAlbums(this.albumId,20,this.dataPhoto.paging.cursors.after,function(res){
			MYLIB.REMOVE_LOADING();
			if(res.length !== 0){

				that.dataPhoto = res;
				that.renderLayout(res.data);
			}

		},'');
	}

})(jQuery,window,document)