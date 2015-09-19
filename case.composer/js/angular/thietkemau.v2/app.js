var thietKeMauApp = angular.module('thietKeMauApp', ['thietkemauController','ngRoute']);

	thietKeMauApp.config(['$routeProvider',
		function($routeProvider) {
		$routeProvider.
		  when('/tat-ca-thiet-ke', {
		  	templateUrl : 'js/angular/thietkemau.v2/view/list.html',
		    controller: 'thietkemauControllerMain'
		  }).
		  when('/danh-muc/:id/:slug', {
		  	templateUrl : 'js/angular/thietkemau.v2/view/list.html',
		    controller: 'thietkemauControllerMain'
		  }).
		  otherwise({
		    redirectTo: '/tat-ca-thiet-ke'
		  });
	}]);