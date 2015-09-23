;(function ($,window,document,undefined){
	
	CP.ColorModel = function (){
		this.ID_INPUT = 'input-color-picker';
		this.NAME_INPUT = 'input-color-picker';
		this.HEADING = 'Chọn màu sắc';
	};

	
	CP.ColorModel.prototype.init = function () {
		return true;
	}


	CP.ColorModel.prototype.getElement = function () {

	}

	CP.ColorModel.prototype.bindEvent = function () {
		
	}



	MYLIB.mixin(CP.ColorView, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)