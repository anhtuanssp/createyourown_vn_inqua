;(function ($,window,document,undefined){
	
	CP.CropImageModule = function (callbackDashboard){
		this.viewPath = 'js/module/crop.image.module/view/template.html';
		this.darkRoom = null;
		this.callbackDashboard = callbackDashboard;
	};

	MYLIB.extend(CP.CropImageModule, CP.PopupModule);

	CP.CropImageModule.prototype.init = function(){

		this.titlePopup = 'CROP HÌNH';

		this.parent.proto.init.call(this);

		this.$el.appendTo('body');

		this.render();

	};

	CP.CropImageModule.prototype.getElement = function(){
		return this.$el;
	};
	CP.CropImageModule.prototype.render = function(){
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

	CP.CropImageModule.prototype.initElement = function(){

	};

	CP.CropImageModule.prototype.bindEvent = function(){

	};


	/**
	 * Overide method show
	 */
	CP.CropImageModule.prototype.show = function (src) {
		this.$el.find('#body-crop-img').html('');

		var img = $('<img src="" id="img-tmp" style="width : 100%"/>');
		img.attr('src', src);

		this.$el.find('#body-crop-img').append(img)
		var that = this;
		this.darkRoom = new Darkroom('#img-tmp',{
			crop: {
		      ratio: 100
		    },
			covertToMainCanvasInqua : function(){
				
				that.callbackDashboard.appleEffectImg.call(that.callbackDashboard,this.snapshotImage() );
				that.hide();
			}
		});


		this.$el.modal('show');
	}
	MYLIB.mixin(CP.PopupAssetsModule, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)