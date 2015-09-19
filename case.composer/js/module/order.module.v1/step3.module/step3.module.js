;(function ($,window,document,undefined){
	
	CP.OrderStep3Module = function (callback){

		this.$el = null;
		this.viewPath = "js/module/order.module.v1/view/step3.html";

		this.$elStatus = null;
		this.$elStatusMessage = null;
		this.$elloading = null;

		this.$shareFacebook = null;

		this.isFinalStep = false;

		this.callbackOrderController = callback;
	};

	CP.OrderStep3Module.prototype.init = function(successHandle){

		var that = this;

		// RENDER LAYOUT
		
		$.get(this.viewPath, function(tmp) {
			var source = $(tmp).html();
			var template = Handlebars.compile(source);
			
			that.$el = $(template());

			that.$elStatus = that.$el.find('.status-order');
			that.$elStatusMessage = that.$el.find('.status-order-msg');
			that.$elloading = that.$el.find('.loading');

			that.$shareFacebook = that.$el.find('.share-fb')

			that.orderNow.call(that);

			that.bindEvent();

			that.isFinalStep = true;
		
			successHandle.call(this);

		});

	};

	CP.OrderStep3Module.prototype.show = function () {
		this.$el.addClass('animated fadeInLeft');
		this.$el.removeClass('hidden');
	}

	CP.OrderStep3Module.prototype.hide = function () {
		this.$el.addClass('hidden');
		this.$el.removeClass('animated fadeInLeft');
	}

	CP.OrderStep3Module.prototype.getElement = function () {
		return this.$el;
	}

	CP.OrderStep3Module.prototype.bindEvent = function () {
		var that = this;
		this.$shareFacebook.bind('click', function(event) {
			/* Act on the event */
			that.callbackOrderController.shareFacebook.call(that.callbackOrderController);
		});
	}

	//CONTROLLER
	CP.OrderStep3Module.prototype.backHandle = function () {
		// this.callbackOrderModule.backHandle.call(this.callbackOrderModule);
	}

	CP.OrderStep3Module.prototype.orderNow = function () {

		this.callbackOrderController.orderNow.call(this.callbackOrderController);

	}

	CP.OrderStep3Module.prototype.updateStatus = function (status) {
		this.$elloading.hide();
		if(status == 'fail'){
			this.$elStatus.text('Có lỗi xãy ra trong quá trình xử lý đơn hàng...');
			this.$elStatusMessage.text('Có lỗi xãy ra trong quá trình xử lý đơn hàng, vui lòng tắt popup và thử lại');	
		}else if(status == 'success'){
			this.$elStatus.text('Đặt hàng thành công');
			this.$elStatusMessage.text('Cảm ơn bạn đã lựa chọn chúng tôi, đơn hàng của bạn đã được xử lý, chúng tôi sẽ liên hệ với bạn trong thời gian ngắn nhất để giao hàng!');	
		}
	

	}



	MYLIB.mixin(CP.OrderStep3Module, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)