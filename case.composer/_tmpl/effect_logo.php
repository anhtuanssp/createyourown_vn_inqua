<script type="text/javascript">
    	jQuery(document).ready(function($) {
			$('#nav-menu h1 span').snabbt({
	            fromRotation: [0, 0, -8 * Math.PI],
	            delay: function(i) {
	                return 1000 + i * 100;
	            },
	            duration: 1000,
	            easing: 'ease',
	            complete: function(i, length) {
	                if (i === length - 1) {
	                    $('#nav-menu h1').snabbt({
	                        transformOrigin: [0, 100, 0],
	                        rotation: [-Math.PI / 4, 0, 0],
	                        perspective: 300,
	                        easing: 'linear',
	                        delay: 400,
	                        duration: 1000
	                    }).snabbt({
	                        rotation: [0, 0, 0],
	                        transformOrigin: [0, 100, 0],
	                        easing: 'spring',
	                        perspective: 300,
	                        springConstant: 0.2,
	                        springDeceleration: 0.90,
	                        springMass: 4
	                    });
	                }
	            }
	        });
		});
</script>