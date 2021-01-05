const Discord = require("discord.js");
const config = require("./resources/config.json");
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
bot.on("guildMemberRemove", (member) => {
    require("./events/guild/guildMemberRemove")(bot, member);
});
bot.on("guildCreate", (g) => {
    require("./events/client/guildCreate")(bot, g);
});
bot.on("guildDelete", (g) => {
    require("./events/client/guildDelete")(bot, g);
});
bot.on("messageDelete", (message) => {
    require("./events/guild/messageDelete")(bot, message);
});
bot.on("messageUpdate", (oldMessage, newMessage) => {
    require("./events/guild/messageUpdate")(bot, oldMessage, newMessage);
});
bot.login(process.env.TOKEN);