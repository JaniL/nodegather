// bot.js
// The bot itself.

// The bot uses node-irc
// https://github.com/martynsmith/node-irc
var irc = require('irc');

var Channel = require('./channel.js');
var Players = require('./players.js');

var bot = function(settings) {
	this.settings = settings;

	this.client = new irc.Client(settings.ircServer, settings.nick, {
		// We want the bot to connect after we've added listeners
		autoConnect: false,

		floodProtection: true,
		// channels: settings.channels.map(function(c) { return c["name"]; }),
	});

	this.channels = [];
	this.players = new Players();
	console.log("Bot initiaited!");

	// Go through the channel list
	// and join them
	this.joinChannels = function() {
		this.channels.forEach(function(c) {
			c.join();
		});
	};

	// Add necessary listeners
	this.addListeners = function() {
		// If some terrible happens, this will take care of
		// notifying about it
		this.client.addListener('error', function(message) {
			console.log('error: ', message);
		});

		var parent = this;
		// "registered" is triggered when the bot has connected
		// to the IRC server.
		// At that point we want to join the channels.
		this.client.on('registered', function(message) {
			console.log("Connected! Joining channels!");
			parent.joinChannels();
		});
	};

	// Will be taken out soon for better implementation.
	this.retrieveChannels = function() {
		var parent = this;
		this.channels.push.apply(this.channels,settings.channels.map(function(c) { return new Channel(parent,c["name"],"6v6"); }));
	};

	// Let's do some necessary magic.
	// Connecting will be done elsewhere,
	// in case someone wants to implement
	// extra magic.
	this.retrieveChannels();
	this.addListeners();
};

/* bot.prototype.addListeners = function() {
	this.client.addListener('error', function(message) {
		console.log('error: ', message);
	});



}; */

// var client = new irc.Client(settings.ircServer, settings.nick);

module.exports = bot;