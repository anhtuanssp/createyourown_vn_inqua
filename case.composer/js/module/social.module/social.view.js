;(function ($,window,document,undefined){
	
	CP.SocialView = function (){
		this.html = '';
		this.$el = null;
		this.$fb = null;
		this.init = function () {
			this.html = 
			'<div class="socical-wrapper" style="bottom:20%">'+
				'<ul>'+
					'<li  class="facebook">'+
					 	'<a href="{0}"></a>'+
					'</li>'+

				'</ul>'+
			'</div>';
		}
	};
	
	
	CP.SocialView.prototype.render = function (data) {
		if($.isArray(data)){
			this.html = this.html.format(data[0]);
			this.$el = $(this.html);
			this.$fb = this.$el.find('li').eq(0);
			this.style();
		}else{
			throw 'Data render must be array';
		}
	}

	CP.SocialView.prototype.style = function (){
		this.$el.css({
			right: 0,
			top: '-60px',
			display: 'inline-block',
			position : 'absolute'
		});
		this.$el.find('ul').css({
			listStyle: 'none'
		});
		this.$el.find('li').css({
			'padding': '5px',
			'display' : 'inline-block'
		});
	}
	CP.SocialView.prototype.getElement = function () {
		return this.$el;
	}

	CP.SocialView.prototype.bindEvent = function (scopeController) {
	
	}



	MYLIB.mixin(CP.SocialView, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)