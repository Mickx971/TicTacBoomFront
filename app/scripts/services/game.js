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
          socket.sendMessage('searchGame', {gameId: $cookies.get('gameId')});
        });

        var game = this;

        socket.on('ready', function(gameData) {
          game.id = gameData.gameId;
          game.actions = gameData.actions;
          game.player2 = new Player(gameData.adversary);
          $cookies.put('gameId', game.id);
        });
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
