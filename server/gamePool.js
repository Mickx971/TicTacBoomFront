const Game = require('./game');
const HashMap = require('hashmap');
const utils = require('./utils');
const Invitation = require('./invitation');

function GamePool() {
	this.games = new HashMap();
	this.invitations = new HashMap();
	this.playerInvitationsMap = new HashMap();
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

	addGamePlayer: function(game, player) {
		game.addPlayer(player);
		this.removeInvitations(player);
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
	},

	sendInvitation: function(inviting, invited) {

		var invitations = this.playerInvitationsMap.get(invited);
		if(invitations) {
			for(let inv of invitations) {
				if(inv.invited == inviting) {
					inv.onAnswer(true);
					return;
				}
			}
		}

		var id = utils.Guid();
		var inv = new Invitation(id, inviting, invited, this);
		this.invitations.set(id, inv);

		this.addPlayerInvitation(inviting, inv);
		this.addPlayerInvitation(invited, inv);

		utils.sendMessage(inviting, 'invitationCreated', { 
			invitation: { 
				id: inv.id, 
				inviting: inv.inviting.id,
				invited: inv.invited.id
			} 
		});
	},

	addPlayerInvitation: function(player, invitation) {
		var invitations = this.playerInvitationsMap.get(player);
		if(!invitations) {
			invitations = new Set();
			this.playerInvitationsMap.set(player, invitations);
		}
		invitations.add(invitation);
	},

	getInvitation: function(id) {
		return this.invitations.get(id);
	},

	removeInvitations: function(player) {

		var invitations = this.playerInvitationsMap.get(player);
		if(invitations) {
			invitations.forEach(inv => {
				this.invitations.remove(inv.id);
				this.removeInvitation(player, inv);
				inv.onAnswer(false);
			});
			invitations.clear();
		} 
	},

	removeInvitation: function(playerBusy, invitation) {
		var other = invitation.getOther(playerBusy);
		var invitations = this.playerInvitationsMap.get(other);
		invitations.delete(invitation);
	},

	onInvitationAnswered: function(invitation) {
		this.invitations.remove(invitation);

		var invitations = this.playerInvitationsMap.get(invitation.inviting);
		if(invitations)
			invitations.delete(invitation);

		invitations = this.playerInvitationsMap.get(invitation.invited);
		if(invitations)
			invitations.delete(invitation);
	}	
};

module.exports = GamePool;