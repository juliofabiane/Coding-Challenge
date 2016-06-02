'use strict';

angular.module(Config.applicationModuleName)
	.config(StatusRegisterConfig)
	.controller('StatusRegisterController', StatusRegisterController);

StatusRegisterConfig.$inject = ['$stateProvider'];
StatusRegisterController.$inject = [
	'$scope',
	'$state',
	'$stateParams',
	'Status',
	'Friends',
	'toaster'
];

function StatusRegisterConfig($stateProvider) {
	$stateProvider
		.state('layout.statusRegister', {
			url: '/status/register/:id',
			templateUrl: 'statusRegister/statusRegister.html',
			controller: StatusRegisterController
		});
};

function StatusRegisterController($scope, $state, $stateParams, Status, Friends, toaster) {
	/**
	 * $scope.init
	 * Function is executed when the page loads
	 */
	$scope.init = function () {
		$scope.title = "New Status";
		$scope.subtitle = "Create new status";
		if ($stateParams.id) {
			$scope.title = "Update Status";
			$scope.subtitle = "Update your status";
		}

		loadStatus();
		loadUsers();
	}
	
	/**
	 * $scope.register
	 * Create or Update status
	 * @param {object} status: Object that will be saved 
	 */
	$scope.register = function (status) {
		if ($stateParams.id) {
			Status.update(status, function () {
				$state.go('layout.statusList').then(function () {
					toaster.pop("success", "Good!", "Status has been updated!");
				});
			}, function (error) {
				toaster.pop("error", "Error", "Could not update the status.");
				console.log(error);
			});
		} else {
			Status.save(status, function () {
				$state.go('layout.statusList').then(function () {
					toaster.pop("success", "Good!", "Status has been created!");
				});
			}, function (error) {
				toaster.pop("error", "Error", "Could not create the status.");
				console.log(error);
			});
		}
	}
	
	/**
	 * loadStatus
	 * Loads the status with id passed in url 
	 */
	function loadStatus() {
		if ($stateParams.id) {
			Status.get({ 'id': $stateParams.id }, function (response) {
				$scope.status = response;
			}, function (error) {
				toaster.pop("error", "Error", "Could not load the status.");
				console.log(error);
			});
		}
	}
	
	/**
	 * loadUsers
	 * Loads the list of available users 
	 */
	function loadUsers() {
		Friends.query(function (response) {
			$scope.userList = response.data;
		}, function (error) {
			toaster.pop("error", "Error", "Could not load users.");
			console.log(error)
		});
	}
}