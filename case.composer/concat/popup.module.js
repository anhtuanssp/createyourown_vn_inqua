;
(function($, window, document, undefined) {

    CP.StickerModuleAssetDesign = function(parentScope) {
        this.tmp = '<div class="col-sm-12 assetmedia-cates-wrapper">' +
            '<div class="row">' +
            '<ul class="row assetmedia-cates-list">' +

            '</ul>' +
            '</div>' +
            '</div>';
        this.$el = null;
        this.ajaxData = CP.AssetsSerice.getInstance.getAssetsCates();
        this.classActive = 'active'

        this.init = function(successCallback) {
            var that = this;
            this.ajaxData.done(function(res) {
                var tmpA = $(that.tmp);
                $.each(res.assets, function(index, val) {
                    var li = $('<li style="display:inline-block;margin:5px;cursor:pointer">' + val.asset_name + '</li>');

                    li.click(function(event) {
                        parentScope.filterByCate.call(parentScope, val,$(this))
                    });

                    tmpA.find('ul').append(li);
                });
                var liAll = $('<li class="'+that.classActive+'" style="display:inline-block;margin:5px;cursor:pointer">' + 'Tất cả' + '</li>');
                tmpA.find('ul').append(liAll);
                liAll.click(function(event) {
                    parentScope.filterByCate.call(parentScope, {asset_id : 'all'},$(this))
                });
                that.$el = tmpA;
                successCallback();
            })
        }
    }

    CP.StickerModule = function() {

        this.$el = null;
        this.$elMediaContent = null;
        this.$elBtnChonsanpham = null;
        this.$elTmpAS = null;
        this.viewPath = MYLIB.mainUrl + 'js/module/popup.module/popup.module.asset.v2/view/template.html';
        this.limit = 24;
        this.current_page = 1;
        this.last_page = 0;
        this.total = 0;
        this.from = 0;
        this.to = 0;
        this.data = 0;

        this.cateID = 'all';

        this.assetCateModule = new CP.StickerModuleAssetDesign(this);
        this.assetCateModule.init(this.renderAssetCate.bind(this));

        this.listAssetMediaChoice = [];

        this.$prev = null;
        this.$next = null;
        this.tmpItem = '<div class="as-item col-sm-2 col-xs-2" style="margin-bottom:20px;cursor:pointer;min-height:150px;max-height:150px">' +
            '<img src="{0}" class="img-responsive img-thumbnail"/>' +
            '</div>';

        return this;

    };

    CP.StickerModule.prototype.renderAssetCate = function() {
        this.$el.find('#asc').append(this.assetCateModule.$el);
    }
    CP.StickerModule.prototype.filterByCate = function(data,li) {
        this.current_page = 1;
        this.assetCateModule.$el.find('li').removeClass(this.assetCateModule.classActive);
        li.addClass(this.assetCateModule.classActive)
        this.cateID = data.asset_id;
        this.callService(this.render.bind(this));

    }


    CP.StickerModule.prototype.loadTemplate = function(success) {

        var that = this;
        $.get(this.viewPath, function(tmp) {

            var source = $(tmp).html();

            that.$el = $(source);
            that.$elMediaContent = that.$el.find('.asset-media-content');

            that.$prev = that.$el.find('.previous');
            that.$next = that.$el.find('.next');


            that.$elTmpAS = that.$el.find('.tmp-asset-media');

            success();

        });

    };

    CP.StickerModule.prototype.init = function(success) {
        var that = this;
        this.loadTemplate(function() {
            that.callService(that.render.bind(that));
            success();
        });
    };

    CP.StickerModule.prototype.render = function(res) {

        this.current_page = res.current_page;
        this.last_page = res.last_page;
        this.total = res.total;
        this.from = res.form;
        this.to = res.to;
        this.data = res.data;
        var that = this;

        this.renderPagination();

        that.$elMediaContent.html('');
        $.each(this.data, function(index, val) {
            var tm = $(that.tmpItem.format(MYLIB.IMAGEHOST + '/' + val.thumb));
            tm.bind('click', val, function(event) {

                that.choiceItem(event.data);

            });
            that.$elMediaContent.append(tm);

        });
        

    };

    CP.StickerModule.prototype.choiceItem = function(data) {

        // console.log(data);
        var that = this;

        MYLIB.LOADING();
        // console.log(that.data);
        var source = MYLIB.IMAGEHOST+data.photo;
        var id = data.id;
        var thumb = data.thumb;
        CP.AssetsSerice.getInstance.addCountAssetMedia(id);
        MYLIB.convertImgToBase64(source,function (basce64){
            MYLIB.REMOVE_LOADING();
            // MYLIB.eventManager.fireEvent(that,MYLIB.eventNames.event_upload_from_computer,basce64);
            MYLIB.eventManager.fireEvent(that,MYLIB.eventNames.event_upload_from_asset,
                {src : basce64, id : id,thumb : thumb});

            MYLIB.eventManager.fireEvent(that,'CLOSE_POPUP_ASSET',true)
        } );

    }

    CP.StickerModule.prototype.renderPagination = function() {

        // console.log(this.current_page);
        //         console.log(this.current_page);
        if (this.current_page > 1 && this.current_page < this.last_page) {
           // console.log(1);
            this.$prev.removeClass('disable').css({
                opacity: '1',
                cursor: 'pointer'
            });
            this.$next.removeClass('disable').css({
                opacity: '1',
                cursor: 'pointer'
            });

            this.$prev
                .unbind('click')
                .bind('click', this.prevAction.bind(this));

            this.$next
                .unbind('click')
                .bind('click', this.nextAction.bind(this));
        } else if (this.current_page == 1 && this.last_page == 1) {
            // console.log(2);
            this.$prev.addClass('disable').css({
                opacity: '0.5',
                cursor: 'default'
            });

            this.$next.removeClass('disable').css({
                opacity: '0.5',
                cursor: 'default'
            });

            this.$prev
                .unbind('click')


            this.$next
                .unbind('click')
                // .bind('click', this.nextAction.bind(this));

        } else if (this.current_page == this.last_page) {
            // console.log(3);
            this.$prev.removeClass('disable').css({
                opacity: '1',
                cursor: 'pointer'
            });
            this.$next.addClass('disable').css({
                opacity: '0.5',
                cursor: 'default'
            });

            this.$prev
                .unbind('click')
                .bind('click', this.prevAction.bind(this));
            this.$next
                .unbind('click')

        } else if (this.current_page == 1) {
            // console.log(4);
            this.$prev.addClass('disable').css({
                opacity: '0.5',
                cursor: 'default'
            });
            this.$next.removeClass('disable').css({
                opacity: '1',
                cursor: 'pointer'
            });

            this.$prev
                .unbind('click')


            this.$next
                .unbind('click')
                .bind('click', this.nextAction.bind(this));

        }



    };

    CP.StickerModule.prototype.prevAction = function() {
        //debugger;
        this.current_page--;
        this.callService(this.render.bind(this));
    };

    CP.StickerModule.prototype.nextAction = function() {
        //debugger;
        this.current_page++;
        this.callService(this.render.bind(this));
    };

    CP.StickerModule.prototype.callService = function(success) {

        var ajax = CP.AssetsSerice.getInstance.getAssetMediaByLimit(this.limit, this.current_page, this.cateID);
        MYLIB.LOADING_WITH_EL(this.$elMediaContent);
        ajax.done(function(response) {

            success(response);
            MYLIB.REMOVE_LOADING();

        });

        return this;

    }

    // //IMPLEMENT
    // var sticker = new CP.StickerModule();
    // sticker.init(function() {
    //     $('#asset-media').append(sticker.$el)
    // })


})(jQuery, window, document)


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
		// this.popupAssetsCates = null;
		// this.popupAssetsAssetArea = null;
		// 
		this.popupAssetV2 = null;
	};

	MYLIB.extend(CP.PopupAssetsModule, CP.PopupModule);

	CP.PopupAssetsModule.prototype.firstRender = false;

	CP.PopupAssetsModule.prototype.init = function(){

		this.titlePopup = 'Chọn hình từ thư viện';

		this.parent.proto.init.call(this);

		this.$el.appendTo('body');

		// this.popupAssetsAssetArea = new CP.PopupAssetsModulePhotosArea();
		// this.popupAssetsAssetArea.init();

		// this.popupAssetsCates = new CP.PopupAssetCategories();
		// this.popupAssetsCates.init(this.render.bind(this));

		this.popupAssetV2 = new CP.StickerModule();
		var that = this;
	    this.popupAssetV2.init(function() {
	       that.$el.find('.modal-content').append(that.popupAssetV2.$el);
	    })


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
		
		// this.$elContent.append(this.popupAssetsCates.getElement())
		// this.$elContent.append(this.popupAssetsAssetArea.getElement())
	};

	CP.PopupAssetsModule.prototype.openPhotosHandle = function(event){
		var albumId = event.data;
		// console.log(albumId);
		// this.popupAssetsAssetArea.show(albumId);s
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