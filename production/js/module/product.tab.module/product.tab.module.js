;(function ($,window,document,undefined){


	CP.ProductTabModule = function (){
		this.$el = null;
		this.viewPath = MYLIB.mainUrl + "js/module/product.tab.module/view/tmp.html";

		this.$elProductInfo = null;
		this.$elProductImgs = null;
	};

	CP.ProductTabModule.prototype.init = function (renderSuccess){
		var that = this;
		if(this.$el != null){
			this.$el.remove();
		}
		$.get(this.viewPath, function(tmp) {
			var source = $(tmp).html();
			var template = Handlebars.compile(source);
			that.$el = $(template());

			that.$elProductInfo = that.$el.find('#productInfo');
			that.$elProductImgs = that.$el.find('#productImgs');
			if(renderSuccess != undefined 
				&& typeof(renderSuccess) == 'function') {

				renderSuccess.call(that);

			}

		});
	};

	CP.ProductTabModule.prototype.render = function(data){
		if($.trim(data.product_content) != ''){
			this.$elProductInfo.html(data.product_content);
		}else{
			this.$elProductInfo.html('Chưa có thông tin sản phẩm');
		};

		var pimgs = $.parseJSON( data.product_imgs );

		if(pimgs.data.length > 0){
			console.log(pimgs.data)
			var $htmlTMP = $('<ul></ul>');
			_.each(pimgs.data, function(value, key, list){

				$htmlTMP.append('<li><a><img src="'+ MYLIB.IMAGEHOST+'/'+value.thumb +'" /></a></li>');
			
			});

			$htmlTMP.find('li').css({
				display: 'inline-block',
				'margin-right': '15px',
				cursor : 'pointer'
			});

			this.$elProductImgs.append($htmlTMP);

		}else{
			this.$elProductImgs.html('Chưa có hình ảnh thêm nào');
		}
		
	}

})(jQuery,window,document)