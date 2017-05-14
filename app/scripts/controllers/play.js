'use strict';

/**
* @ngdoc function
* @name ticTacBoomFrontApp.controller:PlayCtrl
* @description
* # PlayCtrl
* Controller of the ticTacBoomFrontApp
*/
angular.module('ticTacBoomFrontApp')
.controller('PlayCtrl', function ($scope, $window, $uibModal, $interval, $rootScope, $location, Game) {

	if($rootScope.userConnected) {

		var modal;

		$scope.game = new Game();

		$scope.sendReplayRequest = function(bool) {
			modal.close();
			$scope.game.sendReplayRequest(bool);
		};

		$scope.roundTimerActivated = true;
		$scope.roundTimer = 0;

		$scope.updateTimer = function() {	
			$scope.roundTimer += 1;
			if ($scope.roundTimer > 100) {
				$scope.game.sendPlayerAction();
				$scope.roundTimer = 0;
			} 
		};

		var stopChrono = function() {
			$scope.roundTimer = 0;
			if($scope.chrono !== undefined) {
				$interval.cancel($scope.chrono);
			}
		};

		var launchChrono = function(roundTime, offset) {
			stopChrono();
			$scope.roundTime = roundTime;
			if(offset) {
				var start = Math.floor((((roundTime * 1000) - offset)/(roundTime * 1000))*100);
				$scope.roundTimer = start > 0 ? 100 - start : 90;
			}
			$scope.chrono = $interval(function() { $scope.updateTimer(); }, roundTime * 10);
		};

		$scope.game.setOnGameEndedCallback(function() {

			stopChrono();

			modal = $uibModal.open({
				animation: false,
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

					$scope.onCancel = function() {
						$scope.sendReplayRequest(false);
					};
				},
				size: 'sm'
			});

			modal.result.then(function() {
			}, function () {
				$scope.sendReplayRequest(false);
			});
		});

		$scope.game.setOnReadyCallback(function(roundTime) {
			launchChrono(roundTime);
		});
		$scope.game.setOnActionSentCallback(stopChrono);
		$scope.game.setOnRoundDoneCallback(function(roundTime) {
			launchChrono(roundTime);
		});	
		$scope.game.setOnRefreshCallback(function(roundTime, offset) {
			launchChrono(roundTime, offset);
		});

	}
	else {
		$location.path('/');
	}
});
