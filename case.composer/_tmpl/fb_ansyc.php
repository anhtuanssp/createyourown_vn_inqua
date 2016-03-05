	<script>
		/**
		* Override fbAsyncInit function (window scope) to initialize Facebook SDK after getting JS SDK source
		*/
		window.fbAsyncInit = function() {
			FB.init({
			  appId      : MYLIB.facebook.appid,
			  xfbml      : true,
			  version    : 'v2.1'
			});
		};
		  // Load the SDK asynchronously
		  (function(d, s, id) {
		    var js, fjs = d.getElementsByTagName(s)[0];
		    if (d.getElementById(id)) return;
		    js = d.createElement(s); js.id = id;
		    js.src = "https://connect.facebook.net/en_US/sdk.js";
		    fjs.parentNode.insertBefore(js, fjs);
		  }(document, 'script', 'facebook-jssdk'));
	</script>