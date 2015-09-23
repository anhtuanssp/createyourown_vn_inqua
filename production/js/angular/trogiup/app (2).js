(function(jQuery){

	var appTrogiup = angular.module('appTrogiup', ['ngRoute','trogiupControllers']);

	appTrogiup.config(['$routeProvider',
		function($routeProvider) {
		$routeProvider.
		  when('/main', {
		  	templateUrl : 'js/angular/trogiup/view/container.html',
		    controller: 'TroGiupControllerMain'
		  }).
		  when('/main/:id', {
		  	templateUrl : 'js/angular/trogiup/view/container.html',
		    controller: 'TroGiupDetailController'
		  }).
		  otherwise({
		    redirectTo: '/main'
		  });
	}]);

	appTrogiup.service('ArticleTroGiup', function( $http, $q) {
	    this.baiviets = [];

	    console.log(MYLIB.SERVICENAME.getArticleTroGiup);

        // I get all of the friends in the remote collection.
        function getBaiVietTroGiup() {

            var request = $http({
                method: "get",
                url: MYLIB.HOST+MYLIB.SERVICENAME.getArticleTroGiup
            });

            return( request.then( handleSuccess, handleError ) );

        }

        function getArticleContent(slug) {

            var request = $http({
                method: "get",
                url: MYLIB.HOST+MYLIB.SERVICENAME.getContentBySlug+'/'+slug,
            });

            return( request.then( handleSuccess, handleError ) );

        }

	    // I transform the error response, unwrapping the application dta from
	    // the API response payload.
	    function handleError( response ) {

	        // The API response from the server should be returned in a
	        // nomralized format. However, if the request was not handled by the
	        // server (or what not handles properly - ex. server error), then we
	        // may have to normalize it on our end, as best we can.
	        if (
	            ! angular.isObject( response.data ) ||
	            ! response.data.message
	            ) {

	            return( $q.reject( "An unknown error occurred." ) );

	        }

	        // Otherwise, use expected error message.
	        return( $q.reject( response.data.message ) );

	    }


	    // I transform the successful response, unwrapping the application data
	    // from the API response payload.
	    function handleSuccess( response ) {

	        return( response.data );

	    }

        // Return public API.
        return({
            getBaiVietTroGiup: getBaiVietTroGiup,
            getArticleContent : getArticleContent
        });


	});

	/**
	* TrogiupControllers Module
	*
	* Description
	*/
	var trogiupControllers = angular.module('trogiupControllers', []);

	trogiupControllers.controller('TroGiupControllerMain', ['$scope', '$http',
		'ArticleTroGiup','$sce','$location',
		function($scope,$http,ArticleTroGiup,$sce,$location){
			// init
			$scope.lisTrogiup = [];
			$scope.content = '';
			$scope.title = '';
			$scope.id = '';
			loadListBaiViet();

	        function loadListBaiViet(){

		      	// The ArticleTroGiup returns a promise.
	            ArticleTroGiup
		            .getBaiVietTroGiup()
		            .then(
		                function( bvs ) {

		                    applyRemoteData( bvs );

		                }
		            );

	        }

	        function applyRemoteData(bvs){
	        	$scope.lisTrogiup = bvs.data;

	        	$scope.content = $sce.trustAsHtml($scope.lisTrogiup[0].noidung_vi);

	        	$scope.title = $scope.lisTrogiup[0].ten_vi;
	        	
	        	console.log($scope.content);
	        	console.log($scope.lisTrogiup);
	        }

	        $scope.getArticleContent =  function($event,id){
	        	var li = angular.element($event.currentTarget);
	        	var siblingsLi = li.siblings();
	        	siblingsLi.removeClass('active');
	        	li.addClass('active')
				angular.forEach($scope.lisTrogiup, function(value, key) {

					if(id == value.id){
						$scope.title = value.ten_vi;
						$scope.content = $sce.trustAsHtml(value.noidung_vi);
						console.log(value.noidung_vi);
					}

				});	
	        }

	        $scope.redriectContent = function (slug_vi){
	        	$location.path('/main/'+slug_vi)
	        }
		}
	]);

	
	trogiupControllers.controller('TroGiupDetailController', ['$scope', '$http','ArticleTroGiup','$sce','$routeParams',
		function($scope,$http,ArticleTroGiup,$sce,$routeParams){
			// init
			$scope.lisTrogiup = [];
			$scope.content = '';
			$scope.id = $routeParams.id;
			$scope.title = '';
			$scope.active = '';

			getArticleContent($scope.id);
			loadListBaiViet();

	        function loadListBaiViet(){

		      	// The ArticleTroGiup returns a promise.
	            ArticleTroGiup
		            .getBaiVietTroGiup()
		            .then(
		                function( bvs ) {

		                    applyRemoteData( bvs );

		                }
		            );

	        }

	        function applyRemoteData(bvs){
	        	$scope.lisTrogiup = bvs.data;
	        }

			function getArticleContent(id){

					ArticleTroGiup
			            .getArticleContent(id)
			            .then(
			                function( bvs ) {

								$scope.title = bvs[0].ten_vi;
								$scope.content = $sce.trustAsHtml(bvs[0].noidung_vi);

								jQuery('title').html(bvs[0].ten_vi);
								jQuery("meta[name=description]").attr("content", (bvs[0].ten_vi) );
		
			                }
			            );
	        }

	        function returnActiveClass (slug){
	        	console.log($scope.id);
	        	if ($scope.id == slug)
	        		$scope.active = 'active';
	        }
		}
	]);

})(jQuery);
