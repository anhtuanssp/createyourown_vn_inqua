
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