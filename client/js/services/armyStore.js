/**
 * Service to read the army data through the Strat REST API
 */
(function() {
	'use strict'; 
	angular.module('strat').factory('armyStore', armyStore);
	
	armyStore.$inject = ['$resource'];
	
	function armyStore($resource) {
		var api = getApi();
	
		// Public API
		var armyStore = {
			query: query
		}
		return armyStore;
		
		// Private variables
		var queryPromise;
		
		function getApi() {
			return $resource('/js/testdata/armies', null, 
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
			var rawArmies = angular.fromJson(data);
			var armies = {};
			for ( var i = 0; i < rawArmies.length ; i++ ) {
				var currentPosition = new MapPosition(rawArmies[i].pos[0], rawArmies[i].pos[1]);
				var army = new Army(rawArmies[i].id, currentPosition, rawArmies[i].data);
				armies[army.id]=army;
			}
			return armies;
		}
	};
})();