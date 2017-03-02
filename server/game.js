const HashMap = require('hashmap');
const Player  = require('./player');

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

	ready: function() {
		return this.player1 != null && this.player2 != null;
	},

	addPlayer(playerId) {
		if(!this.player1) {
			this.player1 = new Player(playerId);
		}
		else if(!this.player2) {
			this.player2 = new Player(playerId);	
		}
		else console.log('Error: attempt to add more than 2 players');
	},

	play: function(playerId, actionId, callback) {
		var player = getPlayer(playerId);

		if(player instanceof Error) {
			console.log(player);
			return false;
		}

		if(!player.setAction(this.actions.get(actionId))) {
			console.log('Error: player ' + playerId + ' can not pay action: ' + actionId);
			console.log('Have: ' + player.getNbBullet() + ' and cost: ' + this.actions.get(actionId).cost);
		}

		if(this.player1.havePlayed() && this.player2.havePlayed()) {
			doRound(callback);
		} 

		return true;
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

	getPlayer: function(playerId) {
		if(this.player1.id === playerId)
			return this.player1;
		else if(this.player2.id === playerId)
			return this.player2;
		else return new Error('Unknown user ' + playerId);
	},

	getOther: function(playerId) {
		if(this.player1.id === playerId)
			return this.player2;
		else if(this.player2.id === playerId)
			return this.player1;
		else return new Error('Unknown user ' + playerId);
	}
}

module.exports = Game;