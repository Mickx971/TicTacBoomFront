const Utils         = require('./utils');
const Player        = require('./player');
const HashMap       = require('HashMap');

function PlayerPool() {
	this.players = new HashMap();
	this.socketMap = new HashMap();
}

PlayerPool.prototype = {
	getPlayer: function(id, socket) {
		var player = this.players.get(id);
		if(player && socket) {
		    player.addSocket(socket);
		}
		return player;
	},

	createPlayer: function(name) {
		var id = Utils.Guid();
		var player = new Player(id, name);
		this.players.set(id, player);
		console.log('User created: ' + id);
		return player;
	},

	addPlayerSocket: function(player, socket) {
		this.socketMap.set(socket, player);
		if(socket)
			player.addSocket(socket);
	},

	removePlayer: function(player) {
		this.players.remove(player.id);
		player.sockets.forEach( s => {
			this.socketMap.remove(s);
		});
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