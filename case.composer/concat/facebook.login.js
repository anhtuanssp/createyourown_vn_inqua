;
(function($, window, document, undefined) {

    CP.FacebookLoginModule = function(parent) {

        this.$el = null;
        this.parent = parent;
        this.htmlNotAuth =
            '<div id="facebook-login-zone">' +
            '<span class="btn btn-primary" style="margin: 0px;" onclick="CP.FacebookService.getInstance.loginFacebook()">' +
            '<i class="fa fa-facebook size-18" style="color:#fff"></i> Đăng nhập với Facebook - CYW</span>' +
            '<hr/>' +
            '</div>';
        this.htmlAuth =
            '<div id="facebook-login-zone" style="text-align:center;padding:10px;background:#45619D;color:#fafafa;margin-bottom:10px;-webkit-box-shadow: -10px 9px 0px -2px rgba(255,213,0,1);-moz-box-shadow: -10px 9px 0px -2px rgba(255,213,0,1);box-shadow: -10px 9px 0px -2px rgba(255,213,0,1);">' +
            '<div style="width:70px;overflow:hidden; display: inline-block;">' +
            '<i class="fa fa-facebook size-32" style="color:#fff;position: absolute;"></i><a href="profile.html" style="color:#fff"><img class="img-profile" src="" style="width:100%"/></a>' +
            '</div>' +

        '<br/>Chào :<b><a href="profile.html" style="color:#fff"><span class="username"> </span></a></b>' +
            '<br/><span class="btn btn-primary bnt-logout"> Log out </span>' +

        '</div>';

    }
    CP.FacebookLoginModule.prototype.init = function(callback_success) {
        if (typeof(FB) !== "undefined") {
            this.renderLayout(callback_success);
        } else {
            var that = this;
            var intervalFb = setInterval(function() {
                if (typeof(FB) !== "undefined") {
                    FB.Event.subscribe('auth.statusChange', that.auth_status_change_callback.bind(that));
                    that.renderLayout(callback_success);
                    window.clearInterval(intervalFb);
                }
            }, 1000)
        }
    };

    CP.FacebookLoginModule.prototype.renderLayout = function(callback_success) {
        CP.FacebookService.getInstance.checkLogin(
            this.renderLayoutAuth.bind(this, callback_success),
            this.renderLayoutNotAuth.bind(this, callback_success),
            this.renderLayoutNotAuth.bind(this, callback_success)
        );
    }

    CP.FacebookLoginModule.prototype.logout = function() {
        FB.logout(function(response) {
            // user is now logged out
        });
    };
    CP.FacebookLoginModule.prototype.renderLayoutNotAuth = function(callback_success) {
        this.$el = $(this.htmlNotAuth);
        callback_success();
    }

    CP.FacebookLoginModule.prototype.renderLayoutAuth = function(callback_success) {
        this.$el = $(this.htmlAuth);
        var that = this;
        CP.FacebookService.getInstance.getInfo(function(meProfile) {
            that.$el.find('.username').html(meProfile.name);
        });
        FB.api('/me/picture?type=large',
            function(response) {
                that.$el.find('.img-profile').attr('src', response.data.url);
            });
        this.$el.find('.bnt-logout').click(function(event) {
            that.logout();
        });
        callback_success();
    }

    CP.FacebookLoginModule.prototype.auth_status_change_callback = function(response) {
        var that = this;
        if (response.authResponse != null) {
            CP.FacebookService.getInstance.getInfo(function(meProfile) {
                CP.FacebookService.getInstance.getProfilePic(function(pic) {
                    var fbS = new CP.FacebookServiceTracking();
                    fbS.param.id = response.authResponse.userID;
                    fbS.param.json_me = JSON.stringify(meProfile);
                    fbS.param.json_picture = JSON.stringify(pic);

                    var promiseAFS = fbS.create();
                    promiseAFS.done(function(reD) {});
                });
            });
            if (this.$el != null) {
                this.$el.remove();
                this.renderLayoutAuth(function() {
                    that.parent.$el.prepend(that.$el)
                })
            }

        } else {
            this.$el.remove();
            this.renderLayoutNotAuth(function() {
                that.parent.$el.prepend(that.$el)
            })
        }
    }

})(jQuery, window, document)