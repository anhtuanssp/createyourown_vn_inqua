;(function ($,window,document,undefined){
	
	CP.PopupFacebookPhotosItemType = function (){
		this.$el = null;
		this.html = '<div class="list-photos-album-item-popup-type"></div>';
		this.data = null;
		this.$btnClose = null;
	};

	CP.PopupFacebookPhotosItemType.prototype.init = function(data){
		this.data = data;
		this.$el = $(this.html);
		var that = this;
		_.each(data, function(value, key, list){
			var $item = '<div style="cursor:pointer">'+
							'<span data-type="{0}" class="" data-img="{1}">{2}</span>'+
						'</div>';
			$item = $item.format(value.width,value.source,value.width+' x '+value.height);
			$item = $($item);
			$item
				.unbind('click touchstart')
				.bind('click touchstart',that.renderImageToCanvasHandle.bind(that));
			that.$el.append($item);
		});
		this.$btnClose = $('<div><i class="fa fa-caret-down fa-2x" style="color:#000"></i></div>');

		that.$el.append(this.$btnClose);
		this.style();

		this.$btnClose.unbind('click touchstart').bind('click touchstart', this, function(event) {
			that.hide();
			event.stopPropagation();
		});
	};

	CP.PopupFacebookPhotosItemType.prototype.show = function () {
		this.$el.removeClass('no-show');
	}
	CP.PopupFacebookPhotosItemType.prototype.hide = function () {
		this.$el.addClass('no-show');
	}

	CP.PopupFacebookPhotosItemType.prototype.getElement = function(){
		return this.$el;
	};

	CP.PopupFacebookPhotosItemType.prototype.style = function(){
		this.$el
			.css({
				padding: '16px',
				position: 'absolute',
				background: 'rgb(201, 201, 201)',
				'z-index': '99',
				top: '0',
				width: '100%',
				opacity:' 0.9',
				'font-weight': '800',
				'box-shadow': '0 2px 5px 0 rgba(0, 0, 0, 0.26)'
			});
		this.$el.find('span').css({
			padding: '5px',
			display: 'inline-block',
		});
		this.$btnClose.css({
			position: 'absolute',
			top: '0',
			right: '0',
			cursor : 'pointer',
			padding : '5px',
			'z-index': '99',
		});
	};

	CP.PopupFacebookPhotosItemType.prototype.renderImageToCanvasHandle = function (event){
		var target = $(event.target);
		// console.log(target);
		var source = target.data('img');
		var that = this;
		MYLIB.LOADING();
		MYLIB.convertImgToBase64(source,function (basce64){
			MYLIB.REMOVE_LOADING();
			MYLIB.eventManager.fireEvent(that,MYLIB.eventNames.event_upload_from_computer,basce64);

		} );
		
	}

	MYLIB.mixin(CP.PopupFacebookPhotosItemType, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)

;(function ($,window,document,undefined){
	
	CP.PopupFacebookPhotosItem = function (){
		this.$el = null;
		this.html = '<div class="list-photos-album-item-wrapper"></div>';
		this.data = null;
		this.typePhoto = null;
	};

	CP.PopupFacebookPhotosItem.prototype.init = function(data){
		this.data = data;
		this.$el = $(this.html);
		this.typePhoto = new CP.PopupFacebookPhotosItemType();

		var that = this;

		var img = _.min(data.images, function(v){
			
			return v.width;
		});

		var el = '<img src="{0}" class="thumbnail"/>';
		el = el.format(img.source);
		that.$el.append(el);

		this.typePhoto.init(data.images);
		this.$el.append(this.typePhoto.getElement());
		this.typePhoto.hide();

		this.bindEvent();

	};

	CP.PopupFacebookPhotosItem.prototype.show = function () {
		this.$el.removeClass('no-show');
	}
	CP.PopupFacebookPhotosItem.prototype.hide = function () {
		this.$el.addClass('no-show');
	}

	CP.PopupFacebookPhotosItem.prototype.getElement = function(){
		return this.$el;
	};

	CP.PopupFacebookPhotosItem.prototype.bindEvent = function(){
		// return this.$el;
		this.$el.unbind('click touchstart')
				.bind('click touchstart',this.openTypePhotosHandle.bind(this));
	};
	CP.PopupFacebookPhotosItem.prototype.openTypePhotosHandle = function (event){
		this.typePhoto.show();
	}

})(jQuery,window,document)