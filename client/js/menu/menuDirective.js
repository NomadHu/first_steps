/**
 * Directive displaying menu buttons
 */
(function() {
	'use strict';
	angular.module('strat').directive('menuDirective', menuDirective);
	
	function menuDirective() {
		var menuDirective = {
			templateUrl: '/js/menu/menu.html',
			restrict: 'E',
			controller: 'menuCtrl',
			controllerAs: 'vm',
			bindToController: true
		};
		return menuDirective;

		function link(scope, element, attrs) {
			console.log("Mi van?");
			/* */
		}
	}	
})();