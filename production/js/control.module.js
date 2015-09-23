;(function ($,window,document,undefined){
	
	CP.ControlModule = function (){

		var _this = this;
		var html = '<div id="{0}" class="{1}"></div>';

		this.$el = null;
		this.$elModulePrice = null;
		this.displayImgModule = null;
		this.saveModule = null;
		this.uploadFromFacebookModule = null;
		this.uploadFromAssetsModule = null;
		this.uploadFromCamera = null;
		this.shapeModule = null;
		this.controlObject = null;

		this.btnOpenPopupEffectImgModule = null;

		this.priceModule = null;
		this.facebookLogin = null;
		

		this.callBackDashboardModule = null;

		this.init = function (scopeDashboardModule) {
			// console.log('RIGHT INIT');
			this.callBackDashboardModule = scopeDashboardModule;

			html = html.format(MYLIB.constant.control_id,MYLIB.constant.control_class);
			this.$el = $(html);

			this.displayImgModule = new CP.DisplayImgModule();
			this.displayImgModule.init();

			this.saveModule = new CP.SaveCanvas();
			this.saveModule.init();

			this.uploadFromFacebookModule = new CP.UploadFromFacebookModule();
			this.uploadFromFacebookModule.init();

			this.uploadFromAssetsModule = new CP.UploadFromAssetModule();
			this.uploadFromAssetsModule.init();

			this.uploadFromCamera = new CP.TakeSnapshotBtn();
			this.uploadFromCamera.init();

			this.shapeModule = new CP.ShapeModule();
			this.controlObject = new CP.ControlModuleObject();

			this.btnOpenPopupEffectImgModule = new CP.EffectImgBtn();
			this.btnOpenPopupEffectImgModule.init();

			this.priceModule = new CP.PriceModule();

			this.facebookLogin = new CP.FacebookLoginModule(this);

			MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_load_product_success,'loadPriceHandle');


			this.renderLayout();
		}

		this.getElement = function () {
			return this.$el;
		}

	};

	CP.ControlModule.prototype.mainCanvas = null;

	CP.ControlModule.prototype.renderLayout = function () {
		var that = this;

		this.$elModulePrice = $('<div></div>');
		this.$elModulePrice.append(this.priceModule.getElement());
		this.$el.append(this.$elModulePrice);

		this.$el.append(this.displayImgModule.controller.view.getElement());
		this.$el.append(this.saveModule.getElement());
		this.$el.append(this.uploadFromFacebookModule.getElement());
		this.$el.append(this.uploadFromAssetsModule.getElement());
		this.$el.append(this.btnOpenPopupEffectImgModule.getElement());
		this.$el.append(this.uploadFromCamera.getElement());

		this.shapeModule.init(this.callBackDashboardModule,function (){
			that.controlObject.init(that.callBackDashboardModule,function (){
				that.$el.append(that.controlObject.controller.view.getElement());
				that.$el.append(that.shapeModule.controller.view.getElement());
			});
		});


		this.facebookLogin.init(function(){
			that.$el.prepend(that.facebookLogin.$el);
		})

		this.$el.css({
			display : 'inline-block',
			'margin-left' : '10px',
			width : '17%'

		});

	}

	CP.ControlModule.prototype.renderCanvas = function () {
		this.mainCanvas.renderLayout();
	}

	CP.ControlModule.prototype.loadPriceHandle = function (e){
		this.$elModulePrice.html('')
		this.priceModule.display(this.$elModulePrice,e.data)
	}



})(jQuery,window,document)