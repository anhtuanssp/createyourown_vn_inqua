<!DOCTYPE html>
<html>
<head>
	<?php include './_tmpl/mainconfig.php' ?>
	<?php include './_tmpl/ctrl/sanpham_ctrl.php'; ?>
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

	<div id="main-content" class="container_CP dmsp">
		<div class="sologan text-center">
			<h2 class="btn-started">Chọn sản phẩm bạn muốn thiết kế</h2>
			<span>Chỉ cần upload hình ảnh, tự design riêng theo cách của mình, chúng tôi sẽ giúp bạn</span>
		</div>


		<div class="show-case" id="sanpham">

		</div>


	</div>
	
	<?php include './_tmpl/fb_wall.php'; ?>

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
				home : '',
				danhmuc : 'active',
				trogiup : '',
				baiviet : ''
			});
	</script>


	<!-- logo effect -->
	<?php include './_tmpl/effect_logo.php'; ?>

	<script src="js/sanpham.module/sanpham.js"></script>
	<script src="js/sanpham.module/main.module.js"></script>

	<script>
		var cate = MYLIB.getParamURL('cate');
		var sp = new CP.SanphamModule('#sanpham');
		sp.init(cate);

		NProgress.start();
    	setTimeout(function() { NProgress.done(); $('.fade').removeClass('out'); }, 2000);

	</script>

	<?php include './_tmpl/ga.php'; ?>
</body>
</html>