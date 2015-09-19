;(function ($,window,document,undefined){
	
	CP.TextFormModule = function (){};

	CP.TextFormModule.prototype.html = 
								'<div class="panel-body" id="text-form-module">'+
									'<input type="text" id="form-text" class="input" placeholder="Your sologan :D" />'+
									'<button id="submit-form-text" class="btn btn-default" style="position:absolute">'+
									'<span class="glyphicon glyphicon-plus"></span></button>'+
									'<br>'+
									'<br>'+
									'<button type="button" class="btn btn-default btn-open-cloud-text" '+
									'style="width:100%;position:relative;padding:10px;color:#ff57ff;border-color:#ff57ff">'+
										'<i class="ion-ios-flower-outline" aria-hidden="true"'+
										 'style="position:absolute;left:5px;top:0px;color:#ff57ff;font-size:30px"></i>'+
										 'Cloud text</button>'+
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
		// console.log('BIND SUBMIT');
		var that = this;
		this.$btnSubmit
			.unbind('click touchstart')
			.bind('click touchstart',this.submitHandle.bind(this));

		this.$inputText.keypress(function(event) {
			if ( event.which == 13 ) {
			    that.submitHandle();
			}
		});

		this.$el.find('.btn-open-cloud-text')
			.bind('click touchstart', function (){
				MYLIB.eventManager.fireEvent(that, MYLIB.eventNames.event_open_font_edit,false);
			})

	}

	// EVENT HANDLE
	CP.TextFormModule.prototype.submitHandle = function () {
		// console.log('TEXT SUBMIT');
		var text_value = this.$inputText.val();
		if(text_value != ''){
			MYLIB.eventManager.fireEvent(this,MYLIB.eventNames.event_submit_text,text_value);
		}else{
			alert('PLEASE ENTER YOUR CUSTOM TEXT')
		}
		

	}

	MYLIB.mixin(CP.TextFormModule, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)