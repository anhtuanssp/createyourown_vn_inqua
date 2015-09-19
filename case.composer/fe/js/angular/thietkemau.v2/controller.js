var thietkemauController = angular.module('thietkemauController', []);

thietkemauController.controller('thietkemauControllerMain', ['$scope', '$http',
	'thietKeMauService','$sce','$location','$routeParams',
	function($scope,$http,thietKeMauService,$sce,$location,$routeParams){
		// init
		$scope.listTKMS = [];

		$scope.hostImg = MYLIB.IMAGEHOST;

		$scope.pathPopupProduct = MYLIB.mainUrl+'js/angular/thietkemau/view/popup.html';

		$scope.paging = 20;

		

		$scope.relateProduct = [];
		$scope.tkmRelateID = null;

		$scope.cates = [
			{
				name : 'Điện thoại',
				id : 1,
				slug : 'dien-thoai'
			},{
				name : 'Ly sứ',
				id : 2,
				slug : 'ly-su'
			}
		];

		$scope.cate = ($routeParams.id == undefined)? null : $routeParams.id;

		$scope.isShowing = false;

		if($routeParams.id !== undefined){
			loadThietKeMau($scope.paging,$routeParams.id);
		}else{
			loadThietKeMau($scope.paging,$scope.cate);
		}

        function loadThietKeMau(paging,cateId){

	      	// The ArticleTroGiup returns a promise.
	      	MYLIB.LOADING_WITH_ID('thietkemau');
            thietKeMauService
	            .getThietKeMau(paging,cateId)
	            .then(
	                function( bvs ) {
	                	MYLIB.REMOVE_LOADING();
	                    applyRemoteData( bvs );

	                }
	            );

        }


        $scope.selectPaging = function(){
        	$scope.isShowing = true;
	  		if($routeParams.id !== undefined){
				loadThietKeMau($scope.paging,$routeParams.id);
			}else{
				loadThietKeMau($scope.paging,$scope.cate);
			}
        }

        $scope.selectCate = function(){
        	$scope.isShowing = true;
        	var name = '';
        	var i = 0;
        	for (i = $scope.cates.length-1; i >= 0; i--) {
        		if($scope.cates[i].id == $scope.cate){
        			name = $scope.cates[i].slug;
        		}

        	};
        	$location.path('/danh-muc/' + $scope.cate +'/'+name);
        }

        function applyRemoteData(bvs){
        	$scope.listTKMS = bvs.data;
        	$scope.isShowing = false;
        	setTimeout(function(){
	        	var name = '';
	        	var i = 0;
	        	for (i = $scope.cates.length-1; i >= 0; i--) {
	        		if($scope.cates[i].id == $scope.cate){
	        			name = $scope.cates[i].name;
	        		}
	        	};

	        	$('.cates option').each(function(index, el) {
	        		if($(this).text() == name){
	        			$(this).prop('selected', true)
	        		}	
	        	});

        	}, 200)
        	
        }

        $scope.showPopupRelateProduct = function(id,thietkemauID){
        	// console.log(id);

        	$('#pop-up-show-product-relate').modal('show');

        	// getRelateProduct
        	MYLIB.LOADING_WITH_ID('thietkemau');
            thietKeMauService
	            .getRelateProduct(id)
	            .then(
	                function( bvs ) {
	                	MYLIB.REMOVE_LOADING();
	                    
	                	$scope.relateProduct = bvs;

	                	$scope.tkmRelateID = thietkemauID;
	                }
	            );
        }
	}
]);

