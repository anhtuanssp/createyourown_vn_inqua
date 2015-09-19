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