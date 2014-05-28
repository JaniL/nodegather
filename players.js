// players.js
// I keep a list of players that I've discovered on IRC.

// We'll need this when we add people to the list.
var Player = require('./player.js');

var Players = function() {
	this.players = [];

	// Checks if there's a player with given nick.
	// Return true if found, else false.
	this.playerExists = function(nick) {
		this.players.forEach(function(p) {
			if (p.name == nick) {
				return true;
			}
		});
		return false;
	};

	// Returns the player object with given nick.
	// If object isn't found, return false.
	this.getNick = function(nick) {
		this.players.forEach(function(p) {
			if (p.name == nick) {
				return p;
			}
		});
		return null;
	};

	// Returns the player object with given qauth.
	// If object isn't found, return false.
	this.getQAuth = function(qauth) {
		this.players.forEach(function(p) {
			if (p.qauth == qauth) {
				return p;
			}
		});
		return null;
	};

	// Creates a Player object with given nick and pushes it to this.players
	this.add = function(nick) {
		this.players.push(new Player(nick));
	};

	// Returns the Player object with given nick. If the object isn't found,
	// a Player object with given nick will be added to this.players and
	// returned.
	this.findOrAdd = function(nick) {
		var player = this.getNick(nick);
		if (player !== null) {
			console.log(player);
		} else {
			player = new Player(nick);
			this.add(player);
		}
		return player;
	};

	// Removes the player with given nick from the list.
	this.removeByNick = function(nick) {
		for (var i = this.players.length - 1; i >= 0; i--) {
			if (this.players[i].nick == nick) {
				this.players.splice(i,1);
				return true;
			}
		}
		return false;
	};

	// Removes the player with given qauth from the list.
	this.removeByQAuth = function(qauth) {
		for (var i = this.players.length - 1; i >= 0; i--) {
			if (this.players[i].qauth == qauth) {
				this.players.splice(i,1);
				return true;
			}
		}
		return false;
	};

};

module.exports = Players;