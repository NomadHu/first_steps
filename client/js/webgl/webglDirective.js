/**
 * Directive displaying webGL view
 */
(function() {
	'use strict';
	angular.module('strat').directive('webglDirective', webglDirective);
	
	function webglDirective() {
//StratApp.directive('webGlView', function ($uibPosition, $templateCache) {
		var webglDirective = {
			link: postLink,
			template: '',
			restrict: 'EA',
			controller: 'webglCtrl',
			controllerAs: 'vm',
			bindToController: true
		};
		return webglDirective;

		function postLink(scope, element, attrs) {	  
			var stratScene = new StratScene();
			var contW = (attrs["fillContainer"]) ? element[0].clientWidth : attrs["width"];
			var contH = attrs["height"];

			scope.init = function () {
				stratScene.init(contW, contH, element[0]);
		  
				element[0].addEventListener( 'mousemove', scope.onMouseMove, false );
				element[0].addEventListener( 'mousedown', scope.onMouseDown, false );
				window.addEventListener( 'resize', scope.onWindowResize, false );
			};

			// -----------------------------------
			// Event listeners
			// -----------------------------------
			scope.onWindowResize = function () {
				scope.resizeCanvas();
			};

			scope.onMouseMove = function ( event ) {
				var hoverObject = stratScene.moveCursor(event.offsetX, event.offsetY, ['Army','Movement','Terrain']);
				scope.vm.hover(hoverObject, event);
//				scope.$apply();
			};
		
			scope.onMouseDown = function ( event ) {
				var selectedObject = stratScene.selectedObject(event.offsetX, event.offsetY, scope.vm.typesToCheck);
				scope.vm.select(selectedObject, event);
//				scope.popupPositionX = event.offsetX;
//				scope.popupPositionY = event.offsetY;
//				scope.$apply();
//				console.log("Selected " + selectedObject);		  
			};

			// -----------------------------------
			// Updates
			// -----------------------------------
			scope.resizeCanvas = function () {
				contW = (attrs["fillContainer"]) ? element[0].clientWidth : attrs["width"],
				contH = attrs["height"];

				stratScene.resizeCanvas(contW, contH);
			};
        
			scope.refreshMap = function () {
				if (!isEmpty(scope.vm.map)) {
					stratScene.refreshMap(scope.vm.map, attrs["heightStretch"], attrs["widthStretch"], attrs["viewWidth"], attrs["viewDepth"]);
					console.log("Map refreshed");
					if (!isEmpty(scope.vm.armies)) {
						scope.refreshArmies();
					}
					if (!isEmpty(scope.vm.movements)) {
						scope.refreshMovements();
					}
				}
			};

			scope.refreshArmies = function () {
				if (!isEmpty(scope.vm.armies) && !isEmpty(scope.vm.map)) {
					stratScene.refreshArmies(scope.vm.armies);
					console.log("Armies refreshed");
				}
			};

			scope.refreshMovements = function () {
				if (!isEmpty(scope.vm.movements) && !isEmpty(scope.vm.map)) {
					stratScene.refreshMovements(scope.vm.movements);
					console.log("Movements refreshed");
				}
			};

			// -----------------------------------
			// Draw and Animate
			// -----------------------------------
			scope.animate = function () {
				requestAnimationFrame( scope.animate );
				scope.render();
			};

			scope.render = function () {
				stratScene.render();
			};

			// -----------------------------------
			// Watches
			// -----------------------------------
			scope.$watch('vm.map', function () {
				scope.refreshMap();
			});

			scope.$watch('vm.armies', function () {
				scope.refreshArmies();
			}, true);

			scope.$watch('vm.movements', function () {
				scope.refreshMovements();
			}, true);
	
			// Begin
			scope.init();
			scope.animate();
		}
    };
})();

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

