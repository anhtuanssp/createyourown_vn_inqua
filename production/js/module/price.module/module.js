;(function ($,window,document,undefined){
	
	CP.PriceModule = function (){
		this.price = null;
		this.percent_sale = 0;

		this.$el = null;
		this.html = '';
		
	}
	CP.PriceModule.prototype.init = function(price,type){
		/* body... */
		this.price = price;
		var str = '<div data-step="4" data-intro="Gía tham khảo của sản phẩm"><div class="title-style-1">Giá tham khảo</div><div class="price_module" style="color:#d9534f;font-size:25px"><b>{0} {1}</b></div></div>';
		this.html = str.format(this.price,type);

		this.$el = $(this.html);
	};

	CP.PriceModule.prototype.getElement = function (){
		return this.$el;
	}


	CP.PriceModule.prototype.display = function($elParent,price){
		// this.$el.html('');
		var cp =parseFloat(price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

		this.init(cp,'đ');

		$elParent.append(this.$el)
	}

})(jQuery,window,document)