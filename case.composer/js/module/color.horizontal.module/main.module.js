;(function ($,window,document,undefined){


	CP.ColorModuleHorizontal = function (){
		this.$el = null;
		this.viewPath = MYLIB.mainUrl + "js/module/color.horizontal.module/view/tmp.html";
		this.$listColor =  null;
		this.$elCirleResult = null;
	};

	CP.ColorModuleHorizontal.prototype.init = function (renderSuccess){
		var that = this;
		$.get(this.viewPath, function(tmp) {
			var source = $(tmp).html();
			var template = Handlebars.compile(source);
			that.$el = $(template());
			that.$listColor = $(that.$el[2]).find('#color-horizontal-module-main');
			that.$elCirleResult = $(that.$el[2]).find('.circle-result');
			that.bindEvent();

			if(renderSuccess != undefined 
				&& typeof(renderSuccess) == 'function') {

				renderSuccess.call(that);
		}
	});
	};

	CP.ColorModuleHorizontal.prototype.bindEvent = function (){
		var that = this;
		this.$elCirleResult.parent().draggable(
		{
			axis: "x",
			grid: [ 20, 0 ],
			drag : function(event, ui){
					// console.log(ui.position)
					// ui.position.left = Math.min( 0, 632 );
					if(ui.position.left <= -10){
						ui.position.left = 0;
						return false;
					}
					if(ui.position.left > 540){
						ui.position.left = 540;
						return false;
					}
				},
				stop : function(event,ui){

					var count = Math.round(ui.position.left / 20) ;

					var el = that.$listColor.find('li').eq(count).find('div');
					
					that.applyResult(el);

				}
			}
			);
		this.$listColor.find('li').click(function(event) {
			var divElement = $(this).find('div');
			
			that.applyResult(divElement);
		});
	};
	var hexDigits = new Array
	("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

	//Function to convert hex format to a rgb color
	function rgb2hex(rgb) {
		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	}

	function hex(x) {
		return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
	}
	CP.ColorModuleHorizontal.prototype.applyResult = function (divElement){
		var that = this;
		var position = divElement.position()
		this.$elCirleResult.css({
			background: divElement.css('background-color'),
		});
		this.$elCirleResult.parent().css({
			left : position.left - 10
		});
		MYLIB.eventManager.fireEvent(that,MYLIB.eventNames.event_change_color,rgb2hex(divElement.css('background-color')));
	};
})(jQuery,window,document)