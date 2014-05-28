/* var commandModules = [];
require("fs").readdirSync("./commandListeners").forEach(function(file) {
  commandModules.push(require("./commandListeners/" + file));
}); */

var CommandListener = function(channel) {
	this.channel = channel;
	this.commands = {};

	this.addCommand = function(moduleName) {
		var module = require('./commandListeners/' + moduleName + '.js');
		this.commands[module.command] = module.callback;
	};

	this.removeCommand = function(moduleName) {
		this.commands[moduleName] = undefined;
	};

	this.receiveMessage = function(nick,message) {
		if (message.charAt(0) == "!") {
			message = message.substr(1).split(' ');
			command = message[0];

			if (typeof(this.commands[command]) == "function") {
				var args = message;
				args.shift();
				this.commands[command](this.channel,nick,args);
			}
		}
	};


};

module.exports = CommandListener;