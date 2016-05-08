/**
 * Service to contain the selection data
 */
(function() {
	'use strict'; 
	angular.module('strat').factory('cursorState', cursorState);
	
	function cursorState() {
		// Public API	
		var cursorState = {
			selectedMapPosition: undefined,
			selectedWindowPosition: undefined,
			selectedObject: undefined,
			selectionMode: undefined,

			hoverMapPosition: undefined,
			hoverWindowPosition: undefined,
			hoverObject: undefined,
			
			select: select,
			hover: hover,
			clearSelected: clearSelected,
			clearHover: clearHover
		}		
		return cursorState;
		
		// Private variables
		function select(mapPosition, windowPosition, object, selectionMode) {
			cursorState.selectedMapPosition = mapPosition;
			cursorState.selectedWindowPosition = windowPosition;
			cursorState.selectedObject = object;
			cursorState.selectionMode = selectionMode;
		}

		function hover(mapPosition, windowPosition, object) {
			cursorState.hoverMapPosition = mapPosition;
			cursorState.hoverWindowPosition = windowPosition;
			cursorState.hoverObject = object;
		}
		
		function clearSelected() {
			cursorState.selectedMapPosition = undefined;
			cursorState.selectedWindowPosition = undefined;
			cursorState.selectedObject = undefined;
			cursorState.selectionMode = undefined;
		}
		
		function clearHover() {
			cursorState.hoverMapPosition = undefined;
			cursorState.hoverWindowPosition = undefined;
			cursorState.hoverObject = undefined;
		}
	};
})();