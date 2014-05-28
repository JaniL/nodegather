
var settings = require('./settings.json');
var Bot = require('./bot.js');


var bot = new Bot(settings);
bot.client.connect();