;(function ($,window,document,undefined){
	
	CP.ShapeView = function (){
		this.$el = null;
		this.$btnCircle = null;
		this.$btnRect = null;

		this.modelService = null;
		this.init = function (modelService){
			this.modelService = modelService;
		}
	};

	
	CP.ShapeView.prototype.render = function (successHandle) {
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

	CP.ShapeView.prototype.initElement = function () {
		var that = this;
		// console.log(that.modelService.circle.class);/
		this.$btnCircle = this.$el.find('.'+that.modelService.data.circle.class);
		this.$btnRect = this.$el.find('.'+that.modelService.data.rect.class);
	}

	CP.ShapeView.prototype.getElement = function () {
		return this.$el;
	}

	CP.ShapeView.prototype.bindEvent = function (scopeController) {
		this.$btnCircle
			.unbind('click touchstart')
			.bind('click touchstart','CIRCLE',scopeController.drawShape.bind(scopeController))
		this.$btnRect
			.unbind('click touchstart')
			.bind('click touchstart','RECT',scopeController.drawShape.bind(scopeController))
	}



	MYLIB.mixin(CP.ShapeView, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)