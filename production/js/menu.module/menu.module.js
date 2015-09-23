;(function ($,window,document,undefined){


	CP.MainmenuService = function (callback,dataMenu){

		this.$el = null;
		this.dataMenu = dataMenu;
		this.viewPath = MYLIB.mainUrl+'js/menu.module/view/template.html';
		this.callbackHanlde = callback;

	};
	CP.MainmenuService.prototype.init = function (success){

		var that = this;
		$.get(this.viewPath, function(tmp) {
			var source = $(tmp).html();
			var template = Handlebars.compile(source);
			that.dataMenu.url = MYLIB.mainUrl;
			that.$el = $(template(that.dataMenu));
			success();

		});
	}


})(jQuery,window,document)

;(function ($,window,document,undefined){


	CP.Mainmenu = function (id){
		this.$el = $(id);
		this.menu = null;
	};

	CP.Mainmenu.prototype.init = function (position){
		this.menu = new CP.MainmenuService(this,position);
		this.menu.init(this.renderMenu.bind(this));
	}

	CP.Mainmenu.prototype.renderMenu = function (){
		this.menu.$el.appendTo(this.$el)
	}


})(jQuery,window,document)

