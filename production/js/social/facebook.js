CP.FacebookService = function () {}

CP.FacebookService.prototype.checkLogin = function (callbackSuccess,callbackNotAuthorization,callbackNotLogin) {
	// console.log('Check Login Facebook');
	FB.getLoginStatus(function(response) {
		// console.log(response);
		if (response.status === 'connected') {
				// the user is logged in and has authenticated your
				// app, and response.authResponse supplies
				// the user's ID, a valid access token, a signed
				// request, and the time the access token 
				// and signed request each expire
				// var uid = response.authResponse.userID;
				// var accessToken = response.authResponse.accessToken;
				// console.log(response);
				callbackSuccess(response);
			} else if (response.status === 'not_authorized') {
				// the user is logged in to Facebook, 
				// but has not authenticated your app
				// console.log(response);
				callbackNotAuthorization(response)
			} else {
				// the user isn't logged in to Facebook.
				// console.log(response);
				callbackNotLogin(response)
			}
	 });
}
CP.FacebookService.prototype.loginFacebook = function (callbackSuccess){
 	FB.login(function(){
 		if(callbackSuccess && typeof(callbackSuccess))
 			callbackSuccess();
 	},{scope: 'email,user_likes,publish_actions,user_photos'});
}

CP.FacebookService.prototype.getAlbums = function (limit,paging,callbackSuccess,callbackError){
	var url = '/me/albums?limit='+limit;
	if(paging !='' && paging!= undefined)
		url += '&after='+paging;

	FB.api(
	    url,
	    function (response) {
	      if (response && !response.error) {
	        if(callbackSuccess && typeof(callbackSuccess))
	        	callbackSuccess(response);
	      }else{
	      	if(callbackError && typeof(callbackError))
	        	callbackError(response);
	      }
	    }
	);

}

CP.FacebookService.prototype.getImagesFromAlbums = function (albumId,limit,paging,callbackSuccess,callbackError){
	var url = albumId+'/photos?limit='+limit;
	if(paging !='' && paging!= undefined)
		url += '&pretty=0&after='+paging;

	FB.api(
	    url,
	    function (response) {
	      if (response && !response.error) {
	        if(callbackSuccess && typeof(callbackSuccess))
	        	callbackSuccess(response);
	      }else{
	      	if(callbackError && typeof(callbackError))
	        	callbackError(response);
	      }
	    }
	);

}

CP.FacebookService.prototype.shareAMessage = function (url,img){
	
	var sizeMsg = _.size(CP_SEO.facebookMessage.msg);
	var randomIndex = _.random(0, sizeMsg-1);
	var msg = CP_SEO.facebookMessage.msg[randomIndex];


	FB.api('/me/feed', 'post', { message: msg,picture : img,caption : msg, link : url }, function(response) {
	  	if (!response || response.error) {
	    	alert('Error occured');
	  	} else {
	    	alert('Cảm ơn bạn, bài viết của bạn đã được public trên trang cá nhân của bạn.');
	  	}
	});

}

CP.FacebookService.prototype.shareUI = function (url,img,msg,caption){


	FB.ui({
	  method: 'feed',
	  link: url,
	  caption: caption,
	  picture : img,
	  display :'popup',
	}, function(response){
			// if (!response || response.error) {
		 //    	alert('Error occured');
		 //  	} else {
		 //    	alert('Cảm ơn bạn, bài viết của bạn đã được public trên trang cá nhân của bạn.');
		 //  	}
	});

}

CP.FacebookService.prototype.getInfo = function(callback) {
    FB.api('/me', {
            "fields": "id,name,about,birthday,education,devices,address,bio,age_range,gender,hometown,email,first_name,last_name"
        },
        function(response) {
            callback(response);
        });
};
CP.FacebookService.prototype.getProfilePic = function(callback) {
    FB.api('/me/picture?type=large',
        function(response) {
            callback(response);
        });
}


CP.FacebookService.getInstance = new CP.FacebookService();

/**
 * GEN FACEBOOK PROFILE
 */
;(function(window, document, undefined) {


    function callback_facebookLoad() {

        facebookService.renderProfileFacebook($('#facebook_profile'));

        FB.Event.subscribe('auth.logout', logout_callback);
        FB.Event.subscribe('auth.login', login_callback);
        FB.Event.subscribe('auth.statusChange', auth_status_change_callback);
    }

    var logout_callback = function(response) {
        facebookService.renderProfileFacebook($('#facebook_profile'));
    }
    var login_callback = function(response) {
        facebookService.renderProfileFacebook($('#facebook_profile'));
    }

    var auth_status_change_callback = function(response) {
        // console.log("auth_status_change_callback: " + response.status);
        // console.log(response);
        if (response.authResponse != null) {
            facebookService.getInfo(response.authResponse.userID, function(meProfile) {
                facebookService.getProfilePic(response.authResponse.userID, function(pic) {
                    // console.log(meProfile);
                    // console.log(pic);

                    var fbS = new CP.FacebookServiceTracking();
                    fbS.param.id = response.authResponse.userID;
                    fbS.param.json_me = JSON.stringify(meProfile);
                    fbS.param.json_picture = JSON.stringify(pic);

                    var promiseAFS = fbS.create();
                    promiseAFS.done(function(reD){

                    });
                });
            });
        }
    }

    var facebookService = (function(callback_facebookLoad) {
        var getInfo = function(id, callback) {
            FB.api('/' + id, {
                    "fields": "id,name,about,birthday,education,devices,address,bio,age_range,gender,hometown,email,first_name,last_name"
                },
                function(response) {
                    callback(response);
                });
        };
        var getProfilePic = function(id, callback) {
            FB.api('/' + id + '/picture?type=large',
                function(response) {
                    callback(response);
                });
        }
        var renderProfileFacebook = function($elId) {
            CP.FacebookService.getInstance.checkLogin(function(response) {
                facebookService.getInfo(response.authResponse.userID, function(meProfile) {
                    facebookService.getProfilePic(response.authResponse.userID, function(pic) {
                        var img = $('<img style="width: 100%;" />');
                        var divImg = $('<div class="fb-img-picture"></div>');
                        img.attr('src', pic.data.url);
                        divImg.append('<a href="profile.html" style="color:#fff">'+img[0].outerHTML +'</a>');
                        divImg.css({
						    width: '50px',
						    overflow: 'hidden',
						    height: '50px',
						    display: 'inline-block',
						    'border-radius':' 50%'
                        });

                        var spanProfile = $('<span class="fb-img-name"></span>');
                        spanProfile.text(meProfile.name);
                        spanProfile.css({
						  	'vertical-align': 'top',
						    'margin-top': '-7px',
						    'display': 'block',
						    'margin-left': '-1px',
						    'font-weight': 'bold'
                        });

                        $elId.append(divImg);
                        $elId.append(spanProfile);

                        $elId.css({
						    position: 'absolute',
						    width: '120px',
						    display: 'inline-block',
						    top: '-8px',
						    left: '145px'
                        });
                    });
                });
            }, function() {
                $elId.html('');
            }, function() {
                $elId.html('');
            })
        };
        var init = function(){
		    if (typeof(FB) !== "undefined") {
		        callback_facebookLoad();
		    } else {
		        var intervalFb = setInterval(function() {
		            if (typeof(FB) !== "undefined") {
		                callback_facebookLoad();
		                window.clearInterval(intervalFb);
		            }
		        }, 1000)
		    }

        }
        return {
            getInfo: getInfo,
            getProfilePic: getProfilePic,
            renderProfileFacebook: renderProfileFacebook,
            init : init
        }
    })(callback_facebookLoad);

    facebookService.init();


}(window, document))
