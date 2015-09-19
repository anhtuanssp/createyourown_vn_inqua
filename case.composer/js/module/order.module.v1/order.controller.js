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