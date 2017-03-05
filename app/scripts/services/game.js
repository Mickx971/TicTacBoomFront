'use strict';

/**
 * @ngdoc service
 * @name ticTacBoomFrontApp.Game
 * @description
 * # Game
 * Factory in the ticTacBoomFrontApp.
 */
 angular.module('ticTacBoomFrontApp')
 .factory('Game', function (Player, $cookies, socket) {
 	function Game() {
 		this.init();
 	}

 	Game.prototype = {

 		init: function() {

 			this.player1 = new Player();

 			this.player1.init(function() {
 				socket.sendMessage('searchGame', { gameId: $cookies.get('gameId') });
 			});

 			var game = this;

 			var doRefresh = function(gameData) {
 				if(game.id === gameData.id) {

 					game.actions = gameData.actions;

 					if(!game.adversary) {
 						game.adversary = new Player(gameData.adversary);
 					}
 					else {
 						game.adversary.refresh(gameData.adversary);
 					}

 					game.player1.refresh(gameData.player);
 				}
 			};

 			socket.on('gameJoined', function(gameData) {
 				game.id = gameData.gameId;
 				game.actions = gameData.actions;
 				game.player1.refresh(gameData.player);
 				$cookies.put('gameId', game.id);
 			});

 			socket.on('ready', doRefresh);
 			socket.on('refresh', doRefresh);
 		},

 		startGame: function() {

 		},

 		closeGame: function() {

 		},

 		takeCard: function() {

 		}
 	};

 	return Game;
 });
