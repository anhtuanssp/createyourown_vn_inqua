;(function ($,window,document,undefined){
	
	CP.LeftZone = function (){

		var _this = this;
		var html = '<div id="{0}"" class="{1}"></div>';

		this.$el = null;

		this.chooseProduct = null;
		this.freeDraw = null;
		this.textModule = null;
		this.colorModule = null;
		
		this.uploadFromComputer = null;

		this.opacityModule = null;

		this.init = function () {

			// console.log('LEFT INIT');
			html = html.format(MYLIB.constant.left_id,MYLIB.constant.left_class);
			this.$el = $(html);

			this.chooseProduct = new CP.ChooseProduct();
			this.chooseProduct.init();

			this.freeDraw = new CP.FreeDrawModule();

			this.textModule = new CP.TextModule();
			this.textModule.init();

			this.colorModule = new CP.ColorModule();
			this.colorModule.init();

			this.opacityModule = new CP.OpacityModule();
			this.opacityModule.init();

			this.uploadFromComputer = new CP.UploadFromComputerController();
			this.uploadFromComputer.init();

			this.renderLayout();

		}

		this.initDesignProduct = function (argId) {
			// console.log('LEFT INIT');
			html = html.format(MYLIB.constant.left_id,MYLIB.constant.left_class);
			this.$el = $(html);

			this.chooseProduct = new CP.ChooseProduct();
			this.chooseProduct.initSpecificProduct(argId);


			this.textModule = new CP.TextModule();
			this.textModule.init();

			this.freeDraw = new CP.FreeDrawModule();

			this.colorModule = new CP.ColorModule();
			this.colorModule.init();

			this.uploadFromComputer = new CP.UploadFromComputerController();
			this.uploadFromComputer.init();

			this.opacityModule = new CP.OpacityModule();
			this.opacityModule.init();

			this.renderLayout();

			
		}

		this.getElement = function () {

			return this.$el;

		}

		this.renderLayout = function () {


			var that = this;
			this.freeDraw.init(function(){

				that.$el.append(that.chooseProduct.getElement());

				that.$el.append(that.textModule.getElement());

				that.$el.append(that.freeDraw.getElement());

				that.$el.append(that.uploadFromComputer.getElement());

				that.$el.append(that.colorModule.controller.view.getElement());

				that.$el.append(that.opacityModule.getElement());

			})

		}

	};



})(jQuery,window,document)