;(function ($,window,document,undefined){
	
	CP.ControlModelSerive = function (){
		this.path = 'js/module/module.control/view/template.html';
		this.data = {
			title : 'Chỉnh sửa',
			zoom : {
				title : 'Zom',
				class : 'zoom-control'
			},
			rotate  : {
				title : 'Rotate',
				class : 'rotate-control'
			},
		}
	};

	
	CP.ControlModelSerive.prototype.init = function () {
		return true;
	}


	CP.ControlModelSerive.prototype.getElement = function () {

	}

	CP.ControlModelSerive.prototype.bindEvent = function () {
		
	}



	MYLIB.mixin(CP.ControlModelSerive, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)