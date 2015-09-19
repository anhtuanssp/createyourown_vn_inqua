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
		console.log('Bind Event Display');
	}



	MYLIB.mixin(CP.DisplayImgModuleView, MYLIB.Event.ObserverMixin);


})(jQuery,window,document)