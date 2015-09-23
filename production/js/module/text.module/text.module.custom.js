;(function ($,window,document,undefined){
	
	CP.TextModuleCustom = function (){};

	CP.TextModuleCustom.prototype.html = 
								'<div id="text-module-custom" class="panel panel-default">'+
								'<div class="panel-heading"><span>Chọn font chữ</span></div>'+
									'<div class="slide-font-size panel-body">'+
										'<input id="{0}" type="range" min="0" max="50" value="{1}" step="1"  />'+
										'<output id="{2}"></output>'+
									'</div>'+
								'</div>';

	CP.TextModuleCustom.prototype.$el = null;

	CP.TextModuleCustom.prototype.$rangeFontSzie = null;
	CP.TextModuleCustom.prototype.$outputRangeFontSzie = null;

	CP.TextModuleCustom.prototype.init = function () {

		this.html = this.html.format(MYLIB.constant.text_module_custom_font_size_id,CP_INIT.text.fontSize,
										MYLIB.constant.text_module_custom_font_size_output_id);
		this.$el = $(this.html);

		this.$rangeFontSzie = this.$el.find('#'+MYLIB.constant.text_module_custom_font_size_id);
		this.$outputRangeFontSzie = this.$el.find('#'+MYLIB.constant.text_module_custom_font_size_output_id);

		var fontSize = this.$rangeFontSzie.val();
		this.$outputRangeFontSzie.html(fontSize+'px') ;

		this.style();

		this.bindEvent();

	}

	CP.TextModuleCustom.prototype.style = function () {
		this.$el.css({
			border : '1px solid rgb(217, 237, 204)',
			margin : '10px 0px 0px 0px'
		});
		this.$outputRangeFontSzie.css({
			margin: '0 auto',
			'text-align' : 'center'
		});
	}

	CP.TextModuleCustom.prototype.getElement = function () {

		return this.$el;

	}

	CP.TextModuleCustom.prototype.bindEvent = function () {

		this.$rangeFontSzie
			.unbind('change')
			.bind('change', this,this.changeRangeFontSizeHandle);
	}

	// EVENT HANDLE
	CP.TextModuleCustom.prototype.changeRangeFontSizeHandle = function (event) {
		// alert('message');
		var that = event.data;
		var fontSize = that.$rangeFontSzie.val();
		that.$outputRangeFontSzie.html(fontSize+'px') ;

		MYLIB.eventManager.fireEvent(that,MYLIB.eventNames.event_fontSize,fontSize);
	}


	MYLIB.mixin(CP.TextModuleCustom, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)