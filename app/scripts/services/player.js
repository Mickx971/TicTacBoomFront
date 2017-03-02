'use strict';

/**
 * @ngdoc service
 * @name ticTacBoomFrontApp.Player
 * @description
 * # Player
 * Factory in the ticTacBoomFrontApp.
 */
 angular.module('ticTacBoomFrontApp')
 .factory('Player', function ($cookies, socket) {
 	function Player(playerData) {
 		if(playerData) {
 			this.setData(playerData);
 		}
 	}

 	Player.prototype = {
 		
		setData: function(playerData) {
 			angular.extend(this, playerData);
 		},

 		init: function() {

 			socket.on('setPlayerId', function(id) {
				$cookies.put('playerId', id);
		    });

 			this.sendMessage('play');
 		},

 		play: function() {
 			
 		},

 		sendMessage: function(messageType, message) {
 			if(!message) {
 				message = {};
 			}
 			message.id = $cookies.get('playerId');
 			socket.emit(messageType, message);
 		}
 	};    

 	return Player;
 });
