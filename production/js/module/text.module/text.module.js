;(function ($,window,document,undefined){
	
	CP.TextModule = function (){};

	CP.TextModule.prototype.html = '<div data-step="5" data-intro="Đánh chữ vào ô và bấm nút + để thêm chữ vào sản phẩm" class="panel" id="text-module">'+
										'<div class="panel-heading">Enter your sologan :D</div>'+
									'</div>';

	CP.TextModule.prototype.$el = null;

	CP.TextModule.prototype.formText = null;
	// CP.TextModule.prototype.customTextControl = null;

	CP.TextModule.prototype.init = function () {
		
		this.$el = $(this.html);
		this.renderLayout();

	}

	CP.TextModule.prototype.renderLayout = function () {
		//TEXT FORM MODULE INIT
		this.formText = new CP.TextFormModule();

		this.formText.init();

		// this.customTextControl = new CP.TextModuleCustom();

		// this.customTextControl.init();

		this.$el.append( this.formText.getElement() );
		// this.$el.append(this.customTextControl.getElement());

	}

	CP.TextModule.prototype.getElement = function () {

		return this.$el;

	}


	MYLIB.mixin(CP.TextModule, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)