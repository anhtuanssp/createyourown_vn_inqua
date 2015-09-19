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