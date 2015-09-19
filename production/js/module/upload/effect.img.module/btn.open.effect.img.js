;(function ($,window,document,undefined){
	'use strick'
	CP.EffectImgBtn = function (){
		this.html = 
		'<div class="upload-assets-img" style="margin: 5px 0px 5px 0px;">'+
			'<div class="assets-img-button">'+
				'<button type="button" class="btn btn-default choose-image-from-assets"'+
					' style="width:100%;position:relative;padding:10px">'+
				  '<i class="fa fa-picture-o fa-2x" aria-hidden="true" '+
				  		'style="position:absolute;left:5px;top:7px;color:#c9c9c9"></i> Chỉnh màu'+
				'</button>'+
				'<br/>'+
			'</div>'+
		'</div>';
		this.$el = null;
		this.$btnUpload = null;
	};


	CP.EffectImgBtn.prototype.init = function () {
		this.$el = $(this.html);
		this.$btnUpload = this.$el.find('.choose-image-from-assets');

		this.bindEvent();
	}

	CP.EffectImgBtn.prototype.getElement = function () {
		return this.$el;
	}

	CP.EffectImgBtn.prototype.bindEvent = function () {
		this.$btnUpload
			.unbind('click touchstart')
			.bind('click touchstart',this.openEffectImgsHandle.bind(this));
	}

	//openPopupFacebookImagesHandler
	CP.EffectImgBtn.prototype.openEffectImgsHandle = function (event) {

		MYLIB.eventManager.fireEvent(this, MYLIB.eventNames.event_open_edit_imgs,true);
			
	} 


	MYLIB.mixin(CP.EffectImgBtn, MYLIB.Event.ObserverMixin);
})(jQuery,window,document);