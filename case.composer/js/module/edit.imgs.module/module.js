;(function ($,window,document,undefined){
	
	CP.EditImgsModule = function (callbackDashboard){
		this.viewPath = 'js/module/edit.imgs.module/view/template.html';
		this.imgOriginal = null;
		this.imgWrapper = null;
		this.listLiEffect = null;
		this.btnApply = null;

		this.callbackDashboard = callbackDashboard;
	};

	MYLIB.extend(CP.EditImgsModule, CP.PopupModule);

	CP.EditImgsModule.prototype.init = function(){

		this.titlePopup = 'Chỉnh sửa hình ảnh';

		this.parent.proto.init.call(this);

		this.$el.appendTo('body');

		this.render();

	};

	CP.EditImgsModule.prototype.getElement = function(){
		return this.$el;
	};
	CP.EditImgsModule.prototype.render = function(){
		var that = this;
		$.get(this.viewPath, function(tmp) {
			var source = $(tmp).html();
			var template = Handlebars.compile(source);
			var result = template();
			
			that.$elContent.append($(result));
			that.initElement.call(that);
			that.bindEvent();
	
		});
	};

	CP.EditImgsModule.prototype.initElement = function(){
		this.imgWrapper = this.$elContent.find('.img-result');
		this.listLiEffect = this.$elContent.find('.effect-zone li');
		this.btnApply = this.$elContent.find('.apply-effect');
	};

	CP.EditImgsModule.prototype.bindEvent = function(){
		this.listLiEffect
			.bind('click', this.imgsApplyEffectHandle.bind(this));
		this.btnApply
			.bind('click', this.applyImageToCanvas.bind(this));
	};

	CP.EditImgsModule.prototype.applyImageToCanvas = function (){
		this.callbackDashboard.appleEffectImg.call(this.callbackDashboard,this.imgOriginal.attr('src') );
		this.hide();
	}

	CP.EditImgsModule.prototype.imgsApplyEffectHandle = function(e){
		this.listLiEffect.removeClass('active');
		$(e.currentTarget).addClass('active');
		var type = $(e.currentTarget).data('type');

		var options = {
	        onError: function() {
	            alert('ERROR');
	        }
	    }; 


	   	this.imgOriginal.vintage();
	   
	    var ig = this.imgOriginal.data("vintageJS");

	    ig.reset();
	    
	    ig.apply();
	    
	    ig.vintage(vintagePresets[type]);


	};


	/**
	 * Overide method show
	 */
	CP.EditImgsModule.prototype.show = function (src) {
		var img = '<img src="{0}" style="width:100%"/>';
		img = img.format(src);

		this.imgWrapper.html('');
		this.imgOriginal = $(img);

		this.imgWrapper.append(this.imgOriginal);

		this.$el.modal('show');
	}



	MYLIB.mixin(CP.PopupAssetsModule, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)