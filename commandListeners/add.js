var Player = require('../player.js');

module.exports = {
	command: "add",
	callback: function(channel,nick,args) {
		console.log("Adding " + nick + " to pickup");
		var player = channel.bot.players.findOrAdd(nick);
		channel.pickupMode.add(player);
		channel.updateTopic();
	}
};