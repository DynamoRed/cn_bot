const Discord = require("discord.js");

module.exports = async (bot, m) => {
    if(m.guild.id != "693198481086480544" && m.guild.id != "618855620820336640"){
        return; 
    }

    bot.guilds.cache.get(bot.config.OFFICIALS_SERVERS.DARKRP).channels.cache.get(bot.config.I_CHANNELS.MEMBERS_STATS).setName(`👥 Membres: ${bot.guilds.cache.get(bot.config.OFFICIALS_SERVERS.DARKRP).memberCount}`, "Actualisation Stats");

    var logEmbed = new Discord.MessageEmbed()
        .setColor(bot.config.COLORS.BASE)
        .setDescription(`<@${m.id}> a quitté le serveur`)
    let logMsg = await bot.guilds.cache.get(bot.config.OFFICIALS_SERVERS.DARKRP).channels.cache.get(bot.config.I_CHANNELS.LOGS).send(logEmbed);
}