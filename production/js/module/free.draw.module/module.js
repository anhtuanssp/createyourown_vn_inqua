;(function ($,window,document,undefined){
	
	CP.FreeDrawModule = function (callback){

		this.$el = null;

		this.$btnSwitchDrawMode = null;
		this.$elmetarial = null;

		this.$elButton = null;

		this.$inputLineWidth = null;

		this.$inputLineColor = null;

		// CONTSTANT
		this.IS_ENABLE_DRAW_MODE = false;

		this.viewPath = "js/module/free.draw.module/view/template.html";

	};

	CP.FreeDrawModule.prototype.init = function(successHandle){

		var that = this;

		// RENDER LAYOUT
		
		$.get(this.viewPath, function(tmp) {
			var source = $(tmp).html();
			var template = Handlebars.compile(source);
			
			that.$el = $(template());
			that.initElement();
			that.bindEvent();

		
			successHandle.call(this);

		});

	};

	CP.FreeDrawModule.prototype.getElement = function () {
		return this.$el;
	}
	CP.FreeDrawModule.prototype.initElement = function(){
		this.$btnSwitchDrawMode = this.$el.find('.draw-mode');
		this.$elmetarial = this.$el.find('.metarial');
		this.$elButton = this.$el.find('button');
		this.$inputLineWidth = this.$el.find('#drawing-line-width');
		this.$inputLineColor = this.$el.find('#drawing-color')
	}

	CP.FreeDrawModule.prototype.bindEvent = function () {
		var that = this;
		this.$btnSwitchDrawMode
			.unbind('click')
			.bind('click', function(event) {
				//FIRE EVENT TO CANVAS : ENABLE OR DISABLE DRAW MODE
				that.IS_ENABLE_DRAW_MODE = !that.IS_ENABLE_DRAW_MODE;
				if(that.IS_ENABLE_DRAW_MODE){
					$(this).find('i').removeClass().addClass('ion-toggle');
					that.$elmetarial.hide();
				}else{
					$(this).find('i').removeClass().addClass('ion-toggle-filled');
					that.$elmetarial.show();
				}

				MYLIB.eventManager.fireEvent(that, MYLIB.eventNames.event_switch_drawmode,that.IS_ENABLE_DRAW_MODE);
			});

		this.$elButton
			.click(function(event) {
				var type = $(this).data('type');
				that.$elButton.removeClass('enableClass')
				$(this).removeClass().addClass('enableClass')
				MYLIB.eventManager.fireEvent(that, MYLIB.eventNames.event_free_draw,type);
			});

		this.$inputLineWidth
			.bind('change', function(event) {
				/* Act on the event */
				$(this).prev().html($(this).val()+'px');
				MYLIB.eventManager.fireEvent(that,MYLIB.eventNames.event_set_line_width_free_draw,$(this).val());
			});

		this.$inputLineColor
			.bind('change', function(event) {
				/* Act on the event */
				// console.log($(this).val());
				MYLIB.eventManager.fireEvent(that,MYLIB.eventNames.event_set_line_color_free_draw,$(this).val())
			});
	}

	CP.FreeDrawModule.prototype.show = function () {

	}

	CP.FreeDrawModule.prototype.hide = function () {

	}

	//CONTROLER :D
	MYLIB.mixin(CP.FreeDrawModule, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)