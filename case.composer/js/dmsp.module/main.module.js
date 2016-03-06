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
		
		
		this.blockLysu.init(this.renderLysuDm.bind(this,function(){

				this.blockIphoneSkin.init(this.renderSkinPhoneDm.bind(this,function(){

					this.blockIphoneCase.init(this.renderCasePhoneDm.bind(this));

				}))

			}) 
		);
	}
	CP.Danhmucsanpham.prototype.renderCasePhoneDm = function (success){
		// this.blockIphoneCase.init(this.renderCasePhoneDm.bind(this));
		this.$el.append(this.blockIphoneCase.$el);
		if(success != undefined && typeof success == 'function'){
			success.call(this);
		}
	}
	CP.Danhmucsanpham.prototype.renderSkinPhoneDm = function (success){
		// this.blockIphoneCase.init(this.renderCasePhoneDm.bind(this));
		this.$el.append(this.blockIphoneSkin.$el);
		if(success != undefined && typeof success == 'function'){
			success.call(this);
		}
	}
	CP.Danhmucsanpham.prototype.renderLysuDm = function (success){
		// this.blockIphoneCase.init(this.renderCasePhoneDm.bind(this));
		this.$el.append(this.blockLysu.$el);
		if(success != undefined && typeof success == 'function'){
			success.call(this);
		}
	}

})(jQuery,window,document)