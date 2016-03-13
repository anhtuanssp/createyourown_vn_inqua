<script type="text/javascript">

;(function (){
	// important : not change 
	MYLIB.constant = {
		//app constant
		app_id : 'app',
		app_class : 'container_CP',
		//dashboard constant
		dashboard_id : 'dashboard',
		dashboard_class : 'dashboard',
		top_id : 'top_cp',
		top_class :'top_cp',
		//left constant
		left_id : 'optional_CP',
		left_class : 'left',
		//left constant
		right_id : 'main_CP',
		right_class : 'right',
		// module choose product
		choose_product_id : 'choose_product_id',
		choose_product_class : 'choose_product_class',
		//module main canvas
		main_canvas_id : 'main_canvas_id',
		main_canvas_class : 'main_canvas_class',
		//module text control 
		text_module_custom_font_size_id : 'text_module_custom_font_size',
		text_module_custom_font_size_output_id : 'text_module_custom_font_size',
		//module control 
		control_id : 'control_id',
		control_class : 'control_class'
	}
	// important : not change 
	MYLIB.eventNames = {
		chooseProductItem : 'CHOOSE_PRODUCT_ITEM',
		saveCanvas : 'SAVE_CANVAS',
		//TEXT MODULE
		event_submit_text : 'SUBMIT_FORM_TEXT',
		event_fontSize : 'CHANGE_FONTSIZE',
		//UPLOAD MODULE
		event_upload_from_computer : 'UPLOAD_FROM_COMPUTER',
		event_upload_from_url : 'UPLOAD_FROM_URL',
		event_upload_from_asset : 'UPLOAD_FROM_ASSET',
		event_display_img : 'DISPLAY_IMG_TOP',
		//Change color 
		event_change_color : 'CHANGE_COLOR',
		//CONTROL
		event_delete_item : 'EVENT_ITEM',
		event_duplicate_item : 'EVENT_COPY',
		// facebook
		event_open_photos: 'EVENT_OPEN_PHOTOS',

		event_open_asset_photos : 'EVENT_OPEN_PHOTOS_ASSET',

		event_checkout : 'EVENT_CHECKOUT',

		//OPEN EDIT IMGS
		event_open_edit_imgs : 'EVENT_EDIT_IMGS',
		event_open_font_edit : 'EVENT_OPEN_FONTS',
		event_change_font : 'EVENT_CHANGE_FONT',

		// opacity
		event_opacity : 'EVENT_OPACITY_CHANGE',

		event_load_product_success : 'EVENT_LOAD_PRODUCT_SUCCESS',

		event_switch_drawmode : 'EVENT_SWITCH_DRAWMODE',

		event_free_draw  : 'EVENT_FREE_DRAW',
		event_set_line_width_free_draw : 'EVENT_SET_LINE_WIDTH_FREE_DRAW',
		event_set_line_color_free_draw : 'EVENT_SET_LINE_COLOR',
		event_change_partern : 'event_change_partern',

		//snapshot popup
		event_open_snapshot : 'event_open_snapshot',
	}
	// important : not change 
	MYLIB.facebook = {
		appid : '<?php echo $CONST_ENV["facebookAppId_$env"] ?>'
	}
	// important : not change 
	MYLIB.HOST = '<?php echo $CONST_ENV["hostApi_$env"] ?>';
	// important : not change 
	MYLIB.IMAGEHOST = '<?php echo $CONST_ENV["hostImg_$env"] ?>';

	// important : not change 
	MYLIB.SERVICENAME = {
		getAllProducts : 'getAllProduct',
		getSpecificProducts : 'getSpecificProducts',
		getAllProductAllHome : 'getAllProductAllHome',
		getProductByCate : 'getProductByCate',
		getAssetCates : 'getCateAssetMedia',
		getAssetMediaByCate : 'getAssetMediaByCate',
		createOrder : 'createOrder',
		getDanhMuc : 'getCates',
		getCate : 'getCate',
		getArticleTroGiup : 'getTroGiupArticle',
		getContentArticle : 'getContentArticle',
		getContentBySlug : 'getContentBySlug',
		sendFeedback : 'sendFeedback',
		getThietKeMau : 'getThietKeMau',
		getSpecificThietkemau : 'getSpecificThietkemau',
		getProductRelateByID : 'getProductRelateByID',
		fakeServiceTest1 : 'fakeServiceTest1',
		getUserProfile : 'getUserProfile',
		updateProfileUser : 'updateProfileUser',
		getAssetMediaByLimit : 'getAssetMediaByLimit',
		getAssetsMediaByIds  : 'getAssetsMediaByIds',
		addCountAssetMedia : 'addCountAssetMedia',
		uploadSharePhoto : 'uploadSharePhoto'
	}
	//namespace
	MYLIB.namespace('CP');

	MYLIB.namespace('CP_INIT');

	CP_INIT.text = {
		fontSize : '20',
		color : '#000',
		"fontFamilyDefault" : "Perfograma,arial, helvetica",
		"fontWeightDefault" : 400,
		listFont : [
			{
				font : 'NineteenOhFive',
				label : 'NineteenOhFive',
				fontWeight : [400,300]
			},
			{
				font : 'Oswald',
				label : 'Oswald',
				fontWeight : [400,300]
			},
			{
				font : 'TFPironv2',
				label : 'TFPironv2',
				fontWeight : [300]
			},
			{
				font : 'glideSketchSketch',
				label : 'Glide Sketch Sketch',
				fontWeight : [300]
			},
			{
				font : 'Perfograma',
				label : 'Perfograma',
				fontWeight : [300]
			},
			{
				font : 'QuadLight',
				label : 'QuadLight',
				fontWeight : [300]
			},
			{
				font : 'QuadUltra',
				label : 'QuadUltra',
				fontWeight : [300]
			},
			{
				font : 'DJGROSS',
				label : 'DJGROSS',
				fontWeight : [300]
			},
			{
				font : 'adrip1',
				label : 'adrip1',
				fontWeight : [300]
			},
			{
				font : 'Brock Vandalo',
				label : 'Brock Vandalo',
				fontWeight : [300]
			},
			{
				font : 'JEMBOhands',
				label : 'JEMBOhands',
				fontWeight : [300]
			},
			{
				font : 'Pony',
				label : 'Pony',
				fontWeight : [300]
			},{
				font : 'Nabila',
				label : 'Nabila',
				fontWeight : [300]
			},
			{
				font : 'iCielAmerigraf',
				label : 'iCielAmerigraf',
				fontWeight : [300]
			},{
				font : 'AROLY',
				label : 'AROLY',
				fontWeight : [300]
			},{
				font : 'UVF Yummy Cupcakes',
				label : 'UVF Yummy Cupcakes',
				fontWeight : [300]
			},{
				font : 'SVN-Aaron Script',
				label : 'SVN-Aaron Script',
				fontWeight : [300]
			},{
				font : 'SVN-Snell Roundhand Script',
				label : 'SVN-Snell Roundhand Script',
				fontWeight : [300]
			},{
				font : 'VL_Tinta-Script',
				label : 'VL_Tinta-Script',
				fontWeight : [300]
			},{
				font : 'Hipsteria',
				label : 'Hipsteria',
				fontWeight : [300]
			}


		]
	};

	//links
	MYLIB.namespace('CP_LINK');

	CP_LINK.url = {
		danhmuc : 'danhmuc.php',
		sanpham : 'sanpham.php',
		design : 'design.php'
	}

	CP_LINK.param = {
		cate : 'cate'
	}

	MYLIB.namespace('CP_SEO');
	CP_SEO.default_param = {
		title : 'CREATE YOUR OWN',
		desc : 'Thế kế case điện thoại online, thiết kế vỏ điện thoại, In skin vỏ điện thoại, In ly sứ - Tự thiết kế ly sứ, Thiết kế áo thun online',
		keyword : 'In vỏ điện thoại'
	}
	CP_SEO.facebookMessage = {
		msg : [
			'Cảm ơn bạn đã thiết kế và đặt hàng của chúng tôi',
			'Tác phẩm của bạn thật tuyệt vời, share it now',
		]
	}

	MYLIB.mainUrl = '<?php echo $CONST_ENV["host_$env"] ?>';
	MYLIB.mainURLIMG = '<?php echo $CONST_ENV["hostImgClient_$env"] ?>';

	MYLIB.typeFile = {
		'png' : 'image/png',
		'jpg' : 'image/jpeg',
		'pjpg' : 'image/pjpeg',
		'jpeg' : 'image/jpeg',
		'pjpeg' : 'image/pjpeg'
	}

	
})()


 </script>