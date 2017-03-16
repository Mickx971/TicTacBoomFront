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

 			this.player = new Player();

 			this.player.init(function() {
 				socket.sendMessage('searchGame', { gameId: $cookies.get('gameId') });
 			});

 			var game = this;

 			var doRefresh = function(gameData) {
 				if(game.id === gameData.gameId) {

 					if(gameData.actions !== undefined) {
 						game.actions = gameData.actions;
 					}

 					if(!game.adversary) {
 						game.adversary = new Player(gameData.adversary);
 					}
 					else {
 						game.adversary.refresh(gameData.adversary);
 					}

 					if(gameData.player) {
 						game.player.refresh(gameData.player);
 					}
 				}
 			};

 			socket.on('gameJoined', function(gameData) {
 				console.log('joined');
 				game.id = gameData.gameId;
 				game.actions = gameData.actions;
 				game.player.refresh(gameData.player);
 				$cookies.put('gameId', game.id);
 			});

 			socket.on('ready', function(gameData) {
 				console.log('ready');
 				doRefresh(gameData);
 				game.player.action = undefined;
 				game.onReadyCallback();
 			});

 			socket.on('refresh', function(gameData) {
 				console.log('refresh');
 				game.id = gameData.gameId;
 				doRefresh(gameData);
 			});

 			socket.on('round', function(gameData) {
 				console.log('round');
 				doRefresh(gameData);
 				game.player.action = undefined;
 				game.onRoundCallback();
 			});

 			socket.on('end', function() {
 				if(game.onGameEndedCallback) {
 					game.onGameEndedCallback();
 				}
 			});

 			socket.on('invitationCreated', function() {

 			});
 		},

 		setOnGameEndedCallback: function(callback) {
 			this.onGameEndedCallback = callback;
 		},

 		setOnReadyCallback: function(callback) {
 			this.onReadyCallback = callback;
 		},

 		setOnActionSentCallback: function(callback) {
 			this.onActionSentCallback = callback;
 		},

 		setOnRoundDoneCallback: function(callback) {
 			this.onRoundCallback = callback;
 		},

		sendReplayRequest: function(bool) {
			if(bool) {
				socket.sendMessage('invitation', {invited: this.adversary.id});				
			}
		},

		sendPlayerAction: function() {
			var action = typeof this.player.action !== 'undefined' ? this.player.action : -1;
			socket.sendMessage('action', { gameId: this.id, actionId: action});
			this.onActionSentCallback();
		},

 		closeGame: function() {

 		}
 	};

 	return Game;
 });
