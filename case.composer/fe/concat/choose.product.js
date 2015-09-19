;(function ($,window,document,undefined){
	
	CP.ChooseProduct = function (){

		var _this = this;
		var html = '<div data-step="1" data-intro="Chọn sản phẩm!" id="{0}"" class="{1}" style="margin-bottom: 10px;width:100%;overflow-x:auto">'+
						'<div class="content-product-list" style="min-width: 1500px;"></div>'+
					'</div>';

		this.$el = null;
		this.productService = null;
		this.data = null;

		this.productItems = [];

		this.init = function () {
			// console.log('LEFT INIT');
			html = html.format(MYLIB.constant.choose_product_id,MYLIB.constant.choose_product_class);
			this.$el = $(html);

			this.productService = new CP.productSerice();

			this.renderProduct();
		}

		this.initSpecificProduct = function (argId){
			// console.log('LEFT INIT');
			html = html.format(MYLIB.constant.choose_product_id,MYLIB.constant.choose_product_class);
			this.$el = $(html);

			this.productService = new CP.productSerice();

			this.renderProducSpecificProduct(argId);
		}

		this.getElement = function () {
			return this.$el;
		}

	};

	CP.ChooseProduct.prototype.productDicts = [];

	CP.ChooseProduct.prototype.renderProduct = function () {
		var _this = this;

		var ajaxResult = this.productService.getProducts(4);
		MYLIB.LOADING_LITTLE(_this.$el,'loading..');
		ajaxResult.done(function(data) {
			// console.log(data);

			_this.data = data.products;
			
			_this.render(_this.data);

			MYLIB.REMOVE_LOADING_LITTLE(_this.$el);

		})

	}

	CP.ChooseProduct.prototype.renderProducSpecificProduct = function (argId) {
		var _this = this;

		var ajaxResult = this.productService.getSpecificProducts(argId);
		MYLIB.LOADING_LITTLE(_this.$el,'loading..');
		ajaxResult.done(function(data) {
			// console.log(data);

			_this.data = data.products;
			
			_this.render(_this.data);

			MYLIB.REMOVE_LOADING_LITTLE(_this.$el);

		})

	}

	CP.ChooseProduct.prototype.render = function (data) {
		var _this = this;

		var dataSeo = data[0];
		var title = (data[0].product_title_seo!=='')?data[0].product_title_seo : data[0].product_name;
		MYLIB.setSEOOnPage(
			title,
			data[0].product_desc_seo
		);
		var $listP = _this.$el.find('.content-product-list');
		_.each(data, function(value, key, list){
		
			var item = new CP.ProductItem();

			item.init(value);

			$listP.append(item.getElement());

			_this.productItems.push(item);
		
		});

		//SET CHO PRODUCT ĐẦU TIÊN LUÔN ĐƯỢC CHỌN
		var itemProductFirst = this.productItems[0];
		itemProductFirst.$el.trigger('click')

	}

})(jQuery,window,document)
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