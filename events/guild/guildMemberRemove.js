const Discord = require("discord.js");

module.exports = (bot, m) => {
    console.log("member quit");
    m.guild.channels.cache.find(c => c.id == bot.config.I_CHANNELS.MEMBER_STATS).setName(`👥 Membres: ${m.guild.memberCount}`);
}