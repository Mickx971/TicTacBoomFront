'use strict';

/**
* @ngdoc function
* @name ticTacBoomFrontApp.controller:PlayCtrl
* @description
* # PlayCtrl
* Controller of the ticTacBoomFrontApp
*/
angular.module('ticTacBoomFrontApp')
.controller('PlayCtrl', function ($scope, $uibModal, $interval, Game) {
	this.awesomeThings = [
	'HTML5 Boilerplate',
	'AngularJS',
	'Karma'
	];

	var modal;

	$scope.game = new Game();

	$scope.sendReplayRequest = function(bool) {
		modal.close();
		$scope.game.sendReplayRequest(bool);
	};

	$scope.roundTimerActivated = true;
	$scope.roundTimer = 0;

	$scope.updateTimer = function() {	
		console.log('interv ' + $scope.roundTimer);
		$scope.roundTimer += 1;
		if ($scope.roundTimer > 100) {
			$scope.game.sendPlayerAction();
			$scope.roundTimer = 0;
		} 
	};

	var launchChrono = function() {
		$scope.chrono = $interval(function() { $scope.updateTimer(); }, 100);
	};

	var stopChrono = function() {
		$interval.cancel($scope.chrono);
	};

	$scope.game.setOnGameEndedCallback(function() {

		stopChrono();

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

	$scope.game.setOnReadyCallback(launchChrono);
	$scope.game.setOnActionSentCallback(stopChrono);
	$scope.game.setOnRoundDoneCallback(launchChrono);	
});
