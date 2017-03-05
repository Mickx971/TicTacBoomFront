const Game = require('./game');
const HashMap = require('hashmap');
const utils = require('./utils');

function GamePool() {
	this.games = new HashMap();
}

GamePool.prototype = {
	
	createGame: function() {
		var id = utils.Guid();
		var game = new Game(id);
		this.games.set(id, game);
		return game;
	},

	getFreeGame: function() {
		for (var game of this.games.values()) {
		    if(!game.isReady())
		    	return game;
		}
		return this.createGame();
	},

	saveGame: function(game, winner) {
		/* do save */
	},

	onGameFinished: function(game, winner) {
		this.saveGame(game, winner);
		this.games.remove(game.id);
	},

	getGame: function(gameId) {
		return this.games.get(gameId);
	}	
};

module.exports = GamePool;