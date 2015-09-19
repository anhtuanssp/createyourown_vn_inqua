var thietkemauController = angular.module('thietkemauController', []);

thietkemauController.controller('thietkemauControllerMain', ['$scope', '$http',
	'thietKeMauService','$sce','$location',
	function($scope,$http,thietKeMauService,$sce,$location){
		// init
		$scope.listTKMS = [];

		$scope.hostImg = MYLIB.IMAGEHOST;

		$scope.pathPopupProduct = MYLIB.mainUrl+'js/angular/thietkemau/view/popup.html';

		$scope.paging = 20;

		$scope.cate = null;

		$scope.relateProduct = [];
		$scope.tkmRelateID = null;

		$scope.cates = [
			{
				name : 'Điện thoại',
				id : 1
			},{
				name : 'Ly sứ',
				id : 2
			}
		];

		$scope.isShowing = false;

		loadThietKeMau($scope.paging,$scope.cate);

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
        	loadThietKeMau($scope.paging,$scope.cate);
        }

        $scope.selectCate = function(){
        	$scope.isShowing = true;
        	loadThietKeMau($scope.paging,$scope.cate);
        }

        function applyRemoteData(bvs){
        	$scope.listTKMS = bvs.data;
        	$scope.isShowing = false;

        }

        $scope.showPopupRelateProduct = function(id,thietkemauID){
        	console.log(id);

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
