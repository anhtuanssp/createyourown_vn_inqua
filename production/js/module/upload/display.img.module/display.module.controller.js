;(function ($,window,document,undefined){
	'use strick'
	CP.DisplayImgController = function (){
		//VIEW
		this.view = null;
		//model
		this.model = null;
	};


	CP.DisplayImgController.prototype.init = function () {
		this.view = new CP.DisplayImgModuleView();
		this.view.init();

		this.model = new CP.DisplayImgModuleModel();
		this.model.init();

		this.view.render([this.model.CLASS,this.model.ID]);

		this.bindEvent();
	}


	CP.DisplayImgController.prototype.bindEvent = function () {
		MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_display_img,'addDisplayImageUploadHandle');
		this.view.bindEvent(this);
	}

	CP.DisplayImgController.prototype.renderImageHandle = function (event){
		// console.log(';sdsdsd');
		var target = $(event.target);
		console.log(target);
		if(target.attr('src') === undefined)
			return;
		var src = target.attr('src');
		MYLIB.eventManager.fireEvent(this,MYLIB.eventNames.event_upload_from_computer,src);
		// console.log(target);
	}

	CP.DisplayImgController.prototype.addDisplayImageUploadHandle = function (event) {
		
		var src = event.data;
		this.view.renderItem(src);
	}


	MYLIB.mixin(CP.DisplayImgController, MYLIB.Event.ObserverMixin);
})(jQuery,window,document)