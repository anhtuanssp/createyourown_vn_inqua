;(function ($,window,document,undefined){
	
	CP.PopupBannerAd = function (){
		this.viewPath = MYLIB.mainUrl + "js/popup.banner.module/view/temp.html";
	};

	MYLIB.extend(CP.PopupBannerAd, CP.PopupModule);

	CP.PopupBannerAd.prototype.init = function(){

		this.titlePopup = 'Chọn hình từ thư viện';

		this.parent.proto.init.call(this);
		var that = this;
		$.get(this.viewPath, function(tmp) {
			var source = $(tmp).html();
			var template = Handlebars.compile(source);
			
			that.$elContent.append(template());

			that.$el.find('.banner-popup-ad').css({
				background: 'url("imgs/theme/banner.png")',
				width : '634px',
				'background-size': 'cover',
				'min-height' : '600px',
				margin : '0 auto'
			});

			that.$el.find('.content-banner').css({

			    position: 'absolute',
			    top:' 35%',
			    left: '32%',
			    width: '370px',

			});

			that.$el.find('.close')
				.css({
				    position: 'absolute',
				    top: '-27%',
				    left:' 1%',
				})
				.click(function(event) {
					that.hide();
				});

		});

		this.$el.appendTo('body');

		return this;

	};

	CP.PopupBannerAd.prototype.getElement = function(){
		return this.$el;
	};

	CP.PopupBannerAd.prototype.setTransparent = function (){
		this.$elContent.css({
			background: 'transparent',
			'box-shadow' : 'none',
			border : 'none'
		});



		this.$el.find('.modal-header').remove()
	};

	var banner = new CP.PopupBannerAd();
	banner.init();
	banner.setTransparent();
	banner.show();

})(jQuery,window,document)