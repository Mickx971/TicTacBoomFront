'use strict';

/**
* @ngdoc function
* @name ticTacBoomFrontApp.controller:PlayCtrl
* @description
* # PlayCtrl
* Controller of the ticTacBoomFrontApp
*/
angular.module('ticTacBoomFrontApp')
.controller('PlayCtrl', function ($scope, $uibModal, Game) {
	this.awesomeThings = [
	'HTML5 Boilerplate',
	'AngularJS',
	'Karma'
	];

	var modal;

	$scope.game = new Game();

	$scope.sendReplayRequest = function(bool) {
		modal.close();
		if(bool) {
			
		}
		else {
			
		}
	};

	$scope.game.setOnGameEndedCallback(function() {
		modal = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/replayModal.html',
			scope: $scope,
			controller: function($scope) {
				$scope.onReplayYes = function() {
					$scope.sendReplayRequest(true);
				};

				$scope.onReplayNo = function() {
					$scope.sendReplayRequest(false);
				};
			},
			size: 'sm'
		});

		modal.result.then(function() {}, function () {
			$scope.sendReplayRequest(false);
		});
	});	
});
