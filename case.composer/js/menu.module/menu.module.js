;
(function($, window, document, undefined) {


    CP.MainmenuService = function(callback, dataMenu) {

        this.$el = null;
        this.dataMenu = dataMenu;
        this.viewPath = MYLIB.mainUrl + 'js/menu.module/view/template.html';
        this.callbackHanlde = callback;

    };
    CP.MainmenuService.prototype.init = function(success) {

        var that = this;
        $.get(this.viewPath, function(tmp) {
            var source = $(tmp).html();
            var template = Handlebars.compile(source);
            that.dataMenu.url = MYLIB.mainUrl;
            that.$el = $(template(that.dataMenu));
            success();

        });
    }


})(jQuery, window, document)

;
(function($, window, document, undefined) {


    CP.Mainmenu = function(id) {
        this.$el = $(id);
        this.menu = null;
        this.tinyIcon = null;
    };

    CP.Mainmenu.prototype.init = function(position) {
        this.menu = new CP.MainmenuService(this, position);
        this.menu.init(this.renderMenu.bind(this));
    }

    CP.Mainmenu.prototype.renderMenu = function() {
        this.menu.$el.appendTo(this.$el);
        var that = this;
        var waypointMenu = $('#share-header-social').waypoint({
            handler: function(d) {
                that.menuPhuchoi();
            }
        })
        var waypointMenuUp = $('.btn-started').waypoint({
            handler: function(d) {
                that.menuBienHinh();
            }
        })
    }

    CP.Mainmenu.prototype.menuBienHinh = function() {
        var that = this;
        this.$el.slideUp('fast', function() {
            that.$el.parent().animate({
                    height: '30px',
                    'min-height': '30px'
                },
                500);
            if (that.tinyIcon != null) {
                that.$el.parent().append(that.tinyIcon)
            } else {
                that.tinyIcon = $('<span class="fa fa-bars" style="font-size: 20px;color: #fff;width: 20px;margin: 0 auto; display: block;margin-top: 5px;text-align: left;cursor: pointer;"></span>');
                that.tinyIcon.bind('click', function(event) {
					that.menuPhuchoi();
                });
                that.$el.parent().append(that.tinyIcon);
            }
        });
    }
    CP.Mainmenu.prototype.menuPhuchoi = function() {
        var that = this;

        that.$el.slideDown(500, function() {

            that.$el.parent().animate({
                    height: '70px',
                    'min-height': '70px'
                },
                200,
                function() {

                });
            if (that.tinyIcon != null) {
                that.tinyIcon.detach()
            }
        })
    }


})(jQuery, window, document)
