
;(function ($,window,document,undefined){
	
	CP.PopupAssetCategoryItem = function (){
		this.cateItem = null;
		this.$el = '';
		this.html = '<div class="popup-left-item"></div>';
		this.activeClass = 'active-left-popup'
	};

	CP.PopupAssetCategoryItem.prototype.init = function(data){
		this.cateItem = data;
		console.log(data);
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
			console.log(data);
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