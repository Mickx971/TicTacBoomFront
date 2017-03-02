const Utils         = require('./utils');
const Player        = require('./player');
const HashMap       = require('HashMap');

function PlayerPool() {
	this.players = new HashMap();
}

PlayerPool.prototype = {
	getPlayer: function(id) {
		return this.players.get(id);
	},

	createPlayer: function() {
		var id = Utils.Guid();
		var player = new Player(id);
		this.players.set(id, player);
		return player;
	}
};

module.exports = PlayerPool;