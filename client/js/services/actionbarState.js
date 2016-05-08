/**
 * Service to contain the selection data
 */
(function() {
	'use strict'; 
	angular.module('strat').factory('actionbarState', actionbarState);
	
	actionbarState.$inject = ['cursorState'];
	
	function actionbarState(cursorState) {
		// Public API	
		var actionbarState = {
			mode: 'view',
			terrain: 'height',
			objectsToShow: ['armies', 'movements', 'buildings'],
			
			setMode: setMode,
			setTerrain: setTerrain,
			setObjectsToShow: setObjectsToShow
		}		
		return actionbarState;
		
		// Private variables
		
		// Set mode to add, only if an object already selected
		function setMode(mode) {
			if (cursorState.selectedObject || mode!=='add') {
				actionbarState.mode = mode;
			} else if (!cursorState.selectedObject && mode==='add') {
				actionbarState.view;
			}
		}
		
		function setTerrain(terrain) {
			actionbarState.terrain = terrain;
		}

		// Show movements only if armies are shown
		function setObjectsToShow(objectsToShow) {
			actionbarState.objectsToShow = [];
			if (objectsToShow.indexOf('armies')!=-1) {
				actionbarState.objectsToShow.push('armies');
				if (objectsToShow.indexOf('movements')!=-1) {
					actionbarState.objectsToShow.push('movements');
				}
			}
			if (objectsToShow.indexOf('buildings')!=-1) {
				actionbarState.objectsToShow.push('buildings');
			}
		}
	};
})();