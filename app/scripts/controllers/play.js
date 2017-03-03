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

 	// $rootScope.currentUser = new Player({id: '0', name: 'currentPlayer'});
 	// $rootScope.isCurrentUser = function(player) {
 	// 	return this.currentUser.id === player.id;
 	// };

 	// var gameData = {id: '0', name: 'Coucou', actions: [
	 // 	{id: 0, name: 'Recharger', cost: -1},
	 // 	{id: 1, name: 'Tirer', cost: 1},
	 // 	{id: 2, name: 'Se proteger', cost: 0},
	 // 	{id: 3, name: 'Super recharge', cost: -3},
	 // 	{id: 4, name: 'Super tir', cost: 5}]
	// };

	$scope.game = new Game();

});
