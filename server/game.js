const HashMap = require('hashmap');

function Game(id) {
	this.id = id;
	this.actions = new HashMap();
	this.actions.set(0, {id: 0, name: 'charge', 		cost: -1, selfDamage: 0, damage: 0, armor: 0, damageWhenProtected: 0});
	this.actions.set(1, {id: 1, name: 'defense', 		cost:  0, selfDamage: 0, damage: 0, armor: 1, damageWhenProtected: 0});
	this.actions.set(2, {id: 2, name: 'shot', 			cost:  1, selfDamage: 0, damage: 1, armor: 0, damageWhenProtected: 0});
	this.actions.set(3, {id: 3, name: 'super charge', 	cost: -3, selfDamage: 1, damage: 0, armor: 0, damageWhenProtected: 0});
	this.actions.set(4, {id: 4, name: 'super shot', 	cost:  6, selfDamage: 0, damage: 4, armor: 0, damageWhenProtected: 1});
}

Game.prototype = {

	canAdd: function(player) {
		return ! this.hasPlayer(player) && ! this.isReady();
	},

	hasPlayer: function(player) {
		return this.player1 == player || this.player2 == player;
	},

	isReady: function() {
		return this.player1 != null && this.player2 != null;
	},

	addPlayer: function(player) {
		if(!this.player1 || !this.player2) {
			if(!this.player1) {
				this.player1 = player;
			}
			else if(this.player1.id != player.id) {
				this.player2 = player;
			}
			this.sendGame(player);
		}	
	},

	sendGame: function(player) {
		this.sendMessage(player, 'gameJoined', { 
			gameId: this.id,
			player: player.getData(),
			actions: this.getActions()
	 	});
	},

	notifyReady: function() {
		this._notifyReady(this.player1, this.player2);
		this._notifyReady(this.player2, this.player1);
	},

	_notifyReady: function(p1,p2) {
		this.sendMessage(p1, 'ready', { 
			gameId: this.id,
			adversary: p2.getData(),
	 	});
	},

	refresh: function(player) {
		this.sendMessage(player, 'refresh', {
			gameId: this.id,
			adversary: this.getOther(player).getData(),
			player: player.getData(),
			actions: this.getActions()
		});
	},

	sendMessage: function(player, messageType, messageData) {
		player.sockets.forEach(s => {
			try { 
				s.emit(messageType, messageData);
			}
			catch(err) {
				console.log(err);
			}
		});
	},

	play: function(player, actionId, callback) {

		if(!player.setAction(this.actions.get(actionId))) {
			console.log('Error: player ' + playerId + ' can not pay action: ' + actionId);
			console.log('Have: ' + player.getNbBullet() + ' and cost: ' + this.actions.get(actionId).cost);
		}

		if(this.player1.havePlayed() && this.player2.havePlayed()) {
			doRound(callback);
		} 
	},

	doRound: function(callback) {
		this.player1.payAction();
		this.player2.payAction();
		this.player1.setArmor();
		this.player2.setArmor();
		this.player1.selfDamage();
		this.player2.selfDamage();
		this.player1.attack(player2);
		this.player2.attack(player1);
		this.player1.resetArmor();
		this.player2.resetArmor();

		if(this.player1.isDead() || this.player2.isDead()) {

		}
	},

	getActions: function() {
		return [	
			{id: 0, name: 'Recharger', cost: -1},
	 		{id: 1, name: 'Tirer', cost: 1},
	 		{id: 2, name: 'Se proteger', cost: 0},
	 		{id: 3, name: 'Super recharge', cost: -3},
	 		{id: 4, name: 'Super tir', cost: 5}
		];
	},

	getOther: function(player) {
		if(this.player1 == player)
			return this.player2;
		else if(this.player2 == player)
			return this.player1;
		else return new Error('Unknown user ' + player.id);
	}
}

module.exports = Game;