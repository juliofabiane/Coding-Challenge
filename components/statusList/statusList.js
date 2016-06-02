'use strict';

angular.module(Config.applicationModuleName)
	.config(StatusListConfig)
	.controller('StatusListController', StatusListController);

StatusListConfig.$inject = ['$stateProvider'];
StatusListController.$inject = [
	'$scope',
	'$state',
	'Status',
	'Friends',
	'toaster'
];

function StatusListConfig($stateProvider) {
	$stateProvider
		.state('layout.statusList', {
			url: '/status',
			templateUrl: 'statusList/statusList.html',
			controller: StatusListController
		});
};

function StatusListController($scope, $state, Status, Friends, toaster) {	
	/**
	 * $scope.init
	 * Function is executed when the page loads
	 */
	$scope.init = function () {
		loadStatusList();
		loadFriends(20, 1);
		$scope.users = [];
	}
	
	/**
	 * loadStatusList
	 * Loads the status list and the user
	 */
	function loadStatusList() {
		Status.query(function (response) {
			$scope.statusList = response.data;
			
			/**
			 * Percorre a lista de status e busca o usuário
			 * Walks the status list and finds the user
			 */
			for (var i = 0; i < $scope.statusList.length; i++) {
				if ($scope.statusList[i]['user'] && $scope.statusList[i]['user'].length > 0) {
					Friends.get({ 'id': $scope.statusList[i]['user'] }, function (response) {
						$scope.resolved = response.$resolved;
						$scope.$watch('resolved', function (value) {
							if (value) {
								$scope.users[response.id] = {
									'name': response.name,
									'avatar': response.avatar
								};
							}
						})
					});
				}
			}			
		}, function (error) {
			toaster.pop("error", "Error", "Could not load the status list.");
			console.log(error);
		});
	}
	
	/**
	 * loadFriends
	 * Loads the list of friends  
	 * @param {Int} pageSize : Number of friends per page 
	 * @param {Int} page : Number of the page that will be loaded  
	 */
	function loadFriends(pageSize, page) {
		Friends.query({ 'pageSize': pageSize, page: page }, function (response) {
			$scope.friendList = response.data;
		}, function (error) {
			toaster.pop("error", "Error", "Could not load friends.");
			console.log(error);
		});
	}
}