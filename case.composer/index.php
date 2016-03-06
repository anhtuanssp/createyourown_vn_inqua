<!DOCTYPE html>
<html>
<head>
	<?php include './_tmpl/mainconfig.php' ?>
	<?php include './_tmpl/ctrl/index_ctrl.php'; ?>
	<?php include './_tmpl/ctrl/heart.php'; ?>

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<!-- SEO -->
	<?php include './_tmpl/seo.php'; ?>
	<!-- SEO -->

	<?php include './_tmpl/libs_css.php'; ?>

	<!-- Main script for entry page & very important -->
	<script src="<?php echo $CONST_ENV["host_$env"] ?>build/mylib.min.js"></script>
	
	<!-- main confg & verry important -->
	<?php include './_tmpl/config.php'; ?>

</head>
<body class="inqua <?php echo $namePage; ?>">

	<!-- FB async -->
	<?php include './_tmpl/fb_ansyc.php'; ?>

	<!-- MENU -->
	<?php include './_tmpl/menu.php';  ?>
	<!-- END MENU -->

	<!-- Share & feedback -->
	<?php include './_tmpl/share_feedback.php'; ?>

	<!-- intro -->
	<?php include './_tmpl/index/intro.php'; ?>

	<!-- welcome -->
	<?php include './_tmpl/index/welcome.php'; ?>
	
	<!-- asset module -->
	<div id="asset-media" class="container_CP" style="margin-top: 15px"></div>

	<!-- cate -->
	<?php include './_tmpl/index/cates.php'; ?>

	
	<!-- SHARE POSTCARD-->
	<?php include './_tmpl/index/intro_share.php'; ?>
	<!-- SHARE POSTCARD-->
	
	<?php include './_tmpl/index/fb_intro.php'; ?>


	<!-- STEP ORDER INSTRUCTION -->
	<?php include './_tmpl/index/step.php'; ?>
	<!-- END STEP ORDER INSTRUCTION -->


	<!-- FOOTER -->
	<?php include './_tmpl/footer.php'; ?>
	<!-- END FOOTER -->
	
	<!-- SCRIPT & LIBS -->
	<?php include './_tmpl/libs_js.php'; ?>

	<!-- SERVICE -->
	<?php include './_tmpl/libs_service.php'; ?>
	<!-- SERVICE -->

	<!-- MENU -->
	<script src="js/menu.module/menu.module.js"></script>
	
	<script type="text/javascript">
		var menu = new CP.Mainmenu('#nav-menu');
		menu.init({
				home : 'active',
				danhmuc : '',
				trogiup : '',
				baiviet : ''
			});
	</script>

	<!-- BANNER -->
	<script src="js/module/popup.js"></script>
	<!--<script src="js/popup.banner.module/banner.js"></script>-->
	<script src="js/sticker.module/sticker.modue.js"></script>
	<!-- script control homepage -->
	<script src="js/page/home.js"></script>
	<script type="text/javascript">

		NProgress.start();
    	setTimeout(function() { NProgress.done(); $('.fade').removeClass('out'); }, 2000);

    	//share 
    	$('#share-header-social .share_facebook').click(function(event) {
    		var url = document.URL;
    		var img = MYLIB.mainURLIMG+'fb.png';
    		var msg = CP_SEO.default_param.desc;
    		var caption = CP_SEO.default_param.desc;
    		CP.FacebookService.getInstance.shareUI(url,img,msg,caption);
    	});

	</script>

	<!-- logo effect -->
	<?php include './_tmpl/effect_logo.php'; ?>

	<!-- GOOGLE ANALYTICS -->
	<?php include './_tmpl/ga.php'; ?>
</body>
</html>