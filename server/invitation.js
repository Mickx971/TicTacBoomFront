const Utils = require('./utils');

function Invitation(id, inviting, invited, gamePool) {
	this.id = id;
	this.inviting = inviting;
	this.invited = invited;
	this.gamePool = gamePool;
}

Invitation.prototype = {
	onAnswer: function(accepted) {
		
		this.gamePool.onInvitationAnswered(this);

		var inv = { 
			id: this.id, 
			inviting: this.inviting, 
			invited: this.invited 
		};
		
		if(accepted) {
			//Utils.sendMessage(inviting, 'invitationAccepted', inv);
			var game = this.gamePool.createGame();
			this.gamePool.addGamePlayer(game, this.inviting);
			this.gamePool.addGamePlayer(game, this.invited);
			game.notifyReady();
		}
		else {
			Utils.sendMessage(this.inviting, 'invitationRefused', inv);	
		}
	},

	isValid: function() {
		return !this.invited.isPlaying() && !this.inviting.isPlaying();
	},

	getOther: function(player) {
		if(this.inviting == player)
			return this.invited;
		if(this.invited == player)
			return this.inviting;
		return undefined;
	}
};

module.exports = Invitation;