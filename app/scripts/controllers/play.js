'use strict';

/**
* @ngdoc function
* @name ticTacBoomFrontApp.controller:PlayCtrl
* @description
* # PlayCtrl
* Controller of the ticTacBoomFrontApp
*/
angular.module('ticTacBoomFrontApp')
.controller('PlayCtrl', function ($scope, Game) {
	this.awesomeThings = [
	'HTML5 Boilerplate',
	'AngularJS',
	'Karma'
	];

	$scope.game = new Game();

	$scope.game.setOnGameEndedCallback(function() {
		console.log('qsdfq');
		alert('fin de la partie !!');
	});

	// var modal = $uibModal.open({
	// 	animation: true,
	// 	ariaLabelledBy: 'modal-title',
	// 	ariaDescribedBy: 'modal-body',
	// 	templateUrl: 'replayModal.html',
	// 	controller: function($scope) {
 //        	$scope.name = 'top';  
 //      	},
	// 	size: 'sm'
	// });

	// modal.result.then(function (data) {
	// 	console.log(data);	
	// }, function () {
	// 	console.log('Modal dismissed at: ' + new Date());
	// });

});
