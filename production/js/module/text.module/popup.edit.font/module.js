;(function ($,window,document,undefined){
	
	CP.EditFontModule = function (callbackDashboard){
		this.viewPath = 'js/module/text.module/popup.edit.font/view/template.html';

		this.callbackDashboard = callbackDashboard;
	};

	MYLIB.extend(CP.EditFontModule, CP.PopupModule);

	CP.EditFontModule.prototype.$elSelect = null;
	CP.EditFontModule.prototype.$spanThuNghiem = null;
	CP.EditFontModule.prototype.customTextControl = null;

	CP.EditFontModule.prototype.$elSelectV2 = null;

	CP.EditFontModule.prototype.init = function(){

		this.titlePopup = 'Chỉnh sửa font chử';

		this.parent.proto.init.call(this);

		// this.customTextControl = new CP.TextModuleCustom();

		// this.customTextControl.init();

		this.$el.find('.modal-dialog').removeClass('modal-lg');

		this.$el.appendTo('body');

		

		this.render();

	};

	CP.EditFontModule.prototype.getElement = function(){
		return this.$el;
	};
	CP.EditFontModule.prototype.render = function(){
		var that = this;
		$.get(this.viewPath, function(tmp) {

			var source = $(tmp).html();
			var template = Handlebars.compile(source);
			var result = template();
			
			that.$elContent.append($(result));
			// that.$el.find('.font-size-wrapper').append(that.customTextControl.getElement())
			that.initElement.call(that);
			that.bindEvent();
	
		});
	};

	CP.EditFontModule.prototype.initElement = function(){

		this.$elSelect = this.$elContent.find('.font-select');
		this.$spanThuNghiem = this.$elContent.find('.thunghiem');
		this.$elSelectV2 = this.$elContent.find('.font-select-v2');

		this.$elSelect.css({
			width: '100%',
			height: '50px',
			'font-size': '30px',
		});

		this.renderFontSelect(CP_INIT.text.listFont);
	};

	CP.EditFontModule.prototype.renderFontSelect = function (data){
		// var option = '<option value="{0}">{1}</option>';
		var that = this;
		_.each(data, function(value, key, list){
		
			var option = '<option value="{0}">{1}</option>';
			option = option.format(value.font,value.label);

			option = $(option);

			that.$elSelect.append(option)

			var font = 
			'<label style="padding:5px">'+
				'<input type="radio" name="fontvalue" value="{0}"> '+
				'<span style="font-family: {1};font-size:20px">SAMPLE</span> '+
			'</label>';

			font = font.format(value.label,value.font);
			font = $(font);
			$(font).find('input').unbind('click').bind('click',that.changeFontHandlerV2.bind(that));
			that.$elSelectV2.append(font);

		});


	}

	CP.EditFontModule.prototype.bindEvent = function(){
		//SET FONT DEFAULT
		var valSelect = this.$elSelect.val();
		this.$spanThuNghiem.css({
			'font-family' : valSelect
		});

		this.$elSelect.change(this.changeFontHandler.bind(this));

	};

	CP.EditFontModule.prototype.changeFontHandler = function (){
		var valSelect = this.$elSelect.val();
		console.log(valSelect); 
		this.$spanThuNghiem.css({
			'font-family' : valSelect
		});

		//main-canvas will handle
		MYLIB.eventManager.fireEvent(this, MYLIB.eventNames.event_change_font,valSelect);
	}
	CP.EditFontModule.prototype.changeFontHandlerV2 = function(event){
		var valSelect = $(event.target).val();
		this.$spanThuNghiem.css({
			'font-family' : valSelect
		});

		//main-canvas will handle
		MYLIB.eventManager.fireEvent(this, MYLIB.eventNames.event_change_font,valSelect);
	}


	MYLIB.mixin(CP.PopupAssetsModule, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)