;(function ($, window, document, undefined){
	CP.OrdersSerice = function () {};
	CP.OrdersSerice.prototype.param = {
		tenkhachhang : '',
		email : '',
		phone : '',
		orderNote : '', 

		tennguoinhan : '',
		diachinguoinhan : '',
		phone_nguoinhan : '',
		
		bank_account : '',
		bank_name : '',
		noidung_bank : '',

		hinhdein : '',
		hinhminhhoa : '',
		isCase : 1,
		isSkin : 0,
		id_product : 0,
		id_order : 0,
		hang_dat_lai : 0,
		is_sharing : 0,
		list_asset_imgs : '',
		list_facebook_imgs : '',
		phuongthucthanhtoan : '',

		hasBack : 0,
		hinhdein_back : '',
		hinhminhhoa_back : '',

		hasLayerCircle : 0,
		hinhdein_layerBack : '',
		hinhminhhoa_layerBack : '',

		thumb : '',
		soluong : 1,

		is_layerCircle : false,

	};


	CP.OrdersSerice.prototype.create = function () {
		var ajax = $.ajax({
			// url: 'data/products.json',
			url : MYLIB.HOST+MYLIB.SERVICENAME.createOrder,
			type: 'POST',
			contentType : 'application/json',
			dataType: 'json',
			data : JSON.stringify(this.param.data)
		});
		return ajax;
	}
	CP.OrdersSerice.prototype.getTemplateOrder = function () {
		var ajax = $.ajax({
			// url: 'data/products.json',
			url : MYLIB.HOST+MYLIB.SERVICENAME.getSpecificThietkemau,
			type: 'POST',
			contentType : 'application/json',
			dataType: 'json',
			data : JSON.stringify(this.param.data)
		});
		return ajax;
	}

})(jQuery,window,document)