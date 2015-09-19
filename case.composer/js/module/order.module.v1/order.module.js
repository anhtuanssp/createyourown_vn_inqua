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