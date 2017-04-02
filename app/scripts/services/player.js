'use strict';

/**
 * @ngdoc service
 * @name ticTacBoomFrontApp.Player
 * @description
 * # Player
 * Factory in the ticTacBoomFrontApp.
 */
 angular.module('ticTacBoomFrontApp')
 .factory('Player', function () {
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
			this.actionPlayed = data.actionPlayed;
 		},

 		play: function(action) {
 			this.action = action;
 		}
 	};    

 	return Player;
 });
