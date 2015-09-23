;(function ($,window,document,undefined){
	
	CP.ToolModelService = function (){
		this.path = 'js/module/tool.module/view/tool.view.html';
		this.data = {
			title : 'Tools'
		}
	};

	
	CP.ToolModelService.prototype.init = function () {
		return true;
	}


	CP.ToolModelService.prototype.getElement = function () {

	}

	CP.ToolModelService.prototype.bindEvent = function () {
		
	}



	MYLIB.mixin(CP.ToolModelService, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)