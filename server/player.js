
function Player(id, name) {
	this.id = id;
	this.name = name;
	this.sockets = new Set();
	this.reset();
	this.playing = false;
}

Player.prototype = {

	getData: function() {
		return {
			id: this.id,		
			name: this.name,
			life: this.life,
			bullet: this.bullet,
			armor: this.armor,
			actionPlayed: this.action
		};
	},

	addSocket: function(socket) {
		this.sockets.add(socket);
	},

	removeSocket: function(socket) {
		this.sockets.delete(socket);
	},

	isPlaying: function() {
		return this.playing;
	},

	reset: function() {
		this.life = 10;
		this.bullet = 1;
		this.armor = 0;
	},

	isDead: function() {
		if(this.life <= 0)
			return true;
		return false;
	},

	setAction: function(action) {
		if(this.canPayAction(action)) {
			this.action = action;
			return true;
		}
		return false;
	},

	getAction: function() {
		return this.action;
	},

	havePlayed: function() {
		return this.action != undefined;
	},

	setArmor: function() {
		this.armor = this.action.armor;
	},

	onRoundEnded: function() {
		this.armor = 0;
		this.action = undefined;
	},

	haveArmor: function() {
		return this.armor;
	},

	payAction: function() {
		this.bullet -= this.action.cost;
	},

	canPayAction: function(action) {
		if(this.bullet >= action.cost)
			return true;
		return false;
	},

	getNbBullet: function() {
		return this.bullet;
	},

	selfDamage: function() {
		this.life -= this.action.selfDamage;
	},

	addDamage: function(damage) {
		this.life -= damage;
	},

	attack: function(player) {
		if(player.haveArmor())
			player.addDamage(this.action.damageWhenProtected);
		else
			player.addDamage(this.action.damage);
	}
}

module.exports = Player;