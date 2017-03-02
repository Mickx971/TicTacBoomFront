'use strict';

/**
 * @ngdoc service
 * @name ticTacBoomFrontApp.Player
 * @description
 * # Player
 * Factory in the ticTacBoomFrontApp.
 */
angular.module('ticTacBoomFrontApp')
  .factory('Player', function (socket) {
    function Player(playerData) {
      if(playerData) {
        this.setData(playerData);
      }
      socket.on('game', function(message) {
        alert('gameId: ' + message);
      });
    }

    Player.prototype = {
      setData: function(playerData) {
        angular.extend(this, playerData);
      },

      play: function(cardId) {
        socket.emit('message', cardId);
      }
    };    

    return Player;
  });
