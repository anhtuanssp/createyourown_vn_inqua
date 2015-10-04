;(function ($, window, document, undefined){
	CP.FacebookServiceTracking = function () {};
	CP.FacebookServiceTracking.prototype.param = {
		id : '',
		json_me : '',
		json_picture : ''
	};


	CP.FacebookServiceTracking.prototype.create = function () {
		var ajax = $.ajax({
			// url: 'data/products.json',
			url : MYLIB.HOST+MYLIB.SERVICENAME.fakeServiceTest1,
			type: 'POST',
			contentType : 'application/json',
			dataType: 'json',
			data : JSON.stringify(this.param)
		});
		return ajax;
	}

	CP.FacebookServiceTracking.prototype.getUserProfile = function (facebookid) {
		var ajax = $.ajax({
			url : MYLIB.HOST+MYLIB.SERVICENAME.getUserProfile+'/'+facebookid,
			type: 'GET',
			contentType : 'application/json',
			dataType: 'json'
		});
		return ajax;
	}	

	CP.FacebookServiceTracking.prototype.updateProfileUser = function (data) {
		var ajax = $.ajax({
			// url: 'data/products.json',
			url : MYLIB.HOST+MYLIB.SERVICENAME.updateProfileUser,
			type: 'POST',
			contentType : 'application/json',
			dataType: 'json',
			data : JSON.stringify(data)
		});
		return ajax;
	}

	CP.FacebookServiceTracking.prototype.uploadSharePhoto = function(data){
		var ajax = $.ajax({
			url : MYLIB.HOST+MYLIB.SERVICENAME.uploadSharePhoto,
			type: 'POST',
			contentType : 'application/json',
			dataType: 'json',
			data : JSON.stringify(data)
		});
		return ajax;
	}

})(jQuery,window,document)