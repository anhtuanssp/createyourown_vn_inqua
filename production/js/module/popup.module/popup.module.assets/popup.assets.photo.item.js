;(function ($,window,document,undefined){
	
	CP.PopupAssetsModulePhotosItem = function (){
		this.$el = null;
		this.html = '<div class="list-photos-album-item-wrapper"></div>';
		this.data = null;
		this.typePhoto = null;
	};

	CP.PopupAssetsModulePhotosItem.prototype.init = function(data){
		this.data = data;
		this.$el = $(this.html);


		var el = '<img src="{0}" class="thumbnail"/>';
		el = el.format(MYLIB.IMAGEHOST+'/'+data.thumb);
		this.$el.append(el);

		this.bindEvent();

	};

	CP.PopupAssetsModulePhotosItem.prototype.show = function () {
		this.$el.removeClass('no-show');
	}
	CP.PopupAssetsModulePhotosItem.prototype.hide = function () {
		this.$el.addClass('no-show');
	}

	CP.PopupAssetsModulePhotosItem.prototype.getElement = function(){
		return this.$el;
	};

	CP.PopupAssetsModulePhotosItem.prototype.bindEvent = function(){
		var that = this;
		this.$el
			.unbind('click touch')
			.bind('click touch', function (e){
				MYLIB.LOADING();
				console.log(that.data);
				var source = MYLIB.IMAGEHOST+that.data.photo;
				var id = that.data.id;
				var thumb = that.data.thumb;
				MYLIB.convertImgToBase64(source,function (basce64){
					MYLIB.REMOVE_LOADING();
					// MYLIB.eventManager.fireEvent(that,MYLIB.eventNames.event_upload_from_computer,basce64);
					MYLIB.eventManager.fireEvent(that,MYLIB.eventNames.event_upload_from_asset,
						{src : basce64, id : id,thumb : thumb});
				} );
			})
	};


})(jQuery,window,document)