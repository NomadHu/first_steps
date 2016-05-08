/**
 * Service to read the movement data through the Strat REST API
 */
(function() {
	'use strict';
	angular.module('strat').factory('movementStore', movementStore);
	
	movementStore.$inject = ['$resource', 'armyStore'];
	
	function movementStore($resource, armyStore) {
		var api = getApi();
		
		// Public API
		var movementStore = {
			query: query
		};
		return movementStore;

		// Private variables
		var queryPromise;

		function getApi() {
			return $resource('/js/testdata/movements', null, 
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
			var result = {};
			var rawMovements = angular.fromJson(data);
			for ( var i = 0; i < rawMovements.length ; i++ ) {
				var armyMovement = rawMovements[i];
				var movementList = [];
				var lastPosition = new MapPosition(-1,-1);
				for ( var j = 0; j < rawMovements[i].movements.length ; j++ ) {
					var rawMovement = rawMovements[i].movements[j];
					var newPosition = new MapPosition(rawMovement.to[0], rawMovement.to[1])
					movementList.push(new Movement(rawMovement.id, armyMovement.armyId, lastPosition, newPosition, rawMovement.data));
					lastPosition = newPosition;
				}
				result[armyMovement.armyId] = movementList;
			}
			return result;
		}

/*		
		function transformQuery(data, headers) {
			var result = {};
			var finalTransformer = transformerCreator(data, headers, result);
			armyStore.query().then(finalTransformer);
			return result;
		}
		
		function transformerCreator(data, headers, result) {
			return function(armies) {
				var rawMovements = angular.fromJson(data);
				for ( var i = 0; i < rawMovements.length ; i++ ) {
					var armyMovement = rawMovements[i];
					var army = armies[armyMovement.armyId];
					var movementList = [];
					var lastPosition = army.pos;
					for ( var j = 0; j < rawMovements[i].movements.length ; j++ ) {
						var rawMovement = rawMovements[i].movements[j];
						var newPosition = new MapPosition(rawMovement.to[0], rawMovement.to[1])
						movementList.push(new Movement(rawMovement.id, army.id, lastPosition, newPosition, rawMovement.data));
						lastPosition = newPosition;
					}
					result[army.id] = movementList;
				}
			}
		}
		*/
	}
})()
	