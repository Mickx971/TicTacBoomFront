function Player(id) {
	this.id = id;
	this.life = 10;
	this.bullet = 1;
	this.armor = 0;
}

Player.prototype = {
	isDead: function() {
		if(this.life <= 0)
			return true;
		return false;
	},

	setAction: function(action) {
		if(this.canPayAction())
			this.action = action;
		return false;
	},

	getAction: function() {
		return this.action;
	},

	havePlayed: function() {
		return this.action != undefined;
	},

	setArmor: function() {
		this.armor = action.nb;
	},

	resetArmor: function() {
		this.armor = 0;
	},

	haveArmor: function() {
		return this.armor;
	},

	payAction: function() {
		this.bullet -= action.cost;
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
		this.life -= action.selfDamage;
	},

	addDamage: function(damage) {
		this.life += damage;
	},

	attack: function(player) {
		if(player.haveArmor())
			player.addDamage(action.damageWhenProtected);
		else
			player.addDamage(action.damage);
	}
}

exports = Player;