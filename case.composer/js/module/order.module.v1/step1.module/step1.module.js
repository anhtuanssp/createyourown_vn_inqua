;(function ($,window,document,undefined){
	
	CP.OrderStep1Module = function (callback){

		this.$el = null;

		this.$btnNext = null;

		//Control button
		this.$imgSanpham = null;
		this.$imgSanpham_back = null;
		this.$imgSanpham_layerBack = null;
		this.$inputName = null;
		this.$inputEmail = null;
		this.$inputPhone = null;
		this.$inputNote = null;
		this.$inputSoluong = null;
		//end control button

		this.viewPath = "js/module/order.module.v1/view/step1.html";

		this.callbackOrderModule = callback;
	};

	CP.OrderStep1Module.prototype.init = function(successHandle){

		var that = this;

		// RENDER LAYOUT
		
		$.get(this.viewPath, function(tmp) {
			var source = $(tmp).html();
			var template = Handlebars.compile(source);
			
			that.$el = $(template());

			that.$btnNext = that.$el.find('.step1-next');

			that.$imgSanpham = that.$el.find('.hinh-anh-thiet-ke');
			that.$imgSanpham_back = that.$el.find('.hinh-anh-thiet-ke-mat-sau');
			that.$imgSanpham_layerBack = that.$el.find('.hinh-anh-thiet-ke-layer-circle')
			that.$inputName = that.$el.find('.name');
			that.$inputEmail = that.$el.find('.email');
			that.$inputPhone = that.$el.find('.phone');
			that.$inputNote = that.$el.find('.ghi-chu');
			that.$inputSoluong = that.$el.find('.soluong');

			that.bindEvent();
		
			successHandle.call(this);

		});

	};

	CP.OrderStep1Module.prototype.getElement = function () {
		return this.$el;
	}

	CP.OrderStep1Module.prototype.getImgHinhThietke = function (){
		return this.$imgSanpham;
	}
	CP.OrderStep1Module.prototype.getImgHinhThietkeMatsau = function (){
		return this.$imgSanpham_back;
	}

	CP.OrderStep1Module.prototype.bindEvent = function () {
		// console.log(this);
		this.$btnNext
			.bind('click',this.nextStep2Handle.bind(this));
	}
	CP.OrderStep1Module.prototype.show = function () {

		this.$el.addClass('animated fadeInLeft');
		this.$el.removeClass('hidden');
	}

	CP.OrderStep1Module.prototype.hide = function () {
		this.$el.addClass('hidden');
		this.$el.removeClass('animated fadeInLeft');
	}

	//CONTROLER :D
	CP.OrderStep1Module.prototype.nextStep2Handle = function () {
		// console.log('NEXT TO STEP 2 FROM STEP 1');
		if(this.checkValidate()){
			// console.log(this.getValue());
			this.callbackOrderModule.nextToStep2.call(this.callbackOrderModule);
		}
	}
	CP.OrderStep1Module.prototype.checkValidate = function () {
		// console.log('Check Validate');
		var email = this.$inputEmail.val();
		var phone = this.$inputPhone.val();
		var name = this.$inputName.val();

		var isValidateName = false,
		isValidatePhone = false;
		isValidateEmail = false;
		isValidateSoLuong = false;

		var soluong = this.$inputSoluong.val();
		if(! ($.trim(name) != '' ) ){
			this.$inputName.toggleClass('animated swing');
			this.$inputName.siblings('.error').html('').html('Xin quý khách vui lòng nhập tên họ!')
			isValidateName = false;
		}else{
			this.$inputName.siblings('.error').html('');
			isValidateName = true;
		}
		if(!CP.Validate.checkEmail(email)){
			this.$inputEmail.toggleClass('animated swing');
			this.$inputEmail.siblings('.error').html('').html('Email không hợp lệ')
			isValidateEmail = false;
		}else{
			isValidateEmail = true;
			this.$inputEmail.siblings('.error').html('')
		}

		if(!CP.Validate.checkPhone(phone,8,11)){
			this.$inputPhone.toggleClass('animated swing');
			this.$inputPhone.siblings('.error').html('').html('Số điện thoại phải từ 8 -> 11 số. Xin quý khách thông cảm, nhập số điện thoại đúng để dễ cho việc giao hàng!')
			isValidatePhone = false;
		}else{
			this.$inputPhone.siblings('.error').html('');
			isValidatePhone = true;
		}
		if(!CP.Validate.checkNumber(soluong,0,10)){
			this.$inputSoluong.toggleClass('animated swing');
			this.$inputSoluong.siblings('.error').html('').html('Xin lỗi, chúng tôi chỉ cung cấp được số lượng từ 1-10 sản phẩm')
			isValidateSoLuong = false;
		}else{
			this.$inputSoluong.siblings('.error').html('')
			isValidateSoLuong = true;
		}
		if(isValidateEmail && isValidatePhone && isValidateSoLuong){
			return true;
		}
		return false;
	}
	CP.OrderStep1Module.prototype.getValue = function () {
		if(this.callbackOrderModule.orderModule.dashboardCallback.rightModule.mainCanvas.is_layerCircle){
			var data = {
				tenkhachhang  : this.$inputName.val(),
				email : this.$inputEmail.val(),
				phone : this.$inputPhone.val(),
				orderNote : this.$inputNote.val(),
				hinhminhhoa : this.$imgSanpham.attr('src'),
				hinhminhhoa_back : this.$imgSanpham_back.attr('src'),
				
				hinhdein : this.callbackOrderModule.orderModule.dashboardCallback.rightModule.mainCanvas.getImageFrontToPrint(),
				hinhdein_back : this.callbackOrderModule.orderModule.dashboardCallback.rightModule.mainCanvas.getImageBackToPrint(),
				
				hinhdein_layerBack: this.callbackOrderModule.orderModule.dashboardCallback.rightModule.mainCanvas.getImgLayerCircleToPrint(),
				hinhminhhoa_layerBack : this.$imgSanpham_layerBack.attr('src'),

				soluong : this.$inputSoluong.val()
			}
		}else{
			var data = {
				tenkhachhang  : this.$inputName.val(),
				email : this.$inputEmail.val(),
				phone : this.$inputPhone.val(),
				orderNote : this.$inputNote.val(),
				hinhminhhoa : this.$imgSanpham.attr('src'),
				hinhminhhoa_back : this.$imgSanpham_back.attr('src'),
				
				hinhdein : this.callbackOrderModule.orderModule.dashboardCallback.rightModule.mainCanvas.getImageFrontToPrint(),
				hinhdein_back : this.callbackOrderModule.orderModule.dashboardCallback.rightModule.mainCanvas.getImageBackToPrint(),
				
				hinhdein_layerBack:'',
				hinhminhhoa_layerBack : '',

				soluong : this.$inputSoluong.val()
			}
		}

		return data;
	}


	MYLIB.mixin(CP.OrderStep1Module, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)