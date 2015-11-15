;
(function($, window, document, undefined) {

    CP.StickerModuleAssetDesign = function(parentScope) {
        this.tmp = '<div class="col-sm-12 assetmedia-cates-wrapper">' +
            '<div class="row">' +
            '<ul class="row assetmedia-cates-list">' +

            '</ul>' +
            '</div>' +
            '</div>';
        this.$el = null;
        this.ajaxData = CP.AssetsSerice.getInstance.getAssetsCates();
        this.classActive = 'active'

        this.init = function(successCallback) {
            var that = this;
            this.ajaxData.done(function(res) {
                var tmpA = $(that.tmp);
                $.each(res.assets, function(index, val) {
                    var li = $('<li style="display:inline-block;margin:5px;cursor:pointer">' + val.asset_name + '</li>');

                    li.click(function(event) {
                        parentScope.filterByCate.call(parentScope, val,$(this))
                    });

                    tmpA.find('ul').append(li);
                });
                var liAll = $('<li class="'+that.classActive+'" style="display:inline-block;margin:5px;cursor:pointer">' + 'Tất cả' + '</li>');
                tmpA.find('ul').append(liAll);
                liAll.click(function(event) {
                    parentScope.filterByCate.call(parentScope, {asset_id : 'all'},$(this))
                });
                that.$el = tmpA;
                successCallback();
            })
        }
    }

    CP.StickerModule = function() {

        this.$el = null;
        this.$elMediaContent = null;
        this.$elBtnChonsanpham = null;
        this.$elTmpAS = null;
        this.viewPath = MYLIB.mainUrl + 'js/module/popup.module/popup.module.asset.v2/view/template.html';
        this.limit = 24;
        this.current_page = 1;
        this.last_page = 0;
        this.total = 0;
        this.from = 0;
        this.to = 0;
        this.data = 0;

        this.cateID = 'all';

        this.assetCateModule = new CP.StickerModuleAssetDesign(this);
        this.assetCateModule.init(this.renderAssetCate.bind(this));

        this.listAssetMediaChoice = [];

        this.$prev = null;
        this.$next = null;
        this.tmpItem = '<div class="as-item col-sm-2 col-xs-2" style="margin-bottom:20px;cursor:pointer;min-height:150px;max-height:150px">' +
            '<img src="{0}" class="img-responsive img-thumbnail"/>' +
            '</div>';

        return this;

    };

    CP.StickerModule.prototype.renderAssetCate = function() {
        this.$el.find('#asc').append(this.assetCateModule.$el);
    }
    CP.StickerModule.prototype.filterByCate = function(data,li) {
        this.current_page = 1;
        this.assetCateModule.$el.find('li').removeClass(this.assetCateModule.classActive);
        li.addClass(this.assetCateModule.classActive)
        this.cateID = data.asset_id;
        this.callService(this.render.bind(this));

    }


    CP.StickerModule.prototype.loadTemplate = function(success) {

        var that = this;
        $.get(this.viewPath, function(tmp) {

            var source = $(tmp).html();

            that.$el = $(source);
            that.$elMediaContent = that.$el.find('.asset-media-content');

            that.$prev = that.$el.find('.previous');
            that.$next = that.$el.find('.next');

            that.$elBtnChonsanpham = that.$el.find('.btn-chon-sanpham');
            that.$elBtnChonsanpham.bind('click', function(event) {
                that.popupProduct.show();
            });

            that.$elTmpAS = that.$el.find('.tmp-asset-media');

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
            var tm = $(that.tmpItem.format(MYLIB.IMAGEHOST + '/' + val.thumb));
            tm.bind('click', val, function(event) {
                /* Act on the event */
                if (that.listAssetMediaChoice.length < 5) {
                    that.choiceItem(event.data);
                }

                if (that.listAssetMediaChoice.length == 0) {
                    that.$elBtnChonsanpham.hide();
                } else {
                    that.$elBtnChonsanpham.show();
                }

            });
            that.$elMediaContent.append(tm);

        });
        

    };

    CP.StickerModule.prototype.choiceItem = function(data) {
        if (this.listAssetMediaChoice.length < 5) {
            this.listAssetMediaChoice.push(data);
            // console.table(this.listAssetMediaChoice)
            var tmp = '<div class="col-sm-2" style="cursor:pointer;text-align:center"><i class="fa fa-close"></i><img class="thumbnail img-responsive" src="{0}"/></div>';
            tmp = $(tmp.format(MYLIB.IMAGEHOST + '/' + data.thumb));
            var that = this;
            tmp.bind('click', data, function(event) {
                tmp.remove();
                $.each(that.listAssetMediaChoice, function(index, val) {
                    if (val.id == data.id) {
                        that.listAssetMediaChoice.splice(index, 1);
                        // console.table(that.listAssetMediaChoice);
                        return false;
                    }
                });

                if (that.listAssetMediaChoice.length == 0) {
                    that.$elBtnChonsanpham.hide();
                }
            });
            this.$elTmpAS.append(tmp)
        }
    }

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
        } else if (this.current_page == 1 && this.last_page == 1) {

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

        var ajax = CP.AssetsSerice.getInstance.getAssetMediaByLimit(this.limit, this.current_page, this.cateID);
        MYLIB.LOADING_WITH_EL(this.$elMediaContent);
        ajax.done(function(response) {

            success(response);
            MYLIB.REMOVE_LOADING();

        });

        return this;

    }

    // //IMPLEMENT
    // var sticker = new CP.StickerModule();
    // sticker.init(function() {
    //     $('#asset-media').append(sticker.$el)
    // })


})(jQuery, window, document)
