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

      setCurrentPlayer: function(p) {
        if(!(p instanceof Player)) {
          p = new Player(p);
        }
        this.player1 = p;
        this.player1.init();
      },

      setAdversary: function(p) {
        if(!(p instanceof Player)) {
          p = new Player(p);
        }
        this.player2 = p;
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
