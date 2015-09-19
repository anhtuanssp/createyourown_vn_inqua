;(function ($,window,document,undefined){
	'use strick'
	CP.UploadFromAssetModule = function (){
		this.html = 
		'<div data-step="7" data-intro="Chọn hình từ thư viện của chúng tôi" class="upload-assets-img" style="margin: 5px 0px 5px 0px;">'+
			'<div class="assets-img-button">'+
				'<button type="button" class="btn btn-default choose-image-from-assets"'+
					' style="width:100%;position:relative;padding:10px">'+
				  '<i class="fa fa-tree fa-2x" aria-hidden="true" '+
				  		'style="position:absolute;left:5px;top:7px;color:#ff00dd"></i> Hình & Pattern'+
				'</button>'+
				'<br/>'+
			'</div>'+
		'</div>';
		this.$el = null;
		this.$btnUpload = null;

		this.assetsApplication = null;
	};


	CP.UploadFromAssetModule.prototype.init = function () {
		this.$el = $(this.html);
		this.$btnUpload = this.$el.find('.choose-image-from-assets');
		this.assetsApplication = new CP.PopupAssetsModule();
		this.bindEvent();
	}

	CP.UploadFromAssetModule.prototype.getElement = function () {
		return this.$el;
	}

	CP.UploadFromAssetModule.prototype.bindEvent = function () {
		this.$btnUpload
			.unbind('click touchstart')
			.bind('click touchstart',this.openPopupAssetsImagesHandler.bind(this));
	}

	//openPopupFacebookImagesHandler
	CP.UploadFromAssetModule.prototype.openPopupAssetsImagesHandler = function (event) {
		console.log('Init Assets Application');
		
		if(this.assetsApplication.firstRender){

			this.assetsApplication.show();

		}else{
			
			this.assetsApplication.init();
			this.assetsApplication.show();
			
		}
			
	} 


	MYLIB.mixin(CP.UploadFromAssetModule, MYLIB.Event.ObserverMixin);
})(jQuery,window,document);