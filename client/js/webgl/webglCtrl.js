/**
 * Contoller handling the webGL editing
 */
(function() {
	'use strict';
	angular.module('strat').controller('webglCtrl', webglCtrl);
	
	webglCtrl.$inject = ['$scope', 'actionbarState', 'cursorState', 'armyService', 'mapService', 'movementService'];
	
	function webglCtrl($scope, actionbarState, cursorState, armyService, mapService, movementService) {
		var vm = this;
		// Public API	
		vm.map = {};//mapService.map;
		vm.armies = {};//armyService.armies;
		vm.movements = {};//movementService.movements;
		vm.typesToCheck = ['Army','Movement','Terrain'];
		vm.select = select;
		vm.hover = hover;

		// Private variables
		activate();

		function activate() {
			armyService.query();
			mapService.query();
			movementService.query();
			mapService.map.then(function (map) {
				vm.map = new Map(map.sizex, map.sizey, map.height, map.color);
			});
			armyService.armies.then(function (armies) {
				angular.copy(armies, vm.armies);
			});
			movementService.movements.then(function (movements) {
				angular.copy(movements, vm.movements);
			});
		}
		
		function select(selectedObject, event) {
			if (!selectedObject) {
				cursorState.clearSelected();
			} else if (selectedObject instanceof MapPosition) {
				cursorState.select(selectedObject,[event.offsetX, event.offsetY],undefined, event.button);
			} else if (selectedObject instanceof Army){
				cursorState.select(selectedObject.pos,[event.offsetX, event.offsetY],selectedObject, event.button);
			} else if (selectedObject instanceof Movement){
				cursorState.select(selectedObject.to,[event.offsetX, event.offsetY],selectedObject, event.button);
			} else {
				console.log("Unknown Selected object: " + selectedObject);
			}
			console.log("Selected " + selectedObject);
			$scope.$apply();
		}
		
		function hover(hoverObject, event) {
			if (!hoverObject) {
				cursorState.clearHover();
			} else if (hoverObject instanceof MapPosition) {
				cursorState.hover(hoverObject,[event.offsetX, event.offsetY],undefined);
			} else if (hoverObject instanceof Army){
				cursorState.hover(hoverObject.pos,[event.offsetX, event.offsetY],hoverObject);
			} else if (hoverObject instanceof Movement){
				cursorState.hover(hoverObject.to,[event.offsetX, event.offsetY],hoverObject);
			} else {
				console.log("Unknown Hover object: " + hoverObject);
			}
			$scope.$apply();
		}
	}

/*		
  $scope.selectedObject;
  $scope.lastSelectedArmy;
  $scope.selectionMode;
  $scope.hoverObject;
  $scope.typesToCheck = ['Army','Movement','Terrain'];
  $scope.popupPositionX;
  $scope.popupPositionY;
  $scope.armyPopupOpen = false;
  $scope.buildingPopupOpen = false;
  $scope.movementPopupOpen = false;
  
  // -----------------------------------
  // Watches
  // -----------------------------------
  $scope.$watch('selectedObject', function () {
	$scope.armyPopupOpen = false;
	$scope.buildingPopupOpen = false;
	$scope.movementPopupOpen = false;
    if ($scope.selectedObject) {
      switch($scope.$parent.mode)  {
        case 'View':
		  if ($scope.selectedObject instanceof Army) {
			$scope.armyPopupOpen = true;
		  } else if ($scope.selectedObject instanceof Movement) {
			$scope.movementPopupOpen = true;
		  }
          break;
        case 'Add':
		  $scope.lastSelectedArmy.addMovement($scope.selectedObject);
          break;
        case 'Delete':
		  $scope.selectedObject.remove();
		  $scope.selectedObject = undefined;	  
          break;
        default:
          console.log("Unknown mode: "+$scope.$parent.mode);
      }
    }
  });
  
  $scope.$watch('mode', function () {
    switch($scope.$parent.mode)  {
      case 'View':
        $scope.typesToCheck = ['Army','Movement'];
        break;
      case 'Add':
        $scope.typesToCheck = ['Terrain'];
        break;
      case 'Delete':
        $scope.typesToCheck = ['Army','Movement'];
        break;
      default:
        console.log("Unknown mode: "+$scope.$parent.mode);
    }
  });
  
  $scope.startAdd = function () {
    if ($scope.selectedObject instanceof Army) {
	  $scope.lastSelectedArmy = $scope.selectedObject;
	  $scope.lastSelectedArmy.removeMovements();
	} else {
	  if ($scope.selectedObject.next) {
	    $scope.selectedObject.getNext().remove();
	  }
	  $scope.lastSelectedArmy = $scope.selectedObject.getArmy();
	}
	$scope.$parent.mode = 'Add';
	$scope.armyPopupOpen = false;
	$scope.buildingPopupOpen = false;
	$scope.movementPopupOpen = false;	
  }*/
})();
