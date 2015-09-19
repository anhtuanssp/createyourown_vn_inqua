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
		console.log('COLOR CHANGE : '+$input.val());
		MYLIB.eventManager.fireEvent(that,MYLIB.eventNames.event_change_color,hexColor);
	}



	MYLIB.mixin(CP.ColorController, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)