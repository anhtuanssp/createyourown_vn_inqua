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
;(function ($,window,document,undefined){
	'use strick'
	CP.DisplayImgController = function (){
		//VIEW
		this.view = null;
		//model
		this.model = null;
	};


	CP.DisplayImgController.prototype.init = function () {
		this.view = new CP.DisplayImgModuleView();
		this.view.init();

		this.model = new CP.DisplayImgModuleModel();
		this.model.init();

		this.view.render([this.model.CLASS,this.model.ID]);

		this.bindEvent();
	}


	CP.DisplayImgController.prototype.bindEvent = function () {
		MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_display_img,'addDisplayImageUploadHandle');
		this.view.bindEvent(this);
	}

	CP.DisplayImgController.prototype.renderImageHandle = function (event){
		// console.log(';sdsdsd');
		var target = $(event.target);
		// console.log(target);
		if(target.attr('src') === undefined)
			return;
		var src = target.attr('src');
		MYLIB.eventManager.fireEvent(this,MYLIB.eventNames.event_upload_from_computer,src);
		// console.log(target);
	}

	CP.DisplayImgController.prototype.addDisplayImageUploadHandle = function (event) {
		
		var src = event.data;
		this.view.renderItem(src);
	}


	MYLIB.mixin(CP.DisplayImgController, MYLIB.Event.ObserverMixin);
})(jQuery,window,document)
	'use strick'
	CP.DisplayImgModule = function (){
		this.controller = null;
	};


	CP.DisplayImgModule.prototype.init = function () {
		this.controller = new CP.DisplayImgController();
		this.controller.init();
	}

	MYLIB.mixin(CP.DisplayImgModule, MYLIB.Event.ObserverMixin);
;(function ($,window,document,undefined){
	
	CP.DisplayImgModuleModel = function (){
		this.ID = 'display-img-module';
		this.CLASS = 'display-img-module';
		this.data = {}
	};

	
	CP.DisplayImgModuleModel.prototype.init = function () {
		return true;
	}




	MYLIB.mixin(CP.DisplayImgModuleModel, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)
;(function ($,window,document,undefined){
	
	CP.DisplayImgModuleView = function (){
		this.html = '';
		this.$el = null;
		this.$loading = null;
		this.controller = null;

		this.init = function () {
			this.html = 
			'<div style="position:relative" class="table-responsive {0}" id="{1}">'+
				'<table class="table table-bordered">'+
					'<tbody>'+
						'<tr>'+

						'</tr>'+
					'</tbody>'+
				'</table>'+
			'</div>';
			
		}
	};
	CP.DisplayImgModuleView.prototype.style = function(){
		this.$el.css({
			// position: 'absolute',
			// top: '-60px',
			// left : '70px'
		});
	}

	CP.DisplayImgModuleView.prototype.loading = function (){
		var img = '<img src="imgs/theme/loader.gif" />';
		this.$loading = $(img);
		this.$loading.css({
			position: 'absolute',
			top: '0'
		});
		this.$el.append(this.$loading);


	}
	CP.DisplayImgModuleView.prototype.detachLoading = function (){
		this.$loading.remove();

	}
	CP.DisplayImgModuleView.prototype.render = function (data) {
		if($.isArray(data)){

			this.html = this.html.format(data[0],data[1]);
			this.$el = $(this.html);
			this.style();

		}else{
			throw 'Data render must be array';
		}
	}


	CP.DisplayImgModuleView.prototype.renderItem = function (dataImg){
		this.loading();
		var $wrapper = $('<td></td>');
		var $htmlItem = '<img src="{0}"/>';
		$htmlItem = $htmlItem.format(dataImg);
		$htmlItem = $($htmlItem);
		$htmlItem.css({
			'max-width' : '50px',
			cursor : 'pointer'
		});

		$wrapper.append($htmlItem);

		this.$el.find('tr').append($wrapper);

		$wrapper
			.unbind('click touchstart')
			.bind('click touchstart', this.controller.renderImageHandle);

		// this.detachLoading();
		var that = this;
		setTimeout(function(){
			that.detachLoading();
		}, 1000)
	}


	CP.DisplayImgModuleView.prototype.getElement = function () {
		return this.$el;
	}

	CP.DisplayImgModuleView.prototype.bindEvent = function (scopeController) {
		this.controller = scopeController;
		// console.log('Bind Event Display');
	}



	MYLIB.mixin(CP.DisplayImgModuleView, MYLIB.Event.ObserverMixin);


})(jQuery,window,document)
;(function ($,window,document,undefined){
	'use strick'
	CP.TakeSnapshotBtn = function (){
		this.html = 
		'<div class="upload-assets-img" style="margin: 5px 0px 5px 0px;">'+
			'<div class="assets-img-button">'+
				'<button type="button" class="btn btn-default take-snapshot-btn"'+
					' style="width:100%;position:relative;padding:10px">'+
				  '<i class="ion-ios-camera-outline size-48" aria-hidden="true" '+
				  		'style="position:absolute;left:5px;top:-13px;color:#c9c9c9"></i> Say cheese'+
				'</button>'+
				'<br/>'+
			'</div>'+
		'</div>';
		this.$el = null;
		this.$btnSnapshot = null;
	};


	CP.TakeSnapshotBtn.prototype.init = function () {
		this.$el = $(this.html);
		this.$btnSnapshot = this.$el.find('.take-snapshot-btn');

		this.bindEvent();
	}

	CP.TakeSnapshotBtn.prototype.getElement = function () {
		return this.$el;
	}

	CP.TakeSnapshotBtn.prototype.bindEvent = function () {
		this.$btnSnapshot
			.unbind('click touchstart')
			.bind('click touchstart',this.openSnapshotHandle.bind(this));
	}

	//openPopupFacebookImagesHandler
	CP.TakeSnapshotBtn.prototype.openSnapshotHandle = function (event) {

		MYLIB.eventManager.fireEvent(this, MYLIB.eventNames.event_open_snapshot,true);
			
	} 

})(jQuery,window,document);
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
		// console.log('Init Assets Application');
		
		if(this.assetsApplication.firstRender){

			this.assetsApplication.show();

		}else{
			
			this.assetsApplication.init();
			this.assetsApplication.show();
			
		}
			
	} 


	MYLIB.mixin(CP.UploadFromAssetModule, MYLIB.Event.ObserverMixin);
})(jQuery,window,document);
;(function ($,window,document,undefined){
	
	CP.UploadFromComputerController = function (){};
	CP.UploadFromComputerController.prototype.$el = null;
	CP.UploadFromComputerController.prototype.html = 
	'<div data-step="3" data-intro="Chọn hình từ máy tính" class="panel panel-default" id="{0}">'+
		'<div class="panel-heading"><i class="ion-ios-upload size-18"></i> Upload ảnh từ máy tính</div>'+
	'</div>';
	CP.UploadFromComputerController.prototype.ID = 'upload-from-controller-wrapper';

	CP.UploadFromComputerController.prototype.formController = null;

	CP.UploadFromComputerController.prototype.init = function () {
		this.html = this.html.format(this.ID);
		this.$el = $(this.html);

		this.formController = new CP.UploadFromComputer_Form();
		this.formController.init();

		this.renderLayout();
	};

	CP.UploadFromComputerController.prototype.getElement = function (){
		return this.$el
	}

	CP.UploadFromComputerController.prototype.renderLayout = function (){
		this.$el.append(this.formController.getElement());
	}


	MYLIB.mixin(CP.UploadFromComputerController, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)
;(function ($,window,document,undefined){
	
	CP.UploadFromComputer_Form = function (){};
	CP.UploadFromComputer_Form.prototype.$el = null;
	CP.UploadFromComputer_Form.prototype.html = '<div class="panel-body" id="{0}"><input type="file" accept="image/*" name="imageLoader" style="width:163px"/><br/></div>';
	CP.UploadFromComputer_Form.prototype.ID = 'upload-from-controller-form';

	CP.UploadFromComputer_Form.prototype.inputChooseFile = null;

	CP.UploadFromComputer_Form.prototype.init = function () {
		this.html = this.html.format(this.ID);
		this.$el = $(this.html);
		this.inputChooseFile = this.$el.find('input');

		this.bindEvent();
	};

	CP.UploadFromComputer_Form.prototype.getElement = function (){
		return this.$el
	}

	CP.UploadFromComputer_Form.prototype.bindEvent = function () {
		this.inputChooseFile
			.unbind('change')
			.bind('change',this,this.imageFileFromComputerHandle)
	}

	// EVENT
	CP.UploadFromComputer_Form.prototype.imageFileFromComputerHandle = function (event){
		var that = event.data;

		var reader = new FileReader();
		
		reader.onload = function(e){
	       // console.log(e.target.result);
	       MYLIB.eventManager.fireEvent(that,MYLIB.eventNames.event_upload_from_computer,e.target.result);
	    }

	    reader.readAsDataURL(event.target.files[0]);
	}


	MYLIB.mixin(CP.UploadFromComputer_Form, MYLIB.Event.ObserverMixin);

})(jQuery,window,document);
;(function ($,window,document,undefined){
	'use strick'
	CP.UploadFromFacebookModule = function (){
		this.html = 
		'<div data-step="1" data-intro="Chọn hình từ facebook của các bạn" class="upload-facebook-img" style="margin: 5px 0px 5px 0px;">'+
			'<div class="facebook-img-button">'+
				'<button type="button" class="btn btn-default choose-image-from-facebook"'+
					' style="width:100%;position:relative;padding:10px">'+
				  '<i class="fa fa-facebook-square fa-2x" aria-hidden="true" '+
				  		'style="position:absolute;left:5px;top:7px;color:#3a5795"></i> Hình Facebook'+
				'</button>'+
				'<br/>'+
			'</div>'+
		'</div>';
		this.$el = null;
		this.$btnFacebook = null;

		this.facebookApplication = null;
	};


	CP.UploadFromFacebookModule.prototype.init = function () {
		this.$el = $(this.html);
		this.$btnFacebook = this.$el.find('.choose-image-from-facebook');
		this.facebookApplication = new CP.PopupFacebookModule();
		this.bindEvent();
	}

	CP.UploadFromFacebookModule.prototype.getElement = function () {
		return this.$el;
	}

	CP.UploadFromFacebookModule.prototype.bindEvent = function () {
		this.$btnFacebook
			.unbind('click touchstart')
			.bind('click touchstart',this,this.openPopupFacebookImagesHandler);
	}

	//openPopupFacebookImagesHandler
	CP.UploadFromFacebookModule.prototype.openPopupFacebookImagesHandler = function (event) {
		var that = event.data;
		var user = CP.SingletonUser.getInstance();
		var facebookObj = user.getFacebook();

		MYLIB.LOADING();

		user.checkFacebookObj(function(res){

			MYLIB.REMOVE_LOADING(function (){
				that.initFacebookApplication();
			});

		},function(){

			user.loginFacebook(function(){
				
				MYLIB.REMOVE_LOADING(function (){
					that.initFacebookApplication();
				});

			});
			
		},function(){
			// MYLIB.LOADING();
			user.loginFacebook(function(){

				MYLIB.REMOVE_LOADING(function (){
					that.initFacebookApplication();
				});

			});
		});
		
		
	} 

	CP.UploadFromFacebookModule.prototype.initFacebookApplication = function () {
		// console.log('Init Facebook Application');
		
		if(this.facebookApplication.firstRender){

			this.facebookApplication.show();

		}else{
			
			this.facebookApplication.init();
			this.facebookApplication.show();
			
		}
	}

	MYLIB.mixin(CP.UploadFromFacebookModule, MYLIB.Event.ObserverMixin);
})(jQuery,window,document);