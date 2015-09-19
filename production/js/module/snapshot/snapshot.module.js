;(function ($,window,document,undefined){
	
	CP.SnapShotModule = function (callbackDashboard){
		this.viewPath = 'js/module/snapshot/view/template.html';

		this.callbackDashboard = callbackDashboard;

		this.$btnPhoto = null;
		this.$elResult = null;
	};

	MYLIB.extend(CP.SnapShotModule, CP.PopupModule);


	CP.SnapShotModule.prototype.init = function(){

		this.titlePopup = 'Chụp ảnh nào';

		this.parent.proto.init.call(this);

		this.$el.find('.modal-dialog').removeClass('modal-lg');

		this.$el.appendTo('body');

		this.render();
	};

	CP.SnapShotModule.prototype.getElement = function(){
		return this.$el;
	};

	CP.SnapShotModule.prototype.render = function(){
		var that = this;
		$.get(this.viewPath, function(tmp) {

			var source = $(tmp).html();
			var template = Handlebars.compile(source);
			var result = template();
			
			that.$elContent.append($(result));
			that.initElement.call(that);
			that.bindEvent();
	
		});
	};

	CP.SnapShotModule.prototype.initElement = function(){

		this.$btnPhoto = this.$elContent.find('.btn-take-photo');
		this.$elResult = this.$elContent.find('.result')

	};

	CP.SnapShotModule.prototype.show = function(){
		Webcam.reset();
		Webcam.set({
			width: 420,
			height: 340,
			image_format: 'jpeg',
			jpeg_quality: 90
		});
		Webcam.attach( '#webcam-popup' );
		this.$el.modal('show');
	};



	CP.SnapShotModule.prototype.bindEvent = function(){
		MYLIB.click(this.$btnPhoto,this.takeAShotToCanvas.bind(this));
	};

	CP.SnapShotModule.prototype.takeAShotToCanvas = function(){
		var that = this;
		Webcam.snap( function(data_uri) {

			that.$elResult.html('');
			var image = '<img src=" '+data_uri+' " style="width:100%"/>';
			that.$elResult.append(image);
  			MYLIB.eventManager.fireEvent(that,MYLIB.eventNames.event_upload_from_computer,data_uri);
        });
	}

	// CP.EditFontModule.prototype.imageFileFromComputerHandle = function (event){
	
	// 	var that = event.data;

	// 	var reader = new FileReader();
		
	// 	reader.onload = function(e){
	//        // console.log(e.target.result);
	//        MYLIB.eventManager.fireEvent(that,MYLIB.eventNames.event_change_partern,e.target.result);
	//     }

	//     reader.readAsDataURL(event.target.files[0]);
	// }

	MYLIB.mixin(CP.PopupAssetsModule, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)