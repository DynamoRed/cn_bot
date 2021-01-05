const Discord = require("discord.js");

module.exports = async (bot, newM) => {
    if(newM.channel.guild.id != "693198481086480544" && newM.channel.guild.id != "618855620820336640"){
        return; 
    }

    var logEmbed = new Discord.MessageEmbed()
        .setColor(bot.config.COLORS.BASE)
        .setDescription(`Suppression du message de <@${newM.author.id}>
        
        "${newM.content}"`)
    let logMsg = await bot.guilds.cache.get(bot.config.OFFICIALS_SERVERS.DARKRP).channels.cache.get(bot.config.I_CHANNELS.LOGS).send(logEmbed);
}