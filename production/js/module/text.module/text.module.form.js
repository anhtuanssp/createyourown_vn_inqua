;(function ($,window,document,undefined){
	
	CP.TextFormModule = function (){};

	CP.TextFormModule.prototype.html = 
								'<div class="panel-body" id="text-form-module">'+
									'<input type="text" id="form-text" class="input" placeholder="Your sologan :D" />'+
									'<button id="submit-form-text" class="btn btn-default" style="position:absolute">'+
									'<span class="glyphicon glyphicon-plus"></span></button>'+
								'</div>';

	CP.TextFormModule.prototype.$el = null;
	CP.TextFormModule.prototype.$btnSubmit = null;
	CP.TextFormModule.prototype.$inputText = null;

	CP.TextFormModule.prototype.init = function () {
		
		this.$el = $(this.html);

		this.$btnSubmit = this.$el.find('#submit-form-text');
		this.$inputText = this.$el.find('#form-text');

		this.bindEvent();

	}

	CP.TextFormModule.prototype.getElement = function () {

		return this.$el;

	}

	CP.TextFormModule.prototype.bindEvent = function () {
		console.log('BIND SUBMIT');
		this.$btnSubmit
			.unbind('click touchstart')
			.bind('click touchstart',this, this.submitHandle);

	}

	// EVENT HANDLE
	CP.TextFormModule.prototype.submitHandle = function (event) {
		console.log('TEXT SUBMIT');
		var that =  event.data;
		var text_value = that.$inputText.val();
		if(text_value != ''){
			MYLIB.eventManager.fireEvent(that,MYLIB.eventNames.event_submit_text,text_value);
		}else{
			alert('PLEASE ENTER YOUR CUSTOM TEXT')
		}
		

	}

	MYLIB.mixin(CP.TextFormModule, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)