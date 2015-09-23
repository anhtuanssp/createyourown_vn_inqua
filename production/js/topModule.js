;(function ($,window,document,undefined){
	
	CP.TopModule = function (){

		var _this = this;
		var html = '<div id="{0}"" class="{1}"></div>';

		this.$el = null;
		this.socialModule = null;


		this.init = function () {

			// console.log('LEFT INIT');
			html = html.format(MYLIB.constant.top_id,MYLIB.constant.top_class);
			this.$el = $(html);

			this.socialModule = new CP.SocialModule();
			this.socialModule.init();



			this.renderLayout();

		}

		this.getElement = function () {

			return this.$el;

		}

		this.renderLayout = function () {

			// this.$el.append(this.chooseProduct.getElement());
			
			this.$el.append(this.socialModule.controller.view.getElement());

		}

	};



})(jQuery,window,document)