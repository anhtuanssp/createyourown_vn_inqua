var HOME = (function($) {
    'use strict';
    var demoPP = null;

    var HOME = {

        init: function() {
            this.initSlider();

            demoPP = new popupAnimator('card').bindEvent();

            this.feedbackHandler();

            this.waypointHandler();
        },

        initSlider: function() {
            $('.banner-started .banner-slide').bxSlider({
				controls : false,
				pager : false,
				auto : true,
			    autoStart : true,
			    minSlides: 1,
			    maxSlides: 1,
			    slideMargin: 10
            });
        },

        feedbackHandler: function() {


            $('#feedback').click(function(event) {
                demoPP.animationCard();
            });

            $('#form-feedback').submit(function(event) {
                /* Act on the event */
                event.preventDefault();

                var email = $(this).find('input[name=email]').val();
                var content = $.trim($(this).find('textarea[name=content]').val());
                if (!CP.Validate.checkEmail(email)) {
                    alert('Email bạn nhập chưa đúng!');
                    return;
                }
                if (content == '') {
                    alert('Bạn phải nhập nội dung trước khi gửi, không được nhiều hơn 500 ký tự');
                    return;
                };

                var formdata = {
                    email: email,
                    content: content
                }

                var ajaxResult = new CP.FeedbackService()
                    .setParam(formdata)
                    .sendFeedback();

                MYLIB.LOADING_LITTLE(
                    $('#form-feedback'),
                    'Đang gửi feedback, vui lòng đợi trong giây lát..');

                ajaxResult.done(function(res) {
                    alert('Gửi thành công!');
                    MYLIB.REMOVE_LOADING_LITTLE($('#form-feedback'));
                    demoPP.hide();
                });
                ajaxResult.fail(function(res) {
                    alert('Có lỗi xảy ra, mong bạn thông cảm và gửi lại sau!');
                    MYLIB.REMOVE_LOADING_LITTLE($('#form-feedback'));
                    demoPP.show();
                })


            });
        },

        waypointHandler: function() {
            var waypointAssetImg = $('#asset-media').waypoint({
                    handler: function(direction) {
                        $.notify({
                                title: "<strong>Hướng dẫn:</strong> ",
                                message: "Click vào hình bạn muốn in, sau đó chọn sản phẩm",
                            }, {

                                // settings
                                element: '#asset-media',
                                position: null,
                                type: "info",
                                allow_dismiss: true,
                                newest_on_top: false,
                                showProgressbar: false,
                                placement: {
                                    from: "top",
                                    align: "right"
                                }
                            }
                        );
                },

            });


    }
};

return HOME;
}(jQuery));

HOME.init();
