;(function ($,window,document,undefined){
	
	CP.ColorController = function (){
		//VIEW
		this.view = null;
		//model
		this.model = null;


	};

 
	CP.ColorController.prototype.init = function () {
		this.view = new CP.ColorView();
		this.view.init();

		this.model = new CP.ColorModel();
		this.model.init();

		this.view.render([this.model.HEADING,this.model.ID_INPUT,this.model.NAME_INPUT]);

		this.bindEvent();
	}


	CP.ColorController.prototype.bindEvent = function () {
		this.view.bindEvent(this)
	}

	//FUNCTION 
	CP.ColorController.prototype.changeColorHandle = function (event) {
		var that = event.data;
		var $input = $(event.currentTarget);
		var hexColor = $input.val();
		// console.log('COLOR CHANGE : '+$input.val());
		MYLIB.eventManager.fireEvent(that,MYLIB.eventNames.event_change_color,hexColor);
	}



	MYLIB.mixin(CP.ColorController, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)
;(function ($,window,document,undefined){
	
	CP.ColorModule = function (){
		this.controller = null;
	};


	CP.ColorModule.prototype.init = function () {
		this.controller = new CP.ColorController();
		this.controller.init();
	}


	MYLIB.mixin(CP.ColorModule, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)
;(function ($,window,document,undefined){
	
	CP.ColorModel = function (){
		this.ID_INPUT = 'input-color-picker';
		this.NAME_INPUT = 'input-color-picker';
		this.HEADING = 'Chọn màu sắc';
	};

	
	CP.ColorModel.prototype.init = function () {
		return true;
	}


	CP.ColorModel.prototype.getElement = function () {

	}

	CP.ColorModel.prototype.bindEvent = function () {
		
	}



	MYLIB.mixin(CP.ColorView, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)
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