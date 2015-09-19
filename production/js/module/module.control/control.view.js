;(function ($,window,document,undefined){
	
	CP.ControlView = function (){
		this.$el = null;
		this.$btnZoomIn = null;
		this.$btnZoomOut = null;

		this.rotateRight = null;
		this.rotateLeft = null;

		this.modelService = null;
		this.init = function (modelService){
			this.modelService = modelService;
		}
	};

	
	CP.ControlView.prototype.render = function (successHandle) {
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

	CP.ControlView.prototype.initElement = function () {
		var that = this;
		// console.log(that.modelService.circle.class);/
		this.$btnZoomIn = this.$el.find('.zoom-in');
		this.$btnZoomOut = this.$el.find('.zoom-out');
		this.rotateRight = this.$el.find('.rotate-right');
		this.rotateLeft = this.$el.find('.rotate-left');
		// this.$btnRect = this.$el.find('.'+that.modelService.data.rect.class);
	}

	CP.ControlView.prototype.getElement = function () {
		return this.$el;
	}

	CP.ControlView.prototype.bindEvent = function (scopeController) {
		this.$btnZoomIn
			.unbind('click touchstart')
			.bind('click touchstart','ZOOMIN',scopeController.zoomHandle.bind(scopeController))
		this.$btnZoomOut
			.unbind('click touchstart')
			.bind('click touchstart','ZOOMOUT',scopeController.zoomHandle.bind(scopeController));

		this.rotateRight
			.unbind('click touchstart')
			.bind('click touchstart','ROTATERIGHT',scopeController.rotateHandle.bind(scopeController));
		this.rotateLeft
			.unbind('click touchstart')
			.bind('click touchstart','ROTATELEFT',scopeController.rotateHandle.bind(scopeController));
	}



	MYLIB.mixin(CP.ControlView, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)