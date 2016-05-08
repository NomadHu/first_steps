/**
 * Service to manipulate and cache movement data
 */
(function() {
	'use strict'; 
	angular.module('strat').factory('movementService', movementService);
	
	movementService.$inject = ['movementStore', '$q', 'armyStore'];

	function movementService(movementStore, $q, armyStore) {
		// Public API	
		var movementService = {
			movements: {},
			query: query
		}		
		return movementService;
		
		// Private variables
		function query() {
			movementService.movements = movementStore.query().then(function (movements) {
				armyStore.query().then(function (armies) {
					for (var i in movements) {
						if (movements[i][0] instanceof Movement) {
							var army = armies[movements[i][0].armyId];
							movements[i][0].from = army.pos;
						}
					}
				});
				return movements;
			});
		}
	};
})();