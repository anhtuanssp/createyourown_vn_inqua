;(function ($,window,document,undefined){
	
	CP.OpacityModule = function (){};

	CP.OpacityModule.prototype.html = 
								'<div class="panel panel-default">'+
								'<div class="panel-heading"><span>Opacity</span></div>'+
									'<div class="slide-font-size panel-body">'+
										'<input id="{0}" type="range" min="0" max="100" value="{1}" step="1"  />'+
										'<output id="{2}"></output>'+
									'</div>'+
								'</div>';

	CP.OpacityModule.prototype.$el = null;

	CP.OpacityModule.prototype.$rangeFontSzie = null;
	CP.OpacityModule.prototype.$outputRangeFontSzie = null;

	CP.OpacityModule.prototype.init = function () {

		this.html = this.html.format('opacity_input',100,
										'output_opacity');
		this.$el = $(this.html);

		this.$rangeFontSzie = this.$el.find('#opacity_input');
		this.$outputRangeFontSzie = this.$el.find('#output_opacity');

		var fontSize = this.$rangeFontSzie.val();
		this.$outputRangeFontSzie.html(fontSize) ;

		this.style();

		this.bindEvent();

	}

	CP.OpacityModule.prototype.style = function () {
		this.$el.css({
			border : '1px solid rgb(217, 237, 204)',
			margin : '10px 0px 0px 0px'
		});
		this.$outputRangeFontSzie.css({
			margin: '0 auto',
			'text-align' : 'center'
		});
	}

	CP.OpacityModule.prototype.getElement = function () {

		return this.$el;

	}

	CP.OpacityModule.prototype.bindEvent = function () {

		this.$rangeFontSzie
			.unbind('change')
			.bind('change', this,this.changeOpacityHandle);
	}

	// EVENT HANDLE
	CP.OpacityModule.prototype.changeOpacityHandle = function (event) {
		// alert('message');
		var that = event.data;
		var opacity = that.$rangeFontSzie.val();
		that.$outputRangeFontSzie.html(opacity) ;

		/**
		 * main canvas will handle
		 */
		MYLIB.eventManager.fireEvent(that,MYLIB.eventNames.event_opacity,opacity);
	}


	MYLIB.mixin(CP.OpacityModule, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)