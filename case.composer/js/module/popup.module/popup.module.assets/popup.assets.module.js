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