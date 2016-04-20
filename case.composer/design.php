<!DOCTYPE html>
<html>
<head>
	<?php include './_tmpl/mainconfig.php' ?>
	<?php include './_tmpl/ctrl/design_ctrl.php'; ?>
	<?php include './_tmpl/ctrl/heart.php'; ?>

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<!-- SEO -->
	<?php include './_tmpl/seo.php'; ?>
	<!-- SEO -->

	<?php include './_tmpl/libs_css.php'; ?>
	<link rel="stylesheet" href="libs/darkroom/css/darkroom.min.css">
	<link rel="stylesheet" href="libs/intro/introjs.min.css">

	<!-- Main script for entry page & very important -->
	<script src="build/mylib.min.js"></script>
	
	<!-- main confg & verry important -->
	<?php include './_tmpl/config.php'; ?>

</head>
<body class="design">

		<!-- FB async -->
	<?php include './_tmpl/fb_ansyc.php'; ?>

	<!-- MENU -->
	<?php include './_tmpl/menu.php';  ?>
	<!-- END MENU -->
	
	<div id="share-header-social" style="margin-top:80px"></div>

	<div class="container_CP sologan-text-container-design">
		<div class="sologan text-center">
			<h2 class="btn-started">Keep calm and design your own! </h2>
			<span>Chỉ cần upload hình ảnh, tự design riêng theo cách của mình, chúng tôi sẽ giúp bạn</span>
		</div>
	</div>

	<div id="create-your-own" class="app-design">
	</div>
	<!-- <div class="metarial"></div> -->

	<?php include './_tmpl/fb_wall.php' ?>
	<!-- FOOTER -->
	<?php include './_tmpl/footer.php'; ?>
	<!-- END FOOTER -->


	<div id="guideTour" class="modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
	  <div class="modal-dialog modal-sm" style="transform: translate(0, 80%) !important;
  						-ms-transform: translate(0, 80%) !important;
  						-webkit-transform: translate(0, 80%) !important;">
	    <div class="modal-content">
			    <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		          <h4 class="modal-title"> <i class="ion-ios-lightbulb-outline"></i> GUIDE TOUR</h4>
		      </div>
		        <div class="modal-body">
		        	<p style="padding:10px">
		        		Chào quý khách, click vào button "Bắt đầu" để nhận được hướng dẫn sử dụng app, click vào button "Bỏ qua" để bắt đầu thiết kế.
		        	</p>
		        </div>
		        <div class="modal-footer">
		        		<button type="button" class="btn btn-primary" onclick="javascript:startTour();">Bắt đầu <i class="ion-ios-fastforward-outline"></i></button>
		        		<button type="button" class="btn btn-default" data-dismiss="modal">Bỏ qua</button>
		      </div>
		    </div>
	    </div>
	  </div>
	

	<!-- SCRIPT & LIBS -->
	<?php include './_tmpl/libs_js.php'; ?>

	<!-- SCRIPT FOR DESIGN PAGE -->
	<script src="libs/vintage.presets.js"></script>
	<script src="libs/vintage.js"></script>
	<script src="libs/jquery.vintage.js"></script>
	<script src="libs/intro/intro.min.js"></script>
	<script src="libs/darkroom/js/darkroom.dist.js"></script>
	<script src="libs/webcamjs-master/webcam.min.js"></script>
	<script src="libs/clickfix.js"></script>
	<script src="libs/d3.js"></script>
	<script src="libs/d3.layout.cloud.js"></script>
	<script src="libs/jquery-ui.js"></script>
	<script src="libs/jquery.ui.touch-punch.min.js"></script>

	<!-- SERVICE -->
	<?php include './_tmpl/libs_service.php'; ?>
	<!-- SERVICE -->

	<script src="js/module/popup.js"></script>

	<?php if ($env == 'dev'): ?>
		
		<script src="js/module/choose.product/choose.product.js"></script>
		<script src="js/module/choose.product/product.item.js"></script>
		<script src="js/module/canvas.composer/main.canvas.js"></script>
		<script src="js/module/save.canvas/save.canvas.js"></script>
		<script src="js/module/text.module/text.module.js"></script>
		<script src="js/module/text.module/text.module.form.js"></script>
		<script src="js/module/text.module/text.module.custom.js"></script>
		<!-- FONT CHU -->
		<script src="js/module/text.module/popup.edit.font/module.js"></script>
		<script src="js/module/color.module/color.module.js"></script>
		<script src="js/module/color.module/color.module.controller.js"></script>
		<script src="js/module/color.module/color.module.model.js"></script>
		<script src="js/module/color.module/color.module.view.js"></script>
		<script src="js/module/color.horizontal.module/main.module.js"></script>
		<script src="js/module/shape.module/shape.module.js"></script>
		<script src="js/module/shape.module/shape.controller.js"></script>
		<script src="js/module/shape.module/shape.service.js"></script>
		<script src="js/module/shape.module/shape.view.js"></script>

		<script src="js/module/social.module/social.module.js"></script>
		<script src="js/module/social.module/social.controller.js"></script>
		<script src="js/module/social.module/social.view.js"></script>
		<script src="js/module/social.module/social.model.js"></script>

		<script src="js/module/snapshot/snapshot.module.js"></script>
		

		<script src="js/module/social.module/facebook/popup.facebook.module.js"></script>
		<script src="js/module/social.module/facebook/popup.facebook.albums.js"></script>
		<script src="js/module/social.module/facebook/popup.facebook.photos.module.js"></script>
		<script src="js/module/social.module/facebook/popup.facebook.photos.js"></script>
		<script src="js/module/social.module/facebook/popup.facebook.photos.item.js"></script>

		<script src="js/module/popup.module/popup.module.assets/popup.assets.module.js"></script>
		<script src="js/module/popup.module/popup.module.assets/popup.assets.category.js"></script>
		<script src="js/module/popup.module/popup.module.assets/popup.assets.photo.area.js"></script>
		<script src="js/module/popup.module/popup.module.assets/popup.assets.photo.js"></script>
		<script src="js/module/popup.module/popup.module.assets/popup.assets.photo.item.js"></script>

		<script src="js/module/upload/upload.from.computer/upload.from.computer.controller.js"></script>
		<script src="js/module/upload/upload.from.computer/upload.from.computer.form.js"></script>

		<script src="js/module/upload/upload.from.assets/upload.from.asset.module.js"></script>

		<script src="js/module/upload/display.img.module/display.module.js"></script>
		<script src="js/module/upload/display.img.module/display.module.controller.js"></script>
		<script src="js/module/upload/display.img.module/display.module.model.js"></script>
		<script src="js/module/upload/display.img.module/display.module.view.js"></script>

		<script src="js/module/upload/upload.from.facebook/upload.from.facebook.module.js"></script>
		<script src="js/module/upload/take.snapshot/take.snapshot.js"></script>

		<script src="js/module/upload/effect.img.module/btn.open.effect.img.js"></script>

		<script src="js/module/tool.module/tool.module.js"></script>
		<script src="js/module/tool.module/tool.controller.js"></script>
		<script src="js/module/tool.module/tool.service.js"></script>
		<script src="js/module/tool.module/tool.view.js"></script>

		<script src="js/sticker.module/sticker.modue.js"></script>

		<!-- NEW FEATURED -->
		<script src="js/module/free.draw.module/module.js"></script>

		<!-- Opacity -->
		<script src="js/module/opacity.module/module.js"></script>

		<!-- Fecbook login -->
		<script src="js/module/facebook.login/module.js"></script>

		<!-- ORDER -->
		<script src="js/module/order.module.v1/order.module.js"></script>
		<script src="js/module/order.module.v1/order.controller.js"></script>
		<script src="js/module/order.module.v1/step1.module/step1.module.js"></script>
		<script src="js/module/order.module.v1/step2.module/step2.module.js"></script>
		<script src="js/module/order.module.v1/step3.module/step3.module.js"></script>

			<!-- CONTROL-MODULE -->
		<script src="js/module/module.control/control.module.js"></script>
		<script src="js/module/module.control/control.controller.js"></script>
		<script src="js/module/module.control/control.service.js"></script>
		<script src="js/module/module.control/control.view.js"></script>

			<!-- EDIT IMAGE -->
		<script src="js/module/edit.imgs.module/module.js"></script>

		<script src="js/module/crop.image.module/module.js"></script>

		<!-- PRICE -->
		<script src="js/module/price.module/module.js"></script>

		<!-- PRODUCT INFO -->
		<script src="js/module/product.tab.module/product.tab.module.js"></script>
		<script src="js/module/share.facebook/share.main.js"></script>
	<?php else: ?>
		<script src="dist/service.js"></script>
		<script src="dist/all.js"></script>
	<?php endif; ?>

	<script src="js/leftModule.js"></script>
	<script src="js/rightModule.js"></script>
	<script src="js/control.module.js"></script>
	<script src="js/topModule.js"></script>
	<script src="js/dashboard.js"></script>
	<script src="js/mylib_util.js"></script>
	<script src="js/app.js"></script>

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

	<script type="text/javascript">
		function startTour() {
			var tour = introJs()
			tour.setOption('tooltipPosition', 'auto');
			tour.setOption('positionPrecedence', ['left', 'right', 'bottom', 'top'])
			tour.start()
		}
		var menu = new CP.Mainmenu('#nav-menu');
		menu.init({
				home : '',
				danhmuc : 'active',
				trogiup : '',
				baiviet : ''
			});

		var id = MYLIB.getParamURL('id');
		var type = MYLIB.getParamURL('type');

		var app = new CP.APP_CP();
		app.initDesignProduct('create-your-own',[id]);

		NProgress.start();
    	setTimeout(function() { NProgress.done(); $('.fade').removeClass('out'); }, 2000);

	</script>

	<script>
		jQuery(window).load(function (){

			if(sessionStorage.isTour == undefined){
				$('#guideTour').modal('show')
				sessionStorage.isTour = true;
			}

		})
	</script>

	<!-- GOOGLE ANALYTICS -->
	<?php include './_tmpl/ga.php'; ?>

</body>
</html>