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