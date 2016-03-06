<!DOCTYPE html>
<html ng-app="thietKeMauApp">
<head>
	<?php include './_tmpl/mainconfig.php' ?>
	<?php include './_tmpl/ctrl/thietkemau_ctrl.php'; ?>
	<?php include './_tmpl/ctrl/heart.php'; ?>

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<!-- SEO -->
	<?php include './_tmpl/seo.php'; ?>
	<!-- SEO -->

	<?php include './_tmpl/libs_css.php'; ?>

	<!-- Main script for entry page & very important -->
	<script src="build/mylib.min.js"></script>
	
	<!-- main confg & verry important -->
	<?php include './_tmpl/config.php'; ?>

</head>
<body class="inqua <?php echo $namePage; ?>">

	<!-- FB async -->
	<?php include './_tmpl/fb_ansyc.php'; ?>

	<!-- MENU -->
	<?php include './_tmpl/menu.php';  ?>
	<!-- END MENU -->
	
	<div id="share-header-social" style="margin-top:80px"></div>
	
	<!-- Main templ -->
	<?php include './_tmpl/thietkemau/main_tmpl.php'; ?>

	<div class="container_CP">
		<div class="sologan text-center">
			<h2>Chia sẻ tác phẩm của bạn với chúng tôi</h2>
			<span>Chỉ cần upload hình ảnh, tự design riêng theo cách của mình, chúng tôi sẽ giúp bạn</span>
		</div>
		<div class="slider-home my-slide">
			<div class="slider1">
				<div class="slide"><img src="imgs/slide/15.png"></div>
				<div class="slide"><img src="imgs/slide/8.png"></div>
				<div class="slide"><img src="imgs/slide/2.png"></div>
				<div class="slide"><img src="imgs/slide/3.png"></div>
				<div class="slide"><img src="imgs/slide/5.png"></div>
				<div class="slide"><img src="imgs/slide/6.png"></div>
				<div class="slide"><img src="imgs/slide/7.png"></div>
			</div>

		</div>
	</div>
	
	<!-- FACEBOOK WALL -->
	<?php include './_tmpl/fb_wall.php'; ?>
	<!-- END FACEBOOK WALL -->
	
	<!-- FOOTER -->
	<?php include './_tmpl/footer.php'; ?>
	<!-- END FOOTER -->

	<!-- SCRIPT & LIBS -->
	<?php include './_tmpl/libs_js.php'; ?>

	<script src="libs/angular.min.js"></script>
	<script src="libs/angular-route.min.js"></script>

	<!-- SERVICE -->
	<?php include './_tmpl/libs_service.php'; ?>
	<!-- SERVICE -->

	<!-- MENU -->
	<script src="js/menu.module/menu.module.js"></script>
	<script type="text/javascript">
		var menu = new CP.Mainmenu('#nav-menu');
		menu.init({
				home : '',
				danhmuc : '',
				trogiup : '',
				baiviet : '',
				thietke : 'active'
			});
	</script>

	<script src="js/angular/thietkemau/app.js"></script>
	<script src="js/angular/thietkemau/controller.js"></script>
	<script src="js/angular/thietkemau/service.js"></script>

	<script>

		var menu = new CP.Mainmenu('#nav-menu');
		menu.init({
				home : '',
				danhmuc : '',
				trogiup : '',
				baiviet : '',
				thietke : 'active'
			});


		NProgress.start();
    	setTimeout(function() { NProgress.done(); $('.fade').removeClass('out'); }, 2000);

	</script>

	<script type="text/javascript">
		jQuery(document).ready(function($) {
			$('.slider1').bxSlider({
			    slideWidth: 150,
			    minSlides: 5,
			    maxSlides: 6,
			    slideMargin: 20
			  });
		});	
	</script>

	<!-- logo effect -->
	<?php include './_tmpl/effect_logo.php'; ?>
	<!-- GOOGLE ANALYTICS -->
	<?php include './_tmpl/ga.php'; ?>

</body>
</html>