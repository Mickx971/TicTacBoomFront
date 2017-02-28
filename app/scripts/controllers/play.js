'use strict';

/**
 * @ngdoc function
 * @name ticTacBoomFrontApp.controller:PlayCtrl
 * @description
 * # PlayCtrl
 * Controller of the ticTacBoomFrontApp
 */
angular.module('ticTacBoomFrontApp')
  .controller('PlayCtrl', function ($rootScope, $scope, Game, Player) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    $rootScope.currentUser = new Player({id: '0', name: 'currentPlayer', nbCard: 0});
    $rootScope.isCurrentUser = function(player) {
    	return this.currentUser.id === player.id;
    };

    $scope.adversaryFilter = function(player) {
    	return !$rootScope.isCurrentUser(player);
    };

    var gameData = {id: '0', name: 'Coucou', players: []};
    $scope.game = new Game(gameData);

	var playersData = [
    	{id: '1', name: 'player1', nbCard: 0}, 
    	{id: '2', name: 'player2', nbCard: 0}, 
    	{id: '3', name: 'player3', nbCard: 0}
    ];

    playersData.forEach(
    	function(player) { 
    		$scope.game.addPlayer(player); 
    	}
	);

	$scope.game.setCurrentPlayer($rootScope.currentUser); 

  });
