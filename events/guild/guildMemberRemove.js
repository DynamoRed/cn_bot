const Discord = require("discord.js");

module.exports = async (bot, m) => {
    m.guild.channels.cache.get("701635851725176875").setName(`👥・𝗠𝗲𝗺𝗯𝗿𝗲𝘀: ${m.guild.memberCount}`, "Actualisation Stats");
}