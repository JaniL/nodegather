var Base = function(commandListener) {
	// default values for pickup mode
	this.playerCount = 12;
	this.players = [];
	if (commandListener) {
		this.commandListener = commandListener;
	} else {
		this.commandListener = null;
	}


};

Base.prototype.addListeners = function() {
	this.commandListener.addCommand('add');
	this.commandListener.addCommand('remove');
	// this.commandListener.addCommand('votemap');
};

Base.prototype.isFull = function() {
	return this.players.length == this.playerCount;
};

Base.prototype.add = function(player) {
	if (this.players.indexOf(player) == -1) {
		this.players.push(player);
	}

	if (this.isFull) {
		// emit "startCountdown"
	}
};

Base.prototype.remove = function(player) {
	if (this.players.indexOf(player) != -1) {
		this.players.pop(player);
	}
};

Base.prototype.clear = function() {
	this.players = [];
};

Base.prototype.formatTopic = function() {
	console.log(this.players);
	return this.players.length + "/" + this.playerCount + " " + this.players.map(function(p) { return p.name; }).toString();
};

module.exports = Base;