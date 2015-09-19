;(function ($,window,document,undefined){
	
	CP.ShaperModelSerive = function (){
		this.path = 'js/module/shape.module/view/template.html';
		this.data = {
			title : 'Chọn hình shape',
			circle : {
				title : 'Hình tròn',
				class : 'circle-shape'
			},
			rect  : {
				title : 'Hình vuông',
				class : 'rect-shape'
			}
		}
	};

	
	CP.ShaperModelSerive.prototype.init = function () {
		return true;
	}


	CP.ShaperModelSerive.prototype.getElement = function () {

	}

	CP.ShaperModelSerive.prototype.bindEvent = function () {
		
	}



	MYLIB.mixin(CP.ShaperModelSerive, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)