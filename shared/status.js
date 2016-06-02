angular.module(Config.applicationModuleName).factory('Status', Status);

Status.$inject = ['$resource', 'Backand'];

/**
 * Status
 * Resource reference from api Status object 
 */
function Status($resource, Backand) {
	return $resource(Backand.getApiUrl() + '/1/objects/status/:id', {
		id: '@id'
	}, {
		update: {method: 'PUT'},
		get: {method: 'GET'},
		remove: {method:'DELETE'},
		query: {method:'GET'},
		save: {method: 'POST'}
	});
};