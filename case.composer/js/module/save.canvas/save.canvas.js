;(function ($,window,document,undefined){
	
	CP.SaveCanvas = function (){};
	CP.SaveCanvas.prototype.$el = null;
	CP.SaveCanvas.prototype.html = '';

	CP.SaveCanvas.prototype.$btnSave = null;
	CP.SaveCanvas.prototype.$btnDelete = null;

	CP.SaveCanvas.prototype.$btnUp = null;
	CP.SaveCanvas.prototype.$btnDown = null;

	CP.SaveCanvas.prototype.init = function (){

		this.html = '<div class="save-canvas-module panel panel-default">'+
						'<div class="panel-body">'+
							// '<span class="save-canvas btn btn-default btn-tron"><i class="fa fa-save"></i></span>'+
							'<span class="tool-delete btn btn-danger  btn-tron"><i class="fa fa-trash"></i></span>'+
							'<span class="tool-duplicate btn btn-default  btn-tron"><i class="fa fa-copy"></i></span>'+
							'<span class="tool-up-to-front btn btn-default  btn-tron" title="dịch chuyển lên trên"><i class="fa fa-arrow-circle-up"></i></span>'+
							'<span class="tool-down-to-back btn btn-default  btn-tron" title="dịch chuyển xuống dưới"><i class="fa fa-arrow-circle-down"></i></span>'+
						'</div>'+
					'</div>';
		this.$el = $(this.html);
		this.$btnSave = this.$el.find('.save-canvas');
		this.$btnDelete = this.$el.find('.tool-delete');
		this.$btnCopy= this.$el.find('.tool-duplicate');

		this.$btnUp = this.$el.find('.tool-up-to-front');
		this.$btnDown= this.$el.find('.tool-down-to-back');

		this.$el.find('span').css({
			margin: '0 0 0px 0px',

		});

		this.bindEvents();
	}
	CP.SaveCanvas.prototype.getElement = function () {

		return this.$el;

	}
	CP.SaveCanvas.prototype.bindEvents = function () {
		var _this = this;

		this.$btnSave
			.unbind('click touchstart')
			.bind('click touchstart', this, function(event) {
				MYLIB.eventManager.fireEvent(_this,MYLIB.eventNames.saveCanvas,true);
			});

		this.$btnDelete
			.unbind('click touchstart')
			.bind('click', this, this.deleteItemHandle);

		this.$btnCopy
			.unbind('click touchstart')
			.bind('click', this, this.duplicate);

		this.$btnUp
			.unbind('click touchstart')
			.bind('click', function(){
				MYLIB.eventManager.fireEvent(this,'UPTOFRONT',true);
			});

		this.$btnDown
			.unbind('click touchstart')
			.bind('click', function(){
				MYLIB.eventManager.fireEvent(this,'DOWNTOBACK',true);
			});

	}

	//HANDEL EVENT
	CP.SaveCanvas.prototype.deleteItemHandle = function (){
		// console.log('DELETE ITEM');
		// var user = CP.SingletonUser.getInstance();
		// user.setFacebookObj(function(res){console.log(user);},function(res){console.log(res);})
		MYLIB.eventManager.fireEvent(this,MYLIB.eventNames.event_delete_item,'true');
	}

	CP.SaveCanvas.prototype.duplicate = function (){
		// console.log('DUPLICATE ITEM');
		// var user = CP.SingletonUser.getInstance();
		// user.setFacebookObj(function(res){console.log(user);},function(res){console.log(res);})
		MYLIB.eventManager.fireEvent(this,MYLIB.eventNames.event_duplicate_item,'true');
	}

	

	MYLIB.mixin(CP.SaveCanvas, MYLIB.Event.ObserverMixin);
	

})(jQuery,window,document)