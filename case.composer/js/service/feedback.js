
;(function ($, window, document, undefined){
	CP.FeedbackService = function () { 

		this.setParam = function(data){
			this.param = data;
			return this;
		}	

		return this; 
	};
	CP.FeedbackService.prototype.param = null;
	CP.FeedbackService.prototype.sendFeedback = function () {
		var ajax = $.ajax({
			url : MYLIB.HOST + MYLIB.SERVICENAME.sendFeedback,
			type: 'POST',
			contentType : 'application/json',
			dataType: 'json',
			data : JSON.stringify(this.param)
		});
		return ajax;
	}

})(jQuery,window,document)