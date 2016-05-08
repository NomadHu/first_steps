/**
 * Service to manipulate and cache army data
 */
(function() {
	'use strict'; 
	angular.module('strat').factory('armyService', armyService);
	
	armyService.$inject = ['armyStore'];

	function armyService(armyStore) {
		// Public API	
		var armyService = {
			armies: {},
			query: query
		}
		return armyService;
		
		// Private variables
		function query() {
			armyService.armies = armyStore.query().then(function (armies) {
				return armies;
			});
		}
	}
})();