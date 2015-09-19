;(function ($,window,document,undefined){
	
	CP.RightZone = function (){

		var _this = this;
		var html = '<div id="{0}" class="{1}"></div>';

		this.$el = null;
		this.topModule = null;
		this.mainCanvas = null;
		this.toolModule = null;
		this.colorHorizontalModule = null;


		this.init = function () {
			// console.log('RIGHT INIT');
			html = html.format(MYLIB.constant.right_id,MYLIB.constant.right_class);
			this.$el = $(html);

			this.renderLayout();
		}

		this.getElement = function () {
			return this.$el;
		}

	};

	// CP.RightZone.prototype. = null;

	CP.RightZone.prototype.renderLayout = function () {
		var that = this;
		// console.log('RENDER LAYOUT RIGHT ZONE');
		this.topModule = new CP.TopModule();
		this.topModule.init();
		this.$el.append(this.topModule.getElement());

		this.mainCanvas = new CP.MainCanvas();
		this.mainCanvas.init();
		this.$el.append(this.mainCanvas.getElement());

		this.toolModule = new CP.ToolsModule();

		this.colorHorizontalModule = new CP.ColorModuleHorizontal();
		this.colorHorizontalModule.init(function(){
			that.$el.append(that.colorHorizontalModule.$el);
		})

	}

	CP.RightZone.prototype.renderCanvas = function () {
		this.mainCanvas.renderLayout();

		var that = this;
		this.toolModule.init(this,function (){
			that.$el.append(that.toolModule.controller.view.getElement());
		});

	}

	CP.RightZone.prototype.getMainCanvas = function (){
		return this.mainCanvas;
	}



})(jQuery,window,document)