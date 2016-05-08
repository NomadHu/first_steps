/**
 * Contoller handling the menu buttons
 */
(function() {
	'use strict';
	angular.module('strat').controller('menuCtrl', menuCtrl);
	
	menuCtrl.$inject = ['$scope', 'actionbarState', 'cursorState', 'armyService', 'mapService', 'movementService', 'mapStore'];

	function menuCtrl($scope, actionbarState, cursorState, armyService, mapService, movementService, mapStore) {
		var vm = this;
		
		// Public API	
		vm.mode = '';
		vm.terrain = '';
		vm.markers = {};
		vm.armies = {}; //armyService.armies;
		vm.map = {};
		vm.movements = {}; //movementService.movements;
		//vm.selected = cursorState.selectedObject;
		//vm.hover = cursorState.hoverObject
		//vm.check = check;
		vm.actionbarState = actionbarState;
		vm.cursorState = cursorState;
		
		// Private variables
		activate();

		function activate() {
			armyService.query();
			mapService.query();
			movementService.query();
			updateFromState();
			mapService.map.then(function (map) {
				angular.copy(map, vm.map);
			});
			armyService.armies.then(function (armies) {
				angular.copy(armies, vm.armies);
			});
			movementService.movements.then(function (movements) {
				angular.copy(movements, vm.movements);
			});
		}
		
		function updateFromState() {
			vm.mode = actionbarState.mode;
			vm.terrain = actionbarState.terrain;
			for (var marker in vm.markers) {
				delete vm.markers[marker];
			}
			var stateMarkers = actionbarState.objectsToShow;
			for (var marker in actionbarState.objectsToShow) {
				vm.markers[actionbarState.objectsToShow[marker]] = true;
			}
		}
		
		function syncToState() {
			actionbarState.setMode(vm.mode);
			actionbarState.setTerrain(vm.terrain);
			var objectToShow = [];
			for (var marker in vm.markers) {
				if (vm.markers[marker]) {
					objectToShow.push(marker);
				}
			}
			actionbarState.setObjectsToShow(objectToShow);
		}
/*	
		function check() {
			alert("nocsak");
			var armys = mapService;
			var armyst = mapStore;
			var army = vm.map;
			var x=10;
			x++;
		}
*/
		$scope.$watchCollection('vm.markers', function () {
			syncToState();
			updateFromState();
		});
		$scope.$watch('vm.mode', function () {
			syncToState();
			updateFromState();
		});
		$scope.$watch('vm.terrain', function () {
			syncToState();
			updateFromState();
		});
	}
})();