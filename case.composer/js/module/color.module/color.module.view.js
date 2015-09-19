;(function ($,window,document,undefined){
	
	CP.ColorView = function (){
		this.html = '';
		this.$el = null;
		this.$input = null;
		this.init = function () {
			this.html = 
			'<div data-step="6" data-intro="Sau khi thêm chữ, các bạn có thể chọn màu sắc cho chữ" class="panel panel-default">'+
				'<div class="panel-heading"><i class="ion-ios-color-filter size-18"></i> {0}</div>'+
				'<div class="panel-body">'+
					'<input id="{1}" type="text" value="000" name="{2}" class="pick-a-color form-control">'
				'</div>'+
			'</div>';
		}
	};

	
	CP.ColorView.prototype.render = function (data) {
		if($.isArray(data)){
			this.html = this.html.format(data[0],data[1],data[2]);
			this.$el = $(this.html);
			this.$input = this.$el.find('#'+data[1]);
		}else{
			throw 'Data render must be array';
		}
	}


	CP.ColorView.prototype.getElement = function () {
		return this.$el;
	}

	CP.ColorView.prototype.bindEvent = function (scopeController) {
		
		this.$input.pickAColor();

		this.$input
			.unbind('change')
			.bind('change',scopeController,scopeController.changeColorHandle)
	}



	MYLIB.mixin(CP.ColorView, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)