;(function ($,window,document,undefined){


	CP.SanphamModule = function (id){
		this.$el = $(id);

		this.sanpham = null;


	};
	CP.SanphamModule.prototype.init = function (cateID){
		this.sanpham = new CP.Sanpham(this,cateID,10);
		this.sanpham.init(this.renderSanpham.bind(this));

		//INIT SEO 
		var service = new CP.productSerice();
		var ajax = service.getCate(cateID);
		ajax.done(function (data){
			var title = (data.title_seo_vi!=='')?data.title_seo_vi : data.ten_vi;
			MYLIB.setSEOOnPage(
				title,
				data.desc_seo_vi
			);
		})
	}
	CP.SanphamModule.prototype.renderSanpham = function (){
		this.$el.append(this.sanpham.$el)
	}


})(jQuery,window,document)