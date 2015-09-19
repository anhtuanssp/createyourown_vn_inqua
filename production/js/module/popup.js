;(function ($,window,document,undefined){
	
	CP.PopupModule = function (){
		this.html = 
		'<div class="modal" tabindex="-1" role="dialog" aria-hidden="true">'+
		  '<div class="modal-dialog modal-lg" style="width:1000px!important">'+
		    '<div class="modal-content">'+
		    	'<div class="modal-header">'+
        			'<button type="button" class="close" data-dismiss="modal" '+
        					'aria-label="Close"><span aria-hidden="true">&times;</span>'+
        			'</button>'+
			        '<h2 class="modal-title">{0}</h2>'+
			    '</div>'+
		    '</div>'+
		  '</div>'+
		'</div>';

		this.$el = null;
		this.$elContent = null;
		this.titlePopup = 'Modal title';
	};
	CP.PopupModule.prototype.init = function(){
		this.html = this.html.format(this.titlePopup)
		this.$el = $(this.html);
		this.$elContent = this.$el.find('.modal-content');
		this.$elContent.css({
			'min-height': '300px',
		});
	};
	CP.PopupModule.prototype.show = function(){
		
		this.$el.modal('show');

		this.$el.find('.modal-backdrop').height($(window).height()+400);
		
	};
	CP.PopupModule.prototype.hide = function(){
		
		this.$el.modal('hide');
	};

})(jQuery,window,document)