
;(function ($,window,document,undefined){
	
	CP.PopupAssetCategoryItem = function (){
		this.cateItem = null;
		this.$el = '';
		this.html = '<div class="popup-left-item"></div>';
		this.activeClass = 'active-left-popup'
	};

	CP.PopupAssetCategoryItem.prototype.init = function(data){
		this.cateItem = data;
		// console.log(data);
		this.$el = $(this.html);
		this.renderAblumItem();
	};

	CP.PopupAssetCategoryItem.prototype.renderAblumItem = function (){
		var data = '<span>{0}</span>';
		data = data.format(this.cateItem.asset_name);
		this.$el.append(data);
		this.bindEvent();
	}

	CP.PopupAssetCategoryItem.prototype.bindEvent = function (){
		this.$el
			.unbind('click touchstart')
			.bind('click touchstart',this.openListImageFromAssets.bind(this));
	}

	CP.PopupAssetCategoryItem.prototype.openListImageFromAssets= function (event) {
		// console.log(this);
		var $btn = $(event.target).parent();
		this.$el.siblings().removeClass(this.activeClass);
		$btn.addClass(this.activeClass);
		MYLIB.eventManager.fireEvent(this,MYLIB.eventNames.event_open_asset_photos,this.cateItem.asset_id);
	}

	MYLIB.mixin(CP.PopupAssetCategoryItem, MYLIB.Event.ObserverMixin);


})(jQuery,window,document)

;(function ($,window,document,undefined){
	
	CP.PopupAssetCategories = function () {
		this.dataCates = null;
		this.$el = '';
		this.html = '<div class="popup-left-wrapper"><h4>Vui lòng chọn thư viện</h4></div>';

		this.$btnNext = null;

		this.service = new CP.AssetsSerice();
	};

	CP.PopupAssetCategories.prototype.init = function(loadSuccess){
		var user = CP.SingletonUser.getInstance();
		var facebookObj = user.getFacebook();
		this.$el = $(this.html);

		MYLIB.LOADING();
		var that = this;

		var ajaxCalled = this.service.getAssetsCates();
		ajaxCalled.done(function(data){
			// console.log(data);
			that.successGetCates.call(that,data);
			loadSuccess.call(that);
			MYLIB.REMOVE_LOADING();
		})
	};
	CP.PopupAssetCategories.prototype.successGetCates = function (res){
		MYLIB.REMOVE_LOADING();
		this.dataCates = res;
		this.render(this.dataCates);
	}
	CP.PopupAssetCategories.prototype.render = function (data){
		var that = this;
		_.each(data.assets, function(value, key, list){
		
			var item = new CP.PopupAssetCategoryItem();
			item.init(value);
			that.$el.append(item.$el);

		});
	}
	CP.PopupAssetCategories.prototype.getElement = function (){
		return this.$el;
	}


})(jQuery,window,document)
;(function ($,window,document,undefined){
	
	CP.PopupAssetsModule = function (){
		this.popupAssetsCates = null;
		this.popupAssetsAssetArea = null;
	};

	MYLIB.extend(CP.PopupAssetsModule, CP.PopupModule);

	CP.PopupAssetsModule.prototype.firstRender = false;

	CP.PopupAssetsModule.prototype.init = function(){

		this.titlePopup = 'Chọn hình từ thư viện';

		this.parent.proto.init.call(this);

		this.$el.appendTo('body');

		this.popupAssetsAssetArea = new CP.PopupAssetsModulePhotosArea();
		this.popupAssetsAssetArea.init();

		this.popupAssetsCates = new CP.PopupAssetCategories();
		this.popupAssetsCates.init(this.render.bind(this));



		// MYLIB.eventManager.fireEvent(this,MYLIB.eventNames.event_open_photos,this.albumItem.id);
		MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_open_asset_photos,'openPhotosHandle');
		MYLIB.eventManager.subscribe(this,'CLOSE_POPUP_ASSET','closeHandle');

		this.firstRender = true;

	};

	CP.PopupAssetsModule.prototype.getElement = function(){
		return this.$el;
	};
	CP.PopupAssetsModule.prototype.render = function(){
		// console.log(this);
		
		this.$elContent.append(this.popupAssetsCates.getElement())
		this.$elContent.append(this.popupAssetsAssetArea.getElement())
	};

	CP.PopupAssetsModule.prototype.openPhotosHandle = function(event){
		var albumId = event.data;
		// console.log(albumId);
		this.popupAssetsAssetArea.show(albumId);
	};

	CP.PopupAssetsModule.prototype.closeHandle = function(event){
		this.$el.modal('hide')
	};

	MYLIB.mixin(CP.PopupAssetsModule, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)
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
				// console.log(that.data);
				var source = MYLIB.IMAGEHOST+that.data.photo;
				var id = that.data.id;
				var thumb = that.data.thumb;
				CP.AssetsSerice.getInstance.addCountAssetMedia(id);
				MYLIB.convertImgToBase64(source,function (basce64){
					MYLIB.REMOVE_LOADING();
					// MYLIB.eventManager.fireEvent(that,MYLIB.eventNames.event_upload_from_computer,basce64);
					MYLIB.eventManager.fireEvent(that,MYLIB.eventNames.event_upload_from_asset,
						{src : basce64, id : id,thumb : thumb});

					MYLIB.eventManager.fireEvent(that,'CLOSE_POPUP_ASSET',true)
				} );
			})
	};


})(jQuery,window,document)
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