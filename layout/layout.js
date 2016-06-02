'use strict';

angular.module(Config.applicationModuleName)
	.config(LayoutConfig)
	.controller('LayoutController', LayoutController);

LayoutConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
LayoutController.$inject = [
	'$scope',
	'$state',
	'$localStorage'
];

function LayoutConfig($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/status");

	$stateProvider
		.state('layout', {
			abstract: true,
			templateUrl: 'layout.html'
		});
};

function LayoutController($scope, $state, $localStorage) {
	$scope.$state = $state;

	$scope.app = Config.layout;
	if (angular.isDefined($localStorage.settings)) {
		$scope.app.settings = $localStorage.settings;
	} else {
		$localStorage.settings = $scope.app.settings;
	}
	$scope.$watch('app.settings', function () {
		if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
			$scope.app.settings.headerFixed = true;
		}
		$localStorage.settings = $scope.app.settings;
	}, true);
};
