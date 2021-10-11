const Discord = require("discord.js");
const DiscordButtons = require('discord-buttons');

module.exports = async (bot, m) => {

    m.guild.channels.cache.get("701635851725176875").setName(`👥・𝗠𝗲𝗺𝗯𝗿𝗲𝘀: ${m.guild.memberCount}`, "Actualisation Stats");

    m.roles.add(bot.config.I_ROLES.MEMBER, "");
    m.roles.add(bot.config.I_ROLES.FIRST_SEPARATOR, "");
    m.roles.add(bot.config.I_ROLES.NOTIFICATIONS_ADVERTS, "");

    let mentionMessage = await m.guild.channels.cache.get("815036677655101481").send(`<@${m.id}>`);
    setTimeout(function(){ mentionMessage.delete(); }, 1000);
}