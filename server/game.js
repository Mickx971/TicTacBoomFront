const HashMap = require('hashmap');
const Utils = require('./utils');

function Game(id) {
	this.id = id;
	this.roundTime = 2;
	this.actions = new HashMap();
	this.actions.set(-1, {id: -1, name: 'Wait', 		cost: 0, selfDamage: 0, damage: 0, armor: 0, damageWhenProtected: 0});
	this.actions.set(0, {id: 0, name: 'Recharger', 		cost: -1, selfDamage: 0, damage: 0, armor: 0, damageWhenProtected: 0});
	this.actions.set(1, {id: 1, name: 'Tirer', 			cost:  1, selfDamage: 0, damage: 1, armor: 0, damageWhenProtected: 0});
	this.actions.set(2, {id: 2, name: 'Se proteger', 	cost:  0, selfDamage: 0, damage: 0, armor: 1, damageWhenProtected: 0});
	this.actions.set(3, {id: 3, name: 'Super recharge', cost: -3, selfDamage: 1, damage: 0, armor: 0, damageWhenProtected: 0});
	this.actions.set(4, {id: 4, name: 'Super tir', 		cost:  6, selfDamage: 0, damage: 4, armor: 0, damageWhenProtected: 1});
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
				this.player1.playing = true;
			}
			else if(this.player1.id != player.id) {
				this.player2 = player;
				this.player2.playing = true;
			}
			this.sendGame(player);
			console.log('Played added: ' + player.id + ' Game: ' + this.id);
		}	
	},

	sendGame: function(player) {
		Utils.sendMessage(player, 'gameJoined', { 
			gameId: this.id,
			player: player.getData(),
			actions: this.getActions()
	 	});
	},

	notifyReady: function() {
		this.lastRound = new Date();
		this._notifyReady(this.player1, this.player2);
		this._notifyReady(this.player2, this.player1);
	},

	_notifyReady: function(p1,p2) {
		Utils.sendMessage(p1, 'ready', { 
			gameId: this.id,
			adversary: p2.getData(),
			timestamp: this.lastRound,
			roundTime: this.roundTime
	 	});
	},

	pushRound: function() {
		this.lastRound = new Date();
		this.refresh(this.player1, 'round');
		this.refresh(this.player2, 'round');
	},

	refresh: function(player, messageType) {
		messageType = messageType || 'refresh';
		var adversary = this.getOther(player);
		Utils.sendMessage(player, messageType, {
			gameId: this.id,
			adversary: adversary ? adversary.getData() : undefined,
			player: player.getData(),
			actions: this.getActions(),
			timestamp: this.lastRound,
			roundTime: this.roundTime
		});
	},

	play: function(player, actionId, callback) {

		if(!player.setAction(this.actions.get(actionId))) {
			console.log('Error: player ' + player.id + ' can not pay action: ' + actionId);
			console.log('Have: ' + player.getNbBullet() + ' and cost: ' + this.actions.get(actionId).cost);
		}

		if(this.player1.havePlayed() && this.player2.havePlayed()) {
			this.doRound(callback);
		}
	},

	doRound: function(callback) {
		this.player1.payAction();
		this.player2.payAction();
		this.player1.setArmor();
		this.player2.setArmor();
		this.player1.selfDamage();
		this.player2.selfDamage();
		this.player1.attack(this.player2);
		this.player2.attack(this.player1);

		this.pushRound();

		this.player1.onRoundEnded();
		this.player2.onRoundEnded();

		if(this.player1.isDead() || this.player2.isDead())
			this.onGameEnded(callback);
	},

	onGameEnded: function(callback) {
		this.score1 = { player: this.player1.email, life: this.player1.life, bullet: this.player1.bullet };
		this.score2 = { player: this.player2.email, life: this.player2.life, bullet: this.player2.bullet };

		this.player1.reset();
		this.player2.reset();

		Utils.sendMessage(this.player1, 'end', { gameId: this.id });
		Utils.sendMessage(this.player2, 'end', { gameId: this.id });

		if(!this.player1.isDead() || !this.player2.isDead()) {
			var winner = this.player1.isDead() ? this.player2 : this.player1;
			callback(this, winner);
		}
		else callback(this);

		this.player1.playing = false;
		this.player2.playing = false;
	},

	getActions: function() {
		return this.actions.values();
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