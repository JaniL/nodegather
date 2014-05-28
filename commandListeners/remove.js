module.exports = {
	command: "remove",
	callback: function(channel,nick,args) {
		console.log("Removing " + nick + " from the pickup");
		var player = channel.bot.players.getNick(nick);
		channel.pickupMode.remove(player);
		channel.updateTopic();
	}
};