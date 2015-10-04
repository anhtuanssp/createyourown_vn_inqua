;(function ($,window,document,undefined){
	
	CP.OrderStep2Module = function (callback){

		this.$el = null;
		this.$btnBack = null;
		this.$btnSubmit = null;

		this.$howtopay = null;
		this.$tennguoinhan = null;
		this.$phonenguoinhan = null;
		this.$diachigiaohang = null;
		this.$sharing = null;

		this.$banking_z = null;
		this.$banking_account = null;
		this.$banking_name = null;
		this.$banking_nd = null;

		this.viewPath = "js/module/order.module.v1/view/step2.html";

		this.callbackOrderModule = callback;
	};

	CP.OrderStep2Module.prototype.init = function(successHandle){

		var that = this;

		// RENDER LAYOUT
		
		$.get(this.viewPath, function(tmp) {
			var source = $(tmp).html();
			var template = Handlebars.compile(source);
			
			that.$el = $(template());

			that.$btnBack = that.$el.find('.back');

			that.$btnSubmit = that.$el.find('.check-out-submit');

			that.$howtopay = that.$el.find('.how-to-pay');
			that.$tennguoinhan = that.$el.find('.ten-nguoi-nhan');
			that.$phonenguoinhan = that.$el.find('.phone_nguoi_nhan');
			that.$diachigiaohang = that.$el.find('.dia-chi-giao-hang');
			that.$sharing = that.$el.find('.share-member');
			that.$banking_z = that.$el.find('.chuyenkhoan-user');

			that.$banking_account = that.$banking_z.find('.bankingaccount');
			that.$banking_name = that.$banking_z.find('.bankingname');
			that.$banking_nd = that.$banking_z.find('.banking_noidung');

			var optionForAdmin = MYLIB.getParamURL('isAdmin');
			if(optionForAdmin!=undefined && optionForAdmin){

			}else{
				that.$sharing.parent().parent().remove();
			}

			that.bindEvent();
		
			successHandle.call(this);

		});

	};

	CP.OrderStep2Module.prototype.show = function () {
		this.$el.addClass('animated fadeInLeft');
		this.$el.removeClass('hidden');
	}

	CP.OrderStep2Module.prototype.hide = function () {
		this.$el.addClass('hidden');
		this.$el.removeClass('animated fadeInLeft');
	}

	CP.OrderStep2Module.prototype.getElement = function () {
		return this.$el;
	}

	CP.OrderStep2Module.prototype.bindEvent = function () {
		this.$btnBack.bind('click', this.backHandle.bind(this));
		this.$btnSubmit.bind('click', this.submitOrderAndNextToStep3.bind(this));

		this.$howtopay.change(this.changeHowToPay.bind(this));
	}

	//CONTROLLER
	CP.OrderStep2Module.prototype.backHandle = function () {
		this.callbackOrderModule.backHandle.call(this.callbackOrderModule);
	}
	CP.OrderStep2Module.prototype.submitOrderAndNextToStep3 = function () {
		// this.callbackOrderModule.submitOrderAndNextToStep3.call(this.callbackOrderModule);

		if(this.checkValidate()){
			// console.log(this.getValue());
			this.callbackOrderModule.submitOrderAndNextToStep3.call(this.callbackOrderModule);
		}
		
	}

	CP.OrderStep2Module.prototype.checkValidate = function () {
		// console.log('Check Validate');

		
		var dc = this.$diachigiaohang.val();
		var phone = this.$phonenguoinhan.val();
		var name = this.$tennguoinhan.val();

		var isValidateName = false,
			isValidatePhone = false;

		if(! ($.trim(name) != '' ) ){
			this.$tennguoinhan.toggleClass('animated swing');
			this.$tennguoinhan.siblings('.error').html('').html('Xin quý khách vui lòng nhập tên người nhận!')
			isValidateName =  false;
		}else{
			this.$tennguoinhan.siblings('.error').html('');
			isValidateName = true;
		}
		if(!CP.Validate.checkPhone(phone,8,11)){
			this.$phonenguoinhan.toggleClass('animated swing');
			this.$phonenguoinhan.siblings('.error').html('').html('Số điện thoại phải từ 8 -> 11 số. Xin quý khách thông cảm, nhập số điện thoại đúng để dễ cho việc giao hàng!')
			isValidatePhone = false;
		}else{
			isValidatePhone = true;
			this.$phonenguoinhan.siblings('.error').html('');
		}

		if(isValidateName && isValidatePhone){
			return true;
		}

		return false;
	}

	CP.OrderStep2Module.prototype.getValue = function () {

		var data = {
			phuongthucthanhtoan : this.$howtopay.val(),
			tennguoinhan : this.$tennguoinhan.val(),
			phone_nguoinhan : this.$phonenguoinhan.val(),
			diachinguoinhan : this.$diachigiaohang.val(),
			is_sharing : this.$sharing.is(":checked") ? true : false,
			bank_account : this.$banking_account.val(),
			bank_name : this.$banking_name.val(),
			noidung_bank : this.$banking_nd.val(),
			list_asset_imgs : '',
			list_facebook_imgs :''
		}

		return data;
	}

	CP.OrderStep2Module.prototype.changeHowToPay = function () {
		// console.log('How to pay');
		var pp = this.$howtopay.val();
		if(pp === 'Chuyển khoản ngân hàng'){
			this.$banking_z.removeClass('hidden');
			this.$banking_nd.val( this.$tennguoinhan.val() );
		}else{
			this.$banking_z.addClass('hidden');
		}
	}
	MYLIB.mixin(CP.OrderStep2Module, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)