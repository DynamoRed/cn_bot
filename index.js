const Discord = require("discord.js");
const config = require("./config.json");
const fs = require('fs');
const bot = new Discord.Client({
    "partials": ['CHANNEL', 'MESSAGE', 'REACTION']
});

bot.config = config;
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.categories = fs.readdirSync("./commands/");
["commands"].forEach(handler => { 
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
bot.on("guildMemberAdd", (member) => {
    require("./events/guild/guildMemberAdd")(bot, member);
});
bot.on("guildCreate", (g) => {
    require("./events/client/guildCreate")(bot, g);
});

bot.login(process.env.TOKEN);