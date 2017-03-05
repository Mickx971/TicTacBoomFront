const Utils         = require('./utils');
const Player        = require('./player');
const HashMap       = require('HashMap');

function PlayerPool() {
	this.players = new HashMap();
	this.socketMap = new HashMap();
}

PlayerPool.prototype = {
	getPlayer: function(id) {
		return this.players.get(id);
	},

	createPlayer: function(socket) {
		var id = Utils.Guid();
		var player = new Player(id, socket);
		this.players.set(id, player);
		console.log('User created: ' + id);
		return player;
	},

	getOrCreatePlayer: function(id, socket) {
		var player;
		if(!(player = this.getPlayer(id))) {
            player = this.createPlayer(socket);
        }
        return player;
	},

	addPlayerSocket: function(player, socket) {
		this.socketMap.set(socket, player);
		player.addSocket(socket);
	},

	removeSocket: function(socket) {
		var player = this.socketMap.get(socket);
		if(player) {
			player.removeSocket(socket);
			this.socketMap.remove(socket);
		}
	}
};

module.exports = PlayerPool;