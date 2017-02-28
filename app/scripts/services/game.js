'use strict';

/**
 * @ngdoc service
 * @name ticTacBoomFrontApp.Game
 * @description
 * # Game
 * Factory in the ticTacBoomFrontApp.
 */
angular.module('ticTacBoomFrontApp')
  .factory('Game', function (Player) {
    function Game(gameData) {
        if (gameData) {
            this.setData(gameData);
        }
    }

    Game.prototype = {
      
      setData: function(gameData) {
        angular.extend(this, gameData);
      },

      setCurrentPlayer: function(player) {
        this.addPlayer(player);
        this.currentPlayer = player;
      },

      addPlayer: function(p) {
        if(!(p instanceof Player)) {
          p = new Player(p);
        }
        this.players.push(p);
      },

      removePlayer: function(playerData) {
        var removeIndex = this.players.map(function(item) { return item.id; })
          .indexOf(playerData.id);
        if(removeIndex >= 0) {
          this.players.splice(removeIndex, 1);
        }
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
