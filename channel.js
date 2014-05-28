// channel.js
// I take care of things related to channels itself.
// Saying things, updating the topic. #justircthings

var sixVersusSix = require('./pickupModes/sixVersusSix.js');
var CommandListener = require('./commandListener.js');

var Channel = function(bot,name,pickupMode) {
	this.bot = bot;
	this.name = name;
	// this.pickupMode = pickupMode;
	this.commandListener = new CommandListener(this);
	this.pickupMode = new sixVersusSix(this.commandListener);

	// Commands the bot to join to the channel
	this.join = function() {
		console.log("Joining to channel " + this.name);
		var parent = this;
		this.bot.client.join(name, function() {
			parent.updateTopic();
		});
		// this.bot.send("JOIN",name);
	};

	// Commands the bot to say something at the channel
	this.say = function(message) {
		this.bot.client.say(name,message);
	};

	// Updates the channels topic with formatTopic()
	this.updateTopic = function() {
		this.bot.client.send('TOPIC',this.name,this.formatTopic());
	};

	// Formats the topic
	this.formatTopic = function() {
		return this.pickupMode.formatTopic();
	};

	// Adds the necessary listeners
	this.addListeners = function() {
		var parent = this;

		// Listens for message in channel and sends them to CommandListener
		bot.client.on("message" + this.name, function(nick,text,message) {
			parent.commandListener.receiveMessage(nick,text);
		});

		// Remove player from pickup if kicked
		bot.client.on("kick" + this.name, function(nick,by,reason,message) {
			this.pickupMode.remove(nick);
		});

		// Remove player from pickup if parted from the channel
		bot.client.on("part" + this.name, function(nick,reason,message) {
			this.pickupMode.remove(nick);
		});


		// Remove player from pickup if quits
		bot.client.on("quit", function(nick,reason,channels,message) {
			this.pickupMode.remove(nick);
		});

		// Remove player from pickup if gets killed by op
		bot.client.on("kill", function(nick,by,reason,message) {
			this.pickupMode.remove(nick);
		});

		// This should do something when player changes nick.
		// Probably just change the nick in the object, if found.
		bot.client.on("nick", function(oldnick,newnick,channels,message) {
			// do something
		});

		// If pickupMode has additional listeners (most likely commands)
		// they will be added here.
		this.pickupMode.addListeners();
	};

	this.addListeners();


};

module.exports = Channel;