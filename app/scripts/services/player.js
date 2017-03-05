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

 		refresh: function(data) {
 			this.life = data.life;
			this.bullet = data.bullet;
			this.armor = data.armor;
 		},

 		init: function(callback) {

 			var player = this;

 			socket.on('setPlayerId', function(id) {
 				console.log('setPlayerId: ' + id);
				$cookies.put('playerId', id);
				player.id = id;
				callback();
		    });

 			socket.sendMessage('play');
 		},

 		play: function() {
 			
 		}
 	};    

 	return Player;
 });
