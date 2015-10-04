;(function ($,window,document,undefined){
	
	CP.OrderController = function (opts,callbackF){

		this.checkOutStep1 = null;
		this.checkOutStep2 = null;
		this.checkOutStep3 = null;

		this._page = [];

		this.isLogin = opts.islogin;

		this.$el = null;
		this.$step1Wrapper = null;
		this.$step2Wrapper = null;
		this.$step3Wrapper = null;

		//SERVICE
		this.orderService = new CP.OrdersSerice();

		this.orderModule = callbackF;

		this.orderThumb = null;

		this.viewPath = "js/module/order.module.v1/view/template.html"
	};

	CP.OrderController.prototype.init = function(successHandle){

		var that = this;

		this.checkOutStep1 = new CP.OrderStep1Module(this);
		this.checkOutStep2 = new CP.OrderStep2Module(this);
		this.checkOutStep3 = new CP.OrderStep3Module(this);

		// RENDER LAYOUT
		
		$.get(this.viewPath, function(tmp) {
			var source = $(tmp).html();
			var template = Handlebars.compile(source);
			
			that.$el = $(template());

			that.$step1Wrapper = that.$el.find('.step1');
			that.$step2Wrapper = that.$el.find('.step2');
			that.$step3Wrapper = that.$el.find('.step3');

			that.checkOutStep1.init(that.renderStep1Success.bind(that));
		
			successHandle.call(this);

		});

	};

	CP.OrderController.prototype.renderStep1Success = function () {
		// console.log('RENDER STEP 1 SUCCESS');
		//FIRE EVENT TO NOTIFY RENDER SUCCESS TO RENDER IMG
		this.renderHinhThietKe();
		this.$step1Wrapper.append(this.checkOutStep1.getElement());
		this._page.push(this.checkOutStep1)
	}
	CP.OrderController.prototype.renderStep2Success = function () {
		// console.log('RENDER STEP 2 SUCCESS');
		
		this.checkOutStep2.$tennguoinhan.val( this.checkOutStep1.$inputName.val() )
		this.checkOutStep2.$phonenguoinhan.val( this.checkOutStep1.$inputPhone.val() )

		this.$step2Wrapper.append(this.checkOutStep2.getElement());
		this._page.push(this.checkOutStep2);
		this.showCurrentPage();
	}
	CP.OrderController.prototype.renderStep3Success = function () {
		// console.log('RENDER STEP 3 SUCCESS');
		this.$step3Wrapper.append(this.checkOutStep3.getElement());
		this._page.push(this.checkOutStep3);
		this.showCurrentPage();

		this.orderModule.firstRender = false;
	}

	CP.OrderController.prototype.getElement = function () {
		return this.$el;
	}

	CP.OrderController.prototype.showCurrentPage = function () {
		_.each(this._page, function(value, key, list){
		
			value.hide();
		
		});

		this._page[this._page.length - 1].show();
	}
	CP.OrderController.prototype.goBack = function () {
		_.each(this._page, function(value, key, list){
		
			value.hide();
		
		});
		this._page.pop();
		this._page[this._page.length - 1].show();
	}

	// CONTROLLER
	CP.OrderController.prototype.nextToStep2 = function () {
		// console.log('NEXT TO STEP 2 FROM STEP MODULE');
		this.checkOutStep2.init(this.renderStep2Success.bind(this));
	}

	CP.OrderController.prototype.backHandle = function (){
		// console.log('BACK');
		this.goBack();
	}

	CP.OrderController.prototype.renderHinhThietKe = function () {
		// console.log('RENDER HINH THIET KE');
		this.fireEvent('RENDER_HINH_THIET_KE',true);
	}

	CP.OrderController.prototype.submitOrderAndNextToStep3 = function (){
		// console.log('NEXT TO STEP 3 FROM STEP MODULE');
		this.checkOutStep3.init(this.renderStep3Success.bind(this));
	}


	// IMPORTANT
	CP.OrderController.prototype.orderNow = function () {
		// console.log('ORDERNOW');

		// this.orderService.
		var dataModule1 = this.checkOutStep1.getValue();
		var dataModule2 = this.checkOutStep2.getValue();

		var data = $.extend(dataModule1, dataModule2);
		data.id_product = this.orderModule.dashboardCallback.rightModule.mainCanvas.getIdProduct();
		data.hasBack = this.orderModule.dashboardCallback.rightModule.mainCanvas.hasBack;
		data.hasLayerCircle = this.orderModule.dashboardCallback.rightModule.mainCanvas.hasLayerCircle;
		data.is_layerCircle =  this.orderModule.dashboardCallback.rightModule.mainCanvas.is_layerCircle;
		data.thumb  = '';

		if(data.is_sharing){
			data.user_json = JSON.stringify(this.orderModule.dashboardCallback.rightModule.mainCanvas.getItemFromCanvas());
		}

		// console.log(data);
		this.orderService.param.data = data;

		var ajax = this.orderService.create();
		var that = this;
		ajax.done(function (data){
			
			that.orderThumb = data.thumb;
			that.checkOutStep3.updateStatus(data.status)
		})
	}

	CP.OrderController.prototype.shareFacebook = function (){
		var msg = "So awsome, very cool. Create now!";
		var url = document.URL;
		var fb = new CP.FacebookService();
		var that = this;
		fb.checkLogin(function (){
			//success
			fb.shareAMessage(url,MYLIB.IMAGEHOST+that.orderThumb );

		},function (){
			//Chưa có quyền
			fb.loginFacebook(function (){
				 fb.shareAMessage(url,MYLIB.IMAGEHOST+that.orderThumb );

			})
		},function () {
			//chưa đăng nhập
			fb.loginFacebook(function (){
				fb.shareAMessage(url,MYLIB.IMAGEHOST+that.orderThumb );

			})
		});
	}


	MYLIB.mixin(CP.OrderController, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)
;(function ($,window,document,undefined){
	
	CP.OrderModule = function (callback){

		this.isLogin = false;

		this.$content = null;

		this.orderController = null;

		this.dashboardCallback = callback;

	};

	MYLIB.extend(CP.OrderModule, CP.PopupModule);

	CP.OrderModule.prototype.firstRender = false;

	CP.OrderModule.prototype.init = function(){

		this.titlePopup = '<i class="fa fa-credit-card fa"></i> THANH TOÁN VÀ GỬI ĐƠN HÀNG';

		this.parent.proto.init.call(this);

		this.$el.appendTo('body');

		this.$content = this.$el.find('.modal-content');

		this.firstRender = true;

		this.isLogin = this.checkIsLogin();

		this.orderController = new CP.OrderController({ islogin : this.isLogin },this);
		this.orderController.init(this.renderViewOrderSuccess.bind(this));

		this.$el.on('hide.bs.modal',this.hide.bind(this))

	};

	CP.OrderModule.prototype.renderViewOrderSuccess = function () {
		this.orderController.addListener('RENDER_HINH_THIET_KE',this,'renderImgHinhSanPhamHanlde');
		this.$content.append(this.orderController.getElement())
	}

	CP.OrderModule.prototype.getElement = function() {
		return this.$el;
	};

	CP.OrderModule.prototype.checkIsRender = function() {
		return this.$el;
	};

	CP.OrderModule.prototype.checkIsLogin = function() {
		return false;
	};

	//OVERIDE SHOW METHOD 
	CP.OrderModule.prototype.show = function() {
		this.$el.modal('show');
		this.$el.find('.modal-backdrop').height($(window).height()+1200);
	};

	CP.OrderModule.prototype.checkRenderImageThietKe = function (){
		this.orderController.fireEvent('RENDER_HINH_THIET_KE',true);
	}

	CP.OrderModule.prototype.renderImgHinhSanPhamHanlde = function () {
		var urlSrc = this.dashboardCallback.rightModule.mainCanvas.saveCanvasToImg();
		/**
		 * Check có mặt sau không
		 */
		if(this.dashboardCallback.rightModule.mainCanvas.hasBack){
			var urlSrcBack = this.dashboardCallback.rightModule.mainCanvas.saveCanvasBackToImg();
			var $imgBack = this.orderController.checkOutStep1.getImgHinhThietkeMatsau();
			$imgBack.attr('src', urlSrcBack);
		}
		/**
		 * Check có layer circle ko
		 */
		if(this.dashboardCallback.rightModule.mainCanvas.hasLayerCircle){
			var urlSrcLC = this.dashboardCallback.rightModule.mainCanvas.saveLayerCircleCanvasToImg();
			var $imgLC = this.orderController.checkOutStep1.$imgSanpham_layerBack;
			$imgLC.attr('src', urlSrcLC);
		}

		var $img = this.orderController.checkOutStep1.getImgHinhThietke();
		$img.attr('src', urlSrc);
	}

	CP.OrderModule.prototype.getSVG = function () {
		var svg = this.dashboardCallback.rightModule.mainCanvas.saveCanvasToSVG();
		return svg;
	}

	CP.OrderModule.prototype.destroy = function() {
		this.$el.remove();
	};

	CP.OrderModule.prototype.hide = function(){
		this.destroy();
		if(this.orderController.checkOutStep3.isFinalStep){
			this.$el.modal('hide');
			$(window).unbind("beforeunload")
			location.reload();
		}

	};


	MYLIB.mixin(CP.OrderModule, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)
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