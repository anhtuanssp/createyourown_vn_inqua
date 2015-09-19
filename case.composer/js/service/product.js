;(function ($, window, document, undefined){
	CP.productSerice = function () {};
	CP.productSerice.prototype.param = null;
	CP.productSerice.prototype.getProducts = function (limit) {
		var ajax = $.ajax({
			// url: 'data/products.json',
			url : MYLIB.HOST+MYLIB.SERVICENAME.getAllProductAllHome+'/'+limit,
			type: 'GET',
			contentType : 'application/json',
			dataType: 'json'
		});
		return ajax;
	}
	CP.productSerice.prototype.getSpecificProducts = function (argId){
		var ajax = $.ajax({
			url : MYLIB.HOST+MYLIB.SERVICENAME.getSpecificProducts,
			type: 'POST',
			contentType : 'application/json',
			dataType: 'json',
			data : JSON.stringify(argId)
		});
		return ajax;
	}
	CP.productSerice.prototype.getCatesByID = function (id) {
		var ajax = $.ajax({
			url : MYLIB.HOST+MYLIB.SERVICENAME.getDanhMuc+'/'+id,
			type: 'GET',
			contentType : 'application/json',
			dataType: 'json'
		});
		return ajax;
	}
	CP.productSerice.prototype.getProductByCate = function (id,limit) {
		var ajax = $.ajax({
			url : MYLIB.HOST+MYLIB.SERVICENAME.getProductByCate+'?cate='+id+'&'+limit+'='+limit,
			type: 'GET',
			contentType : 'application/json',
			dataType: 'json'
		});
		return ajax;
	}	
	CP.productSerice.prototype.getCate = function (id) {
		var ajax = $.ajax({
			url : MYLIB.HOST+MYLIB.SERVICENAME.getCate+'/'+id,
			type: 'GET',
			contentType : 'application/json',
			dataType: 'json'
		});
		return ajax;
	}

})(jQuery,window,document)