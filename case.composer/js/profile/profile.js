;
(function($, window, document, undefined) {
    'use strict';

    var profile = function($id) {

        this.$el = $id;
        this.$elProfileImgs = null;
        this.$elProfileForm = null;
        this.$elProfileTableOrders = null;

        this.dataFacebook = {
        	me : null,
        	pics : null
        };

        this.dataUser = null;


        this.init = function() {
        	this.$elProfileImgs = this.$el.find('.profile-imgs-wrapper');
        	this.$elProfileForm = this.$el.find('.profile-form-edit');
        	this.$elProfileTableOrders = this.$el.find('.profile-orders-tracking');
            if (typeof(FB) !== "undefined") {
                this.checkLogin();
            } else {
                var that = this;
                var intervalFb = setInterval(function() {
                    if (typeof(FB) !== "undefined") {
                        that.checkLogin();
                        window.clearInterval(intervalFb);
                    }
                }, 1000)
            }
        }

        this.checkLogin = function() {
        	var that = this;
            //Check facebook login yet
            FB.Event.subscribe('auth.logout', function(){
            	location.reload();
            });
            FB.Event.subscribe('auth.login', function(){
            	location.reload();
            });
            CP.FacebookService.getInstance.checkLogin(function(response) {
                CP.FacebookService.getInstance.getInfo(function(meProfile) {
                    CP.FacebookService.getInstance.getProfilePic(function(pic) {
                    	that.dataFacebook.me = meProfile;
                    	that.dataFacebook.pics = pic;

                    	that.$elProfileImgs.find('.fullname').html(meProfile.name);
                    	that.$elProfileImgs.find('.profiePic').attr('src',pic.data.url);

                    	var service = new CP.FacebookServiceTracking();
                    	var ajax = service.getUserProfile(meProfile.id);
                    	ajax.done(function(res){
                    		that.dataUser = res;
                    		that.renderProfile();
                    		that.bindEvent();
                    	})

                    });
                });
            }, function() {
                that.$elProfileTableOrders.html('');
                that.$elProfileTableOrders.html('<h3>Bạn chưa đăng nhập, vui lòng đăng nhập bằng facebook trước</h3>')
            	that.$elProfileImgs.find('.fullname').html("Anonymous");
            	that.$elProfileForm.find('.btn-submit-profile').attr('disabled', 'true');
            }, function() {
                that.$elProfileTableOrders.html('');
                that.$elProfileTableOrders.html('<h3>Bạn chưa đăng nhập, vui lòng đăng nhập bằng facebook trước</h3>')
            	that.$elProfileImgs.find('.fullname').html("Anonymous");
            	that.$elProfileForm.find('.btn-submit-profile').attr('disabled', 'true');
            })
        }

        this.renderProfile = function(){
        	this.$elProfileForm.find('textarea[name="address"]').val(this.dataUser.address);
        	this.$elProfileForm.find('input[name="email"]').val(this.dataUser.email);
        	this.$elProfileForm.find('input[name="phone"]').val(this.dataUser.phone);
        }
        this.bindEvent = function(){
        	var that = this;
        	this.$elProfileForm.find('button.btn-submit-profile')
        		.click(function(event) {
        			    var service = new CP.FacebookServiceTracking();
        			    var data = {
        			    	email : that.dataUser.email,
        			    	address : that.$elProfileForm.find('textarea[name="address"]').val(),
        			    	phone : that.$elProfileForm.find('input[name="phone"]').val()
        			    }
        			    MYLIB.LOADING_WITH_ID('profile');
                    	var ajax = service.updateProfileUser(data);
                    	ajax.done(function(res){
                    		MYLIB.REMOVE_LOADING();
                    	})
        		});
        	
        }

    }

    var profileInstance = new profile($('#profile'));
    profileInstance.init();

})(jQuery, window, document)
