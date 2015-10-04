;
(function($, window, document, undefined) {

    CP.FacebookLoginModule = function(parent) {

        this.$el = null;
        this.parent = parent;
        this.htmlNotAuth =
            '<div id="facebook-login-zone">' +
            '<span class="btn btn-primary" style="margin: 0px;"' +
            'onclick="CP.FacebookService.getInstance.loginFacebook()">' +
            '<i class="fa fa-facebook size-18" style="color:#fff"></i> Đăng nhập với Facebook <i class="fa fa-share"></i>' +
            '</span>' +
            '<hr/>' +
            '</div>';
        this.htmlAuth =
            '<div id="facebook-login-zone" style="text-align:center;padding:10px;background:#45619D;color:#fafafa;margin-bottom:10px;-webkit-box-shadow: -10px 9px 0px -2px rgba(255,213,0,1);-moz-box-shadow: -10px 9px 0px -2px rgba(255,213,0,1);box-shadow: -10px 9px 0px -2px rgba(255,213,0,1);">' +
            '<div style="width:70px;overflow:hidden; display: inline-block;">' +
            '<i class="fa fa-facebook size-32" style="color:#fff;position: absolute;"></i><a href="profile.html" style="color:#fff"><img class="img-profile" src="" style="width:100%"/></a>' +
            '</div>' +

            '<br/>Chào :<b><a href="profile.html" style="color:#fff"><span class="username"> </span></a></b>' +
            '<br/><span class="btn btn-primary bnt-logout"> Log out </span>' +
            '<span class="btn btn-primary bnt-share"> Share <i class="fa fa-share"></i> </span>' +
            '</div>';

        this.popupShare = new CP.FacebookLoginModule.PopupShareFacebook(this.parent);
        this.popupShare.init();

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
        this.$el.find('.bnt-share').click(function(event) {
            that.openPopupShare();
        });
        callback_success();
    }
    CP.FacebookLoginModule.prototype.openPopupShare = function() {
        this.popupShare.show();
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

    /*
     * Facebook popup share 
     */
    CP.FacebookLoginModule.PopupShareFacebook = function(parentScope) {
        this.parentScope = parentScope;
        this.view = '<div style="padding:20px">' +
            '<form>' +
            '<legend>Điền thông tin để share</legend>' +

            '<div class="form-group">' +
            '<label for="">Chia sẽ</label>' +
            '<input type="text" class="form-control" id="message" placeholder="Nhập nội dung bạn muốn chia sẽ">' +
            '</div>' +

            '<div class="review" style="">' +
            '<canvas id="share_facebook" width="470px" height="246px">' +
            '</div>' +
            '<br/>' +
            '<div style="position: absolute;top: 26%;right: 4%;">' +
            '<span class="share-facebook btn btn-default btn-primary">Share now <i class="fa fa-share"></i></span>'
        '</div>' +
        '</div class="clearfix"></div>' +
        '</form>' +
        '</div>';

        this.canvasShare = null;
        this.fb_textMsg = new fabric.Text('', {
                    left: 20,
                    top: 170,
                    fontSize: 20,
                    fill: '#fff',
                    fontFamily : 'SVN-Aaron Script'
                })
    }

    MYLIB.extend(CP.FacebookLoginModule.PopupShareFacebook, CP.PopupModule);

    CP.FacebookLoginModule.PopupShareFacebook.prototype.init = function() {

        this.titlePopup = 'Share lên facebook của bạn';

        this.parent.proto.init.call(this);

        this.$el.appendTo('body');

        this.$el.find('.modal-lg').removeClass('modal-lg').css({
            width: '550px'
        });

        this.$elContent.append(this.view);

        this.canvasShare = new fabric.Canvas('share_facebook', {
            renderOnAddition: false,
            hoverCursor: 'pointer',
            selection: true,
            isDrawingMode: false,
        });
        this.canvasShare.setBackgroundColor('#FFEC16');

        this.$el.find('.share-facebook')
            .unbind('click')
            .bind('click', this.shareFacebookHandler.bind(this))


        this.$el.find('#message')
            .unbind('change')
            .bind('change', this.changeTextShareFacebook.bind(this));

        var that = this;
        setInterval(function(){
            that.changeTextShareFacebook();
        }, 2000)


    };
    CP.FacebookLoginModule.PopupShareFacebook.prototype.changeTextShareFacebook = function(){
        this.fb_textMsg.text = this.$el.find('#message').val();
        this.fb_textMsg.setCoords();
        this.canvasShare.deactivateAll().renderAll();
    }
    CP.FacebookLoginModule.PopupShareFacebook.prototype.shareFacebookHandler = function() {
        var service = new CP.FacebookServiceTracking();
        var that = this;
        var titleMsg = this.$el.find('#message').val();
        var url = document.URL;

        CP.FacebookService.getInstance.getInfo(function(meProfile) {
            // console.log(meProfile)
            that.canvasShare.deactivateAll().renderAll();

            var dataurl = that.canvasShare.toDataURL({
                format: 'png',
                multiplier: 2
            });

            var ajax = service.uploadSharePhoto({
                share_photo: dataurl,
                facebook_id: meProfile.id
            });

            ajax.done(function(res) {
               

                CP.FacebookService.getInstance.checkLogin(function() {
                    //success
                    CP.FacebookService.getInstance.shareUI(url, MYLIB.IMAGEHOST+res.url, titleMsg)

                }, function() {
                    //Chưa có quyền
                    CP.FacebookService.getInstance.loginFacebook(function() {
                        CP.FacebookService.getInstance.shareUI(url, MYLIB.IMAGEHOST+res.url, titleMsg)

                    })
                }, function() {
                    //chưa đăng nhập
                    fb.loginFacebook(function() {
                       CP.FacebookService.getInstance.shareUI(url, MYLIB.IMAGEHOST+res.url, titleMsg)

                    })
                });
            })
        });



    }

    CP.FacebookLoginModule.PopupShareFacebook.prototype.show = function() {
        this.$el.modal('show');

        var that = this;
        that.canvasShare.clear().renderAll();

        

        this.canvasShare.add(
                new fabric.Rect({
                    top: 150,
                    left: 0,
                    width: 470,
                    height: 80,
                    fill: '#45619D'
                }),
                new fabric.Text('inqua.vn', {
                    left: 30,
                    top: 10,
                    fontSize: 60,
                    fill: '#fff',
                    fontWeight: 'bold'
                }),
                new fabric.Text('Create Your Own', {
                    left: 30,
                    top: 88,
                    fontSize: 20,
                    fill: '#000'
                }),
                new fabric.Text('Thank for your sharing', {
                    left: 30,
                    top: 200,
                    fontSize: 14,
                    fill: '#fff'
                })
            )
            this.canvasShare.add(this.fb_textMsg);
            var imgObjLogo = new Image();
            imgObjLogo.src = 'http://inqua.vn/cms/public/packages/anahkiasen/illuminage/f07bc2ba74e90b7c7b6b889b02da05d5.png';

             imgObjLogo.onload = function() {
            var image = new fabric.Image(imgObjLogo, {
                centeredScaling: true,
                centeredRotation: true,
                scaleX: 100 / imgObjLogo.width,
                scaleY: 100 / imgObjLogo.height,
                left: 350,
                top: 20,
            });

            that.canvasShare.add(image)
        }

        if (this.parentScope.callBackDashboardModule.rightModule.getMainCanvas().hasBack) {
            var imgObj = new Image();
            imgObj.src = this.parentScope.callBackDashboardModule.rightModule.getMainCanvas().saveCanvasToImg();

            imgObj.onload = function() {
                var image = new fabric.Image(imgObj, {
                    centeredScaling: true,
                    centeredRotation: true,
                    scaleX: 100 / imgObj.width,
                    scaleY: 100 / imgObj.height,
                    stroke: '#c9c9c9',
                    strokeWidth: 10,
                    left: 250,
                    top: 140,
                });

                that.canvasShare.add(image)
            }

            var imgObjBack = new Image();
            imgObjBack.src = this.parentScope.callBackDashboardModule.rightModule.getMainCanvas().saveCanvasBackToImg();

            imgObjBack.onload = function() {
                var image = new fabric.Image(imgObjBack, {
                    centeredScaling: true,
                    centeredRotation: true,
                    scaleX: 100 / imgObjBack.width,
                    scaleY: 100 / imgObjBack.height,
                    left: 360,
                    top: 140,
                    stroke: '#c9c9c9',
                    strokeWidth: 10,
                });

                that.canvasShare.add(image)
            }

        } else {
            var imgObj = new Image();
            imgObj.src = this.parentScope.callBackDashboardModule.rightModule.getMainCanvas().saveCanvasToImg();

            imgObj.onload = function() {
                var image = new fabric.Image(imgObj, {
                    centeredScaling: true,
                    centeredRotation: true,
                    scaleX: 100 / imgObj.width,
                    scaleY: 100 / imgObj.height,
                    stroke: '#c9c9c9',
                    strokeWidth: 10,
                    left: 400,
                    top: 140,
                });

                that.canvasShare.add(image)
            }
        }

    }

})(jQuery, window, document)
