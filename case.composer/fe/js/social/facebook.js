CP.FacebookService = function() {}

CP.FacebookService.prototype.checkLogin = function(callbackSuccess, callbackNotAuthorization, callbackNotLogin) {
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            callbackSuccess(response);
        } else if (response.status === 'not_authorized') {
            callbackNotAuthorization(response)
        } else {
            callbackNotLogin(response)
        }
    });
}
CP.FacebookService.prototype.loginFacebook = function(callbackSuccess) {
    FB.login(function() {
        if (callbackSuccess && typeof(callbackSuccess))
            callbackSuccess();
    }, {
        scope: 'email,user_likes,publish_actions,user_photos'
    });
}

CP.FacebookService.prototype.getAlbums = function(limit, paging, callbackSuccess, callbackError) {
    var url = '/me/albums?limit=' + limit;
    if (paging != '' && paging != undefined)
        url += '&after=' + paging;

    FB.api(
        url,
        function(response) {
            if (response && !response.error) {
                if (callbackSuccess && typeof(callbackSuccess))
                    callbackSuccess(response);
            } else {
                if (callbackError && typeof(callbackError))
                    callbackError(response);
            }
        }
    );

}

CP.FacebookService.prototype.getImagesFromAlbums = function(albumId, limit, paging, callbackSuccess, callbackError) {
    var url = albumId + '/photos?limit=' + limit;
    if (paging != '' && paging != undefined)
        url += '&pretty=0&after=' + paging;

    FB.api(
        url,
        function(response) {
            if (response && !response.error) {
                if (callbackSuccess && typeof(callbackSuccess))
                    callbackSuccess(response);
            } else {
                if (callbackError && typeof(callbackError))
                    callbackError(response);
            }
        }
    );

}

CP.FacebookService.prototype.shareAMessage = function(url, img) {

    var sizeMsg = _.size(CP_SEO.facebookMessage.msg);
    var randomIndex = _.random(0, sizeMsg - 1);
    var msg = CP_SEO.facebookMessage.msg[randomIndex];


    FB.api('/me/feed', 'post', {
        message: msg,
        picture: img,
        caption: msg,
        link: url
    }, function(response) {
        if (!response || response.error) {
            alert('Error occured');
        } else {
            alert('Cảm ơn bạn, bài viết của bạn đã được public trên trang cá nhân của bạn.');
        }
    });

}

CP.FacebookService.prototype.shareUI = function(url, img, msg, caption) {


    FB.ui({
        method: 'feed',
        link: url,
        caption: caption,
        picture: img,
    }, function(response) {

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