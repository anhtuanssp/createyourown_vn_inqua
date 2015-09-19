;(function ($,window,document,undefined){
	
	CP.ProductItem = function (){};
	CP.ProductItem.prototype.$el = null;
	CP.ProductItem.prototype.data = null;
	CP.ProductItem.prototype.html = '<div class="product-item"></div>';
	CP.ProductItem.prototype.active = false;
	CP.ProductItem.prototype.init = function(data){
		this.$el = $(this.html);
		var title = '<div class="title_product">{0}</div>';
		var product_content = '<div class="img_product">{0}</div>';
		var img = '<img src="{0}" class="img-responsive" />'

		title = title.format(data.product_name);
		img = img.format(MYLIB.IMAGEHOST+data.product_img_thumb);
		product_content = product_content.format(img);

		this.data = data;
		this.data.product_img_primary = MYLIB.IMAGEHOST+data.product_img_primary;
		this.data.product_img_primary_mask = MYLIB.IMAGEHOST+data.product_img_primary_mask;
		this.data.product_img_thumb = MYLIB.IMAGEHOST+data.product_img_thumb;
		this.data.product_img_back = MYLIB.IMAGEHOST+data.product_img_back;
		this.data.product_img_back_mask = MYLIB.IMAGEHOST+data.product_img_back_mask;
		this.data.product_layer_circle = MYLIB.IMAGEHOST+data.product_layer_circle;
		this.data.product_layer_circle_mask = MYLIB.IMAGEHOST+data.product_layer_circle_mask;
		
		this.$el.append(product_content);
		this.$el.append(title);

		this.bindEvent();
	}
	CP.ProductItem.prototype.getElement = function () {
		return this.$el;
	}
	CP.ProductItem.prototype.bindEvent = function () {
		this.$el
			.unbind('click touchstart',this.chooseProductHandle)
			.bind('click touchstart',this,this.chooseProductHandle);
	}
	// EVENT HANDLE
	CP.ProductItem.prototype.chooseProductHandle = function (event){
		var _this = event.data;
		$('.product-item').removeClass('active')
		_this.$el.toggleClass('active');
		// console.log('Choose iphone');
		// console.log('Product id : '+_this.data.product_id);
		// FIRE EVENT FOR MAIN CANVAS HANDLE
		MYLIB.eventManager.fireEvent(_this,MYLIB.eventNames.chooseProductItem,_this.data);
	}

	MYLIB.mixin(CP.ProductItem, MYLIB.Event.ObserverMixin);
})(jQuery,window,document)