<?php 
	
	// default global variable
	$title = "inqua.vn - In quà tặng - In ly sứ giá rẻ - Create your own - Lưu trữ khoảnh khắc";
	$description = "Thiết kế ly sứ, In ly sứ - Tự thiết kế ly sứ, In skin vỏ điện thoại Thiết kế áo thun online";
	$fb_title = "inqua.vn - In quà tặng - In ly sứ giá rẻ - Create your own - Lưu trữ khoảnh khắc";
	$fb_url = "http://inqua.vn/";
	$fb_description = "Thiết kế In ly sứ - Tự thiết kế ly sứ - Quà tặng - In quà tặng";
	$fb_image = "http://inqua.vn/imgs/banner/logo-banner.png";

	switch ($namePage) {
		case 'index':
			updateSeo(
				"inqua.vn - In quà tặng - In ly sứ giá rẻ - Create your own - Lưu trữ khoảnh khắc",
				"Thiết kế ly sứ, In ly sứ - Tự thiết kế ly sứ, In skin vỏ điện thoại Thiết kế áo thun online.",
				"inqua.vn - In quà tặng - In ly sứ giá rẻ - Create your own - Lưu trữ khoảnh khắc",
				"http://inqua.vn/",
				"Thiết kế In ly sứ - Tự thiết kế ly sứ - Quà tặng - In quà tặng",
				"http://inqua.vn/imgs/banner/logo-banner.png"
				);
			break;
		
		default:
			# code...
			break;
	};

	function updateSeo($t, $des , $fbt, $fbu, $fbd, $fbi){
		global $title, $description, $fb_title, $fb_url, $fb_description, $fb_image;

		$title = $t;
		$description = $des;
		$fb_title = $fbt;
		$fb_url = $fbu;
		$fb_description = $fbd;
		$fb_image = $fbi;
	};
 ?>