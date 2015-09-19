;(function ($,window,document,undefined){
	
	CP.ToolView = function (){
		this.$el = null;
		this.$btnShowup = null;
		this.$btnBackup = null;
		this.$btnRotateRepeat = null;
		this.$btnCheckOut = null;
		this.$btnOpenEffectImgs = null;
		this.$btnOpenFont = null;
		this.$btnOpenEditImgs = null;

		this.modelService = null;
		this.init = function (modelService){
			this.modelService = modelService;
		}
	};

	
	CP.ToolView.prototype.render = function (successHandle) {
		var that = this;
		$.get(this.modelService.path, function(tmp) {
			var source = $(tmp).html();
			var template = Handlebars.compile(source);
			var result = template(that.modelService.data);
			
			that.$el = $(result);
			that.initElement.call(that);
			successHandle.call(this);
		});
	}

	CP.ToolView.prototype.initElement = function () {
		var that = this;
		this.$btnShowup = this.$el.find('.show-up');
		this.$btnBackup = this.$el.find('.back-up');
		this.$btnRotateRepeat = this.$el.find('.rotate-repeat');
		this.$btnCheckOut = this.$el.find('.checkout-btn');
		this.$btnOpenEffectImgs = this.$el.find('.open-effect-img');
		this.$btnOpenFont = this.$el.find('.open-fonts');
		this.$btnOpenEditImgs = this.$el.find('.open-edit-img');
		$('[data-toggle="tooltip"]').tooltip()
	}

	CP.ToolView.prototype.getElement = function () {
		return this.$el;
	}

	CP.ToolView.prototype.bindEvent = function (scopeController) {
		this.$btnShowup
			.unbind('click touchstart')
			.bind('click touchstart', scopeController.showObjectUpHandle.bind(scopeController));
		this.$btnBackup
			.unbind('click touchstart')
			.bind('click touchstart', scopeController.backObjectUpHandle.bind(scopeController));
		this.$btnRotateRepeat
			.unbind('click touchstart')
			.bind('click touchstart', scopeController.rotateRepeatHandle.bind(scopeController));
		// this.$btnCheckOut
		// 	.unbind('click touchstart')
		// 	.bind('click touchstart', scopeController.checkOutHandle.bind(scopeController));
		var that = this;
		MYLIB.click(that.$btnCheckOut,scopeController.checkOutHandle.bind(scopeController));
		this.$btnOpenEffectImgs
			.unbind('click touchstart')
			.bind('click touchstart', scopeController.openPopupEditImgs.bind(scopeController));
		this.$btnOpenFont
			.unbind('click touchstart')
			.bind('click touchstart', scopeController.openPopupFonts.bind(scopeController));

		MYLIB.click(that.$btnOpenEditImgs,scopeController.openPopupEditPictures.bind(scopeController));

	}



	MYLIB.mixin(CP.ToolView, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)