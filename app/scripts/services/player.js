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

      addCard: function() {

      }
    };    

    return Player;
  });
