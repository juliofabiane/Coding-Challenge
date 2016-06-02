'use strict';

var Config = (function () {
	return {
		applicationModuleName: 'CodingChallenge',
		applicationModuleVendorDependencies: [
			'ngResource',
			'ngStorage',
			'ngAnimate',
			'ngCookies',
			'ngSanitize',
            'ngTouch',
			'ngMessages',
			'ui.router',
			'ui.bootstrap',
			'toaster',
			'backand'
		]
	};
})();

angular.module(Config.applicationModuleName, Config.applicationModuleVendorDependencies)
	.config(['$locationProvider', 'BackandProvider',
		function ($locationProvider, BackandProvider) {
			BackandProvider.setAnonymousToken('7e507e02-3eaf-401d-b3a9-a33e823d632f');
			//  $locationProvider.html5Mode(true);
		}
	]);

angular.element(document).ready(function () {
	angular.bootstrap(document, [Config.applicationModuleName]);
});
