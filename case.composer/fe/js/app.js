;(function ($,window,document,undefined){


	CP.APP_CP = function (){

		var _this = this;
		var html = '<div id="{0}"" class="{1}"></div>';
		this.$id = "app";
		this.$class = "container_CP";

		this.$el = null;

		//PAGE MODULE
		this.dashboardPage = null;

		this.productInfoModule = null;

		//FACEBOOK 
		this.facebook = null;

		MYLIB.eventManager.subscribe(this,MYLIB.eventNames.chooseProductItem,'renderProductInfomation');

		this.init = function (id) {
			// console.log('APP INIT');

			html = html.format(MYLIB.constant.app_id,MYLIB.constant.app_class);
			this.$el  = $(html);
			this.$el.appendTo('#'+id);

			this.dashboardPage = new CP.Dashboard();
			this.dashboardPage.init();

			this.facebook = new CP.FacebookService();

			this.productInfoModule = new CP.ProductTabModule();

			this.renderLayout();


		}

		this.initDesignProduct = function (id,argId){
			// console.log('APP INIT');

			html = html.format(MYLIB.constant.app_id,MYLIB.constant.app_class);
			this.$el  = $(html);
			this.$el.appendTo('#'+id);

			this.dashboardPage = new CP.Dashboard();
			this.dashboardPage.initDesignProduct(argId);

			this.facebook = new CP.FacebookService();

			this.productInfoModule = new CP.ProductTabModule();
			
			this.renderLayout();

		}


		this.renderLayout = function () {

			this.$el.append(this.dashboardPage.getElement());

			this.dashboardPage.rightModule.renderCanvas();


		}

		this.renderProductInfomation = function(data){
			this.productInfoModule.init(function(){
				//render view success
				_this.$el.append(this.$el);
				this.render(data.data);
			});
			// console.log(data);

		}

	};

})(jQuery,window,document)