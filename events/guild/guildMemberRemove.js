const Discord = require("discord.js");

module.exports = async (bot, m) => {
    m.guild.channels.cache.get("701635851725176875").setName(`π₯γ»π π²πΊπ―πΏπ²π: ${m.guild.memberCount}`, "Actualisation Stats");
}