angular.module(Config.applicationModuleName).factory('Friends', Friends);

Friends.$inject = ['$resource', 'Backand'];

/**
 * Friends
 * Resource reference from api Friends object 
 */
function Friends($resource, Backand) {
	return $resource(Backand.getApiUrl() + ':443/1/objects/friends/:id', {
		id: '@id'
	}, {
		update: {method: 'PUT'},
		get: {method: 'GET'},
		remove: {method:'DELETE'},
		query: {method:'GET'},
		save: {method:'POST'}
	});
};