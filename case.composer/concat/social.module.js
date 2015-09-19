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
;(function ($,window,document,undefined){
	'use strick'
	CP.SocialModule = function (){
		this.controller = null;
	};


	CP.SocialModule.prototype.init = function () {
		this.controller = new CP.SocialController();
		this.controller.init();
	}


	MYLIB.mixin(CP.SocialModule, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)
;(function ($,window,document,undefined){
	
	CP.SocialView = function (){
		this.html = '';
		this.$el = null;
		this.$fb = null;
		this.init = function () {
			this.html = 
			'<div class="socical-wrapper" style="bottom:20%">'+
				'<ul>'+
					'<li  class="facebook">'+
					 	'<a href="{0}"></a>'+
					'</li>'+

				'</ul>'+
			'</div>';
		}
	};
	
	
	CP.SocialView.prototype.render = function (data) {
		if($.isArray(data)){
			this.html = this.html.format(data[0]);
			this.$el = $(this.html);
			this.$fb = this.$el.find('li').eq(0);
			this.style();
		}else{
			throw 'Data render must be array';
		}
	}

	CP.SocialView.prototype.style = function (){
		this.$el.css({
			right: 0,
			top: '-60px',
			display: 'inline-block',
			position : 'absolute'
		});
		this.$el.find('ul').css({
			listStyle: 'none'
		});
		this.$el.find('li').css({
			'padding': '5px',
			'display' : 'inline-block'
		});
	}
	CP.SocialView.prototype.getElement = function () {
		return this.$el;
	}

	CP.SocialView.prototype.bindEvent = function (scopeController) {
	
	}



	MYLIB.mixin(CP.SocialView, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)

;(function ($,window,document,undefined){
	
	CP.PopupFacebookAblumsItem = function (){
		this.albumItem = null;
		this.$el = '';
		this.html = '<div class="albums-facebook-item popup-left-item"></div>';
		this.activeClass = 'active-left-popup'
	};

	CP.PopupFacebookAblumsItem.prototype.init = function(data){
		this.albumItem = data;
		this.$el = $(this.html);
		this.renderAblumItem();
	};

	CP.PopupFacebookAblumsItem.prototype.renderAblumItem = function (){
		var data = '<span>{0}</span>';
		data = data.format(this.albumItem.name);
		this.$el.append(data);
		this.bindEvent();
	}

	CP.PopupFacebookAblumsItem.prototype.bindEvent = function (){
		this.$el
			.unbind('click touchstart')
			.bind('click touchstart',this.openListImageFromAlbums.bind(this));
	}

	CP.PopupFacebookAblumsItem.prototype.openListImageFromAlbums = function (event) {
		// console.log(this);
		var $btn = $(event.target).parent();
		$('.albums-facebook-item').removeClass(this.activeClass);
		$btn.addClass(this.activeClass);
		MYLIB.eventManager.fireEvent(this,MYLIB.eventNames.event_open_photos,this.albumItem.id);
	}

	MYLIB.mixin(CP.PopupFacebookAblumsItem, MYLIB.Event.ObserverMixin);


})(jQuery,window,document)

;(function ($,window,document,undefined){
	
	CP.PopupFacebookAblumsModule = function () {
		this.dataAlbums = null;
		this.$el = '';
		this.html = '<div class="albums-facebook popup-left-wrapper"><span class="next-albums" style="cursor:pointer">Load tiếp ablums<i class="fa fa-chevron-circle-down fa-2x"></i></span><h4>Vui lòng chọn Album</h4></div>';

		this.$btnNext = null;

		this.facebookService = new CP.FacebookService();
	};

	CP.PopupFacebookAblumsModule.prototype.init = function(loadSuccess){
		var user = CP.SingletonUser.getInstance();
		var facebookObj = user.getFacebook();
		this.$el = $(this.html);
		this.$btnNext = this.$el.find('.next-albums');

		//bindEvent cho btn next
		this.$btnNext.unbind('click touchstart').bind('click touchstart',this, this.nextAlbumsHandle);

		MYLIB.LOADING();
		var that = this;

		this.facebookService.getAlbums(10,'',function(res){
			that.successGetAlbums(res);
			loadSuccess();
		});
	};
	CP.PopupFacebookAblumsModule.prototype.successGetAlbums = function (res){
		MYLIB.REMOVE_LOADING();
		this.dataAlbums = res;
		this.renderAblums(this.dataAlbums.data);
	}
	CP.PopupFacebookAblumsModule.prototype.renderAblums = function (data){
		var that = this;
		_.each(data, function(value, key, list){
		
			var item = new CP.PopupFacebookAblumsItem();
			item.init(value);
			that.$el.append(item.$el);

		});
	}
	CP.PopupFacebookAblumsModule.prototype.getElement = function (){
		return this.$el;
	}

	//xu ly su kien bindevent
	CP.PopupFacebookAblumsModule.prototype.nextAlbumsHandle = function (event) {
		var that = event.data;
		// var target = $(event.target)
		MYLIB.LOADING();
		that.facebookService.getAlbums(10,that.dataAlbums.paging.cursors.after,function(res){
			that.successGetAlbums(res);
		});
	}

})(jQuery,window,document)
;(function ($,window,document,undefined){
	
	CP.PopupFacebookModule = function (){
		this.facebookAlbumsModule = null;
		this.facebookPhotosModule = null;
	};

	MYLIB.extend(CP.PopupFacebookModule, CP.PopupModule);

	CP.PopupFacebookModule.prototype.firstRender = false;

	CP.PopupFacebookModule.prototype.init = function(){

		this.titlePopup = 'Chọn hình từ Facebook';

		this.parent.proto.init.call(this);

		this.$el.appendTo('body');

		this.facebookAlbumsModule = new CP.PopupFacebookAblumsModule();
		this.facebookPhotosModule = new CP.PopupFacebookPhotosModule();
		this.facebookPhotosModule.init();

		var that = this;
		this.facebookAlbumsModule.init(function (){
			console.log('Load albums success');
			that.$elContent.append(that.facebookAlbumsModule.getElement())
			that.$elContent.append(that.facebookPhotosModule.getElement())
		});

		// MYLIB.eventManager.fireEvent(this,MYLIB.eventNames.event_open_photos,this.albumItem.id);
		MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_open_photos,'openPhotosHandle');
		MYLIB.eventManager.subscribe(this,'CLOSE_POPUP_FACEBOOK','closeHandle');

		this.firstRender = true;

	};

	CP.PopupFacebookModule.prototype.getElement = function(){
		return this.$el;
	};

	CP.PopupFacebookModule.prototype.openPhotosHandle = function(event){
		// console.log(event.data);
		var albumId = event.data;
		this.facebookPhotosModule.show(albumId);

	};

	CP.PopupFacebookModule.prototype.closeHandle = function(event){
		this.$el.modal('hide')
	};

	MYLIB.mixin(CP.PopupFacebookModule, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)
;(function ($,window,document,undefined){
	
	CP.PopupFacebookPhotosItemType = function (){
		this.$el = null;
		this.html = '<div class="list-photos-album-item-popup-type"></div>';
		this.data = null;
		this.$btnClose = null;
	};

	CP.PopupFacebookPhotosItemType.prototype.init = function(data){
		this.data = data;
		this.$el = $(this.html);
		var that = this;
		_.each(data, function(value, key, list){
			var $item = '<div style="cursor:pointer">'+
							'<span data-type="{0}" class="" data-img="{1}">{2}</span>'+
						'</div>';
			$item = $item.format(value.width,value.source,value.width+' x '+value.height);
			$item = $($item);
			$item
				.unbind('click touchstart')
				.bind('click touchstart',that.renderImageToCanvasHandle.bind(that));
			that.$el.append($item);
		});
		this.$btnClose = $('<div><i class="fa fa-caret-down fa-2x" style="color:#000"></i></div>');

		that.$el.append(this.$btnClose);
		this.style();

		this.$btnClose.unbind('click touchstart').bind('click touchstart', this, function(event) {
			that.hide();
			event.stopPropagation();
		});
	};

	CP.PopupFacebookPhotosItemType.prototype.show = function () {
		this.$el.removeClass('no-show');
	}
	CP.PopupFacebookPhotosItemType.prototype.hide = function () {
		this.$el.addClass('no-show');
	}

	CP.PopupFacebookPhotosItemType.prototype.getElement = function(){
		return this.$el;
	};

	CP.PopupFacebookPhotosItemType.prototype.style = function(){
		this.$el
			.css({
				padding: '16px',
				position: 'absolute',
				background: 'rgb(201, 201, 201)',
				'z-index': '99',
				top: '0',
				width: '100%',
				opacity:' 0.9',
				'font-weight': '800',
				'box-shadow': '0 2px 5px 0 rgba(0, 0, 0, 0.26)'
			});
		this.$el.find('span').css({
			padding: '5px',
			display: 'inline-block',
		});
		this.$btnClose.css({
			position: 'absolute',
			top: '0',
			right: '0',
			cursor : 'pointer',
			padding : '5px',
			'z-index': '99',
		});
	};

	CP.PopupFacebookPhotosItemType.prototype.renderImageToCanvasHandle = function (event){
		var target = $(event.target);
		// console.log(target);
		var source = target.data('img');
		var that = this;
		MYLIB.LOADING();
		MYLIB.convertImgToBase64(source,function (basce64){
			MYLIB.REMOVE_LOADING();
			MYLIB.eventManager.fireEvent(that,MYLIB.eventNames.event_upload_from_computer,basce64);
			MYLIB.eventManager.fireEvent(that,'CLOSE_POPUP_FACEBOOK',true)

		} );
		
	}

	MYLIB.mixin(CP.PopupFacebookPhotosItemType, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)

;(function ($,window,document,undefined){
	
	CP.PopupFacebookPhotosItem = function (){
		this.$el = null;
		this.html = '<div class="list-photos-album-item-wrapper"></div>';
		this.data = null;
		this.typePhoto = null;
	};

	CP.PopupFacebookPhotosItem.prototype.init = function(data){
		this.data = data;
		this.$el = $(this.html);
		this.typePhoto = new CP.PopupFacebookPhotosItemType();

		var that = this;

		var img = _.min(data.images, function(v){
			
			return v.width;
		});

		var el = '<img src="{0}" class="thumbnail"/>';
		el = el.format(img.source);
		that.$el.append(el);

		this.typePhoto.init(data.images);
		this.$el.append(this.typePhoto.getElement());
		this.typePhoto.hide();

		this.bindEvent();

	};

	CP.PopupFacebookPhotosItem.prototype.show = function () {
		this.$el.removeClass('no-show');
	}
	CP.PopupFacebookPhotosItem.prototype.hide = function () {
		this.$el.addClass('no-show');
	}

	CP.PopupFacebookPhotosItem.prototype.getElement = function(){
		return this.$el;
	};

	CP.PopupFacebookPhotosItem.prototype.bindEvent = function(){
		// return this.$el;
		this.$el.unbind('click touchstart')
				.bind('click touchstart',this.openTypePhotosHandle.bind(this));
	};
	CP.PopupFacebookPhotosItem.prototype.openTypePhotosHandle = function (event){
		this.typePhoto.show();
	}

})(jQuery,window,document)
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