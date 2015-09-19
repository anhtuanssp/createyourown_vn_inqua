;(function ($,window,document,undefined){


	CP.Danhmucsanpham = function (id){
		this.$el = $(id);

		this.blockIphoneCase = null;
		this.blockIphoneSkin = null;
		this.blockLysu = null;

	};
	CP.Danhmucsanpham.prototype.init = function (){
		this.blockIphoneCase = new CP.BlockIphoneCase(this,'DESIGN CASE CHO IPHONE');
		this.blockIphoneSkin = new CP.BlockIphoneSkin(this,'TẠO SKIN CHO IPHONE');
		this.blockLysu = new CP.BlockLysuModule(this,'GỬI YÊU THƯƠNG VỚI LY SỨ')
		this.blockIphoneCase.init(this.renderCasePhoneDm.bind(this));
		this.blockIphoneSkin.init(this.renderSkinPhoneDm.bind(this));
		this.blockLysu.init(this.renderLysuDm.bind(this));
	}
	CP.Danhmucsanpham.prototype.renderCasePhoneDm = function (){
		// this.blockIphoneCase.init(this.renderCasePhoneDm.bind(this));
		this.$el.append(this.blockIphoneCase.$el)
	}
	CP.Danhmucsanpham.prototype.renderSkinPhoneDm = function (){
		// this.blockIphoneCase.init(this.renderCasePhoneDm.bind(this));
		this.$el.append(this.blockIphoneSkin.$el)
	}
	CP.Danhmucsanpham.prototype.renderLysuDm = function (){
		// this.blockIphoneCase.init(this.renderCasePhoneDm.bind(this));
		this.$el.append(this.blockLysu.$el)
	}

})(jQuery,window,document)