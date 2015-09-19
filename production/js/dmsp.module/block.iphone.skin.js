;(function ($,window,document,undefined){


	CP.BlockIphoneSkin = function (callback,title){
		this.$el = null;
		this.title = title;
		this.ID = 21;
		this.viewPath = 'js/dmsp.module/view/iphone.case.html';
		this.$itemDanhmuc = null;

		this.productService = null;
		this.callbackMain = callback;
	};
	CP.BlockIphoneSkin.prototype.init = function (sucessHandlde){
		var that = this;

		// RENDER LAYOUT
		
		$.get(this.viewPath, function(tmp) {
			var source = $(tmp).html();
			var template = Handlebars.compile(source);
			
			
			that.callSerive.call(that,function (data){
				console.log(data);

				_.each(data, function(value, key, list){
				
					value.thumb = MYLIB.IMAGEHOST+'/'+value.thumb
				
				});

				var obj = {
					title : that.title,
					data : data,
					cateId : that.ID
				}

				var html = template(obj);

				that.$el = $(html);

				that.$itemDanhmuc = that.$el.find('.item-danhmuc');

				that.bindEvent();

				sucessHandlde.call(this);

			});		

		});
	}

	CP.BlockIphoneSkin.prototype.callSerive = function (success){
		var that = this;

		// RENDER LAYOUT
		
		this.productService = new CP.productSerice();
		var ajax = this.productService.getCatesByID(this.ID);
		ajax.done(function (data) {
			success(data);
		})
	}
	CP.BlockIphoneSkin.prototype.bindEvent = function (){
		var that = this;

		that.$itemDanhmuc.click(function(event) {
			event.preventDefault();
			var idDanhmuc = $(this).data('id');

			var param = {
				'cate' : idDanhmuc
			}
			window.location.href = CP_LINK.url.sanpham + MYLIB.createUrl(param);
			event.stopPropagation();
		});
	}
})(jQuery,window,document)