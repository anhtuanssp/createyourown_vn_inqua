
;(function ($, window, document, undefined){
	CP.AssetsSerice = function () {};
	CP.AssetsSerice.prototype.param = null;
	CP.AssetsSerice.prototype.getAssetsCates = function () {
		var ajax = $.ajax({
			// url: 'data/asset_cate.json',
			url : MYLIB.HOST + MYLIB.SERVICENAME.getAssetCates,
			type: 'GET',
			dataType: 'json',
		});
		return ajax;
	}
	CP.AssetsSerice.prototype.getAssetsMediaByCates = function (id) {
		var ajax = $.ajax({
			// url: 'data/asset_cate.json',
			url : MYLIB.HOST + MYLIB.SERVICENAME.getAssetMediaByCate+'/'+id,
			type: 'GET',
			dataType: 'json',
		});
		return ajax;
	}
	CP.AssetsSerice.prototype.getAssetsMediaByIds = function (ids) {
		var ajax = $.ajax({
			// url: 'data/asset_cate.json',
			url : MYLIB.HOST + MYLIB.SERVICENAME.getAssetsMediaByIds,
			type: 'POST',
			data : JSON.stringify({data:ids}),
			contentType : 'application/json',
		});
		return ajax;
	}
	CP.AssetsSerice.prototype.getAssetMediaByLimit = function (limit,page){
		var ajax = $.ajax({
			// url: 'data/asset_cate.json',
			url : MYLIB.HOST + MYLIB.SERVICENAME.getAssetMediaByLimit+'/'+limit+'?page='+page,
			type: 'GET',
			dataType: 'json',
		});
		return ajax;
	}

	CP.AssetsSerice.getInstance = new CP.AssetsSerice();

})(jQuery,window,document)