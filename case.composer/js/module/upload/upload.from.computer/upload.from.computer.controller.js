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