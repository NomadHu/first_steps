/**
 * Service manipulate and cache the map data
 */
(function() {
	'use strict'; 
	angular.module('strat').factory('mapService', mapService)
	
	mapService.$inject = ['mapStore'];

	function mapService(mapStore) {
		// Public API
		var mapService = {
			map: {},
			query: query
		}
		return mapService;
		
		// Private variables
		function query() {
			mapService.map = mapStore.query().then(function (map) {
				return map;
			});
		}
	};
})();