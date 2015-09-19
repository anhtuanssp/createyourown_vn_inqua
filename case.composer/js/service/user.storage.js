;(function ($,window,document,undefined){
	
	CP.User = function (){
		this.name = '';
		this.avatar = '';
		this.email = '';
		this.facebookObj = {
			'status' : null,
			'album' : null,
			'key' : 'facebook_obj'
		};

		this.id = null;
		this.key = "cyo_user";
	};

	CP.User.prototype.init = function(){
		
	}

	CP.User.prototype.loginFacebook = function(success){
		var that = this;
		var fb = new CP.FacebookService();
		fb.loginFacebook(function(){
			that.checkFacebookObj();
			success();
		});
	}
	CP.User.prototype.getFacebook = function(){
		if(localStorage[this.facebookObj.key] != undefined)
			return jQuery.parseJSON(localStorage[this.facebookObj.key]) ;
		else{
			return null;
		}
	}
	CP.User.prototype.checkFacebookObj = function(success,failAuthorization,notLogin){
		var fb = new CP.FacebookService();
		var that = this;
		fb.checkLogin(function(res){
			// console.log(res);
			//LOGINED
			that.setFacebook(res);
			if(typeof(success)=='function')
				success(res);

		},function(res){
			//NOT Authorization
			if(typeof(success)=='function')
				failAuthorization(res);
		},function(res){
			//NOT LOGIN
			if(typeof(success)=='function')
				notLogin(res);
		});
	}
	CP.User.prototype.setFacebook = function (res) {
		localStorage[this.facebookObj.key] = JSON.stringify(res);
		this.facebookObj.status = localStorage[this.facebookObj.key];
	}

	CP.User.prototype.checkLogin = function(){
		
	}



	CP.User.prototype.getName = function(){
		return this.name;
	}
	CP.User.prototype.setName = function(name){
		this.name = name;
	}

	//SINGLETON TO GET USER INFOMATION
	CP.SingletonUser = (function () {
	    var instance;
	 
	    function createInstance(success,fail) {
	        var object = new CP.User();
	        object.init();
	        return object;
			
	    }
	 
	    return {
	        getInstance: function () {
	            if (!instance) {
	                instance = createInstance();
	            }
	            return instance;
	        }
	    };
	    
	})();


})(jQuery,window,document)