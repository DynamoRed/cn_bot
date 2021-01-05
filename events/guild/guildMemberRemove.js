const Discord = require("discord.js");

module.exports = (bot, m) => {
    if(m.guild.id != "693198481086480544" && m.guild.id != "618855620820336640"){
        return; 
    }

    let onlineCountMembers = bot.guilds.cache.get(bot.config.OFFICIALS_SERVERS.DARKRP).members.cache.filter(m => m.presence.status == "online").array().length;
    onlineCountMembers += bot.guilds.cache.get(bot.config.OFFICIALS_SERVERS.DARKRP).members.cache.filter(m => m.presence.status == "idle").array().length;
    onlineCountMembers += bot.guilds.cache.get(bot.config.OFFICIALS_SERVERS.DARKRP).members.cache.filter(m => m.presence.status == "dnd").array().length;
    bot.guilds.cache.get(bot.config.OFFICIALS_SERVERS.DARKRP).channels.cache.get(bot.config.I_CHANNELS.MEMBERS_STATS).setName(`👥 Membres: ${bot.guilds.cache.get(bot.config.OFFICIALS_SERVERS.DARKRP).memberCount}`, "Actualisation Stats");
    bot.guilds.cache.get(bot.config.OFFICIALS_SERVERS.DARKRP).channels.cache.get(bot.config.I_CHANNELS.ONLINE_STATS).setName(`🟢 En Ligne: ${onlineCountMembers}`, "Actualisation Stats");
}