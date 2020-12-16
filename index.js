const Discord = require("discord.js");
const config = require("./resources/config.json");
const badgesData = require("./resources/badges.json");
const fs = require('fs');
const bot = new Discord.Client({
    "partials": ['CHANNEL', 'MESSAGE', 'REACTION']
});
const mysql = require('mysql');

bot.config = config;
bot.badgesData = badgesData;
bot.mysql = mysql;
bot.commands = new Discord.Collection();
bot.badges = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.categories = fs.readdirSync("./commands/");
["commands", "badges"].forEach(handler => { 
    require(`./handlers/${handler}`)(bot);
})

var db = mysql.createConnection({
    host: "https://frweb5.pulseheberg.net:8443/phpMyAdmin",
    user: "johnny",
    password: "7olPv44^"
});
 
db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
});

bot.addBadge = function addBadge(owner_id, badge_name){

}

bot.on("ready", () => {
    require("./events/client/ready")(bot);
});
bot.on("raw", (packet) => {
    require("./events/client/raw")(bot, packet);
}); 
bot.on("message", async (message) => {
    require("./events/guild/message")(bot, message);
});
bot.on("messageReactionAdd", (reaction, user) => {
    require("./events/guild/messageReactionAdd")(bot, reaction, user);
});
bot.on("messageReactionRemove", (reaction, user) => {
    require("./events/guild/messageReactionRemove")(bot, reaction, user);
});
bot.on("guildMemberAdd", (member) => {
    require("./events/guild/guildMemberAdd")(bot, member);
});
bot.on("guildCreate", (g) => {
    require("./events/client/guildCreate")(bot, g);
});
bot.on("guildDelete", (g) => {
    require("./events/client/guildDelete")(bot, g);
});

bot.login(process.env.TOKEN);