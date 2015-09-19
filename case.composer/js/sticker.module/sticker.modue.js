;
(function($, window, document, undefined) {


    CP.StickerModule = function() {

        this.$el = null;
        this.$elMediaContent = null;
        this.viewPath = MYLIB.mainUrl + 'js/sticker.module/view/template.html';
        this.limit = 24;
        this.current_page = 1;
        this.last_page = 0;
        this.total = 0;
        this.from = 0;
        this.to = 0;
        this.data = 0;


        this.$prev = null;
        this.$next = null;
        this.tmpItem = '<div class="as-item col-sm-2 col-xs-2" style="margin-bottom:10px">' +
            '<img src="{0}" class="img-responsive img-thumbnail"/>' +
            '</div>';

        return this;

    };

    CP.StickerModule.prototype.loadTemplate = function(success) {

        var that = this;
        $.get(this.viewPath, function(tmp) {

            var source = $(tmp).html();

            that.$el = $(source);
            that.$elMediaContent = that.$el.find('.asset-media-content');

            that.$prev = that.$el.find('.previous');
            that.$next = that.$el.find('.next');

            success();

        });

    };

    CP.StickerModule.prototype.init = function(success) {
        var that = this;
        this.loadTemplate(function() {
            that.callService(that.render.bind(that));
            success();
        });
    };

    CP.StickerModule.prototype.render = function(res) {

        this.current_page = res.current_page;
        this.last_page = res.last_page;
        this.total = res.total;
        this.from = res.form;
        this.to = res.to;
        this.data = res.data;
        var that = this;

        this.renderPagination();

        that.$elMediaContent.html('');
        $.each(this.data, function(index, val) {
            var tm = that.tmpItem.format(MYLIB.IMAGEHOST + '/' + val.thumb);
            that.$elMediaContent.append(tm)
        });

    };

    CP.StickerModule.prototype.renderPagination = function() {


        if (this.current_page > 1 && this.current_page < this.last_page) {

            this.$prev.removeClass('disable').css({
            	opacity: '1',
            	cursor: 'pointer'
            });
            this.$next.removeClass('disable').css({
            	opacity: '1',
            	cursor: 'pointer'
            });

            this.$prev
                .unbind('click')
                .bind('click', this.prevAction.bind(this));

            this.$next
                .unbind('click')
                .bind('click', this.nextAction.bind(this));
        } else if (this.current_page == this.last_page) {

            this.$prev.removeClass('disable').css({
            	opacity: '1',
            	cursor: 'pointer'
            });
            this.$next.addClass('disable').css({
            	opacity: '0.5',
            	cursor: 'default'
            });

            this.$prev
                .unbind('click')
                .bind('click', this.prevAction.bind(this));
            this.$next
                .unbind('click')

        } else if (this.current_page == 1) {

            this.$prev.addClass('disable').css({
            	opacity: '0.5',
            	cursor: 'default'
            });
            this.$next.removeClass('disable').css({
            	opacity: '1',
            	cursor: 'pointer'
            });

            this.$prev
                .unbind('click')
                

            this.$next
                .unbind('click')
                .bind('click', this.nextAction.bind(this));

        }



    };

    CP.StickerModule.prototype.prevAction = function() {
        //debugger;
        this.current_page--;
        this.callService(this.render.bind(this));
    };

    CP.StickerModule.prototype.nextAction = function() {
        //debugger;
        this.current_page++;
        this.callService(this.render.bind(this));
    };

    CP.StickerModule.prototype.callService = function(success) {

        var ajax = CP.AssetsSerice.getInstance.getAssetMediaByLimit(this.limit, this.current_page);
        MYLIB.LOADING_WITH_EL(this.$elMediaContent);
        ajax.done(function(response) {

            success(response);
            MYLIB.REMOVE_LOADING();

        });

        return this;

    }

    var sticker = new CP.StickerModule();
    sticker.init(function() {
        $('#asset-media').append(sticker.$el)
    })


})(jQuery, window, document)
