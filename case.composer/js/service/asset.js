
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

})(jQuery,window,document)