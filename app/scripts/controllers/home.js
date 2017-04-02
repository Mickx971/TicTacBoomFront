'use strict';

/**
 * @ngdoc function
 * @name ticTacBoomFrontApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the ticTacBoomFrontApp
 */
angular.module('ticTacBoomFrontApp')
  .controller('HomeCtrl', function($rootScope, $scope, $interval, $location, $cookies, $http, $uibModal, Config, socket) {

  	var refreshPlayers = function() {
	  	$http({
			method: 'GET',
			url: Config.serverBase + '/players'
		}).then(function successCallback(response) {
			var players = response.data;
			$scope.players = [];
			for (var i = players.length - 1; i >= 0; i--) {
				if(players[i].id !== $rootScope.currentUserId) {
					$scope.players.push(players[i]);
				}
			}
		}, function errorCallback(response) {
			console.log('Error: ' + response);
		});
	};

	refreshPlayers();

  	$interval(refreshPlayers, 5000);

  	socket.on('invitationReceived', function(data) {

  		var modal;

  		var onResponse = function(accepted) {
  			modal.close();
  			data.invitation.answer = accepted;
			socket.sendMessage('invitationAnswer', data);
  		};

  		modal = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/invitationModal.html',
			scope: $scope,
			controller: function($scope) {

				$scope.adversary = data.invitation.inviting;

				$scope.onReplayYes = function() {
					onResponse(true);
				};

				$scope.onReplayNo = function() {
					onResponse(false);
				};

				$scope.onCancel = function() {
					onResponse(false);
				};
			},
			size: 'sm'
		});
		modal.result.then(function() {}, function () {
			onResponse(false);
		});
  	});
  	
  	$scope.randomAdversary = function() {
  		$cookies.remove('gameId');
  		$location.path('/play');
  	};

  	$scope.sendInvitation = function(playerId) {
  		socket.sendMessage('invitation', {invited: playerId});

  		socket.on('invitationRefused', function() {
  			console.log('invitation refused');
  		});

		socket.on('gameJoined', function(gameData) {
			$cookies.put('gameId', gameData.gameId);
			$location.path('/play');
		}) ; 		
  	};


  	if(!$rootScope.userConnected) {
  		$rootScope.onConnectionAction();
  	}
  
  });
