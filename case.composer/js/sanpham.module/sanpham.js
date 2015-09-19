;(function ($,window,document,undefined){


	CP.Sanpham = function (callback,idCate,limit){
		this.$el = null;

		this.idCate = idCate;
		this.limit = limit;

		this.$design = null;

		this.viewPath = 'js/sanpham.module/view/template.html';

		this.productService = null;

		this.callbackMain = callback;
	};

	CP.Sanpham.prototype.init = function (sucessHandlde){
		var that = this;

		// RENDER LAYOUT
		
		$.get(this.viewPath, function(tmp) {
			var source = $(tmp).html();
			var template = Handlebars.compile(source);
			
			
			that.callSerive.call(that,function (data){
				// console.log(data);

				_.each(data.data, function(value, key, list){
				
					value.thumb = MYLIB.IMAGEHOST+'/'+value.thumb
				
				});


				var html = template(data);

				that.$el = $(html);
				that.$design = that.$el.find('.btn-go-degsing');

				that.bindEvent();

				sucessHandlde.call(this);

			});		

		});
	}

	CP.Sanpham.prototype.callSerive = function (success){
		var that = this;

		// RENDER LAYOUT
		
		this.productService = new CP.productSerice();
		var ajax = this.productService.getProductByCate(this.idCate,this.limit);
		ajax.done(function (data) {
			success(data);
		})
	}

	CP.Sanpham.prototype.bindEvent = function (){
		this.$design
			.click(function(event) {
				var id = $(this).data('id');
				var isCase = $(this).data('case');
				var isSkin = $(this).data('skin');
				var slug = $(this).data('slug');
				var type = 'case';

				if(isCase == '1')
					type = 'case';
				if(isSkin == '1')
					type = 'skin'
				var param = {
					'id' : id,
					'type' : type,
					'name' : slug
				}
				window.location.href = CP_LINK.url.design + MYLIB.createUrl(param);
				event.stopPropagation();

			});
	}



})(jQuery,window,document)