/**
 * Service to read the map data through the Strat REST API
 */
(function() {
	'use strict';
	angular.module('strat').factory('mapStore', mapStore);
	
	mapStore.$inject = ['$resource'];
	
	function mapStore($resource) {
		var api = getApi();
	
		// Public API
		var armyStore = {
			query: query
		}
		return armyStore;
		
		// Private variables
		var queryPromise;
		
		function getApi() {
			return $resource('/js/testdata/map', null,
				{
					query: { 
						method:'GET', 
						transformResponse: transformQuery
					}
				}
			)
		}
		
		function query() {
			if (!queryPromise) {
				queryPromise = api.query(function (resp) {
				}).$promise;
			}
			return queryPromise;
		}
		
		function transformQuery(data, headers) {
			var rawMap = angular.fromJson(data);
			return new Map(rawMap.sizex, rawMap.sizey, rawMap.height, rawMap.color);
		}
	};
})();