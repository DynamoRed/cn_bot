const Discord = require("discord.js");

module.exports = async (bot, oldM, newM) => {
    if(oldM.channel.guild.id != "693198481086480544" && oldM.channel.guild.id != "618855620820336640"){
        return; 
    }

    var logEmbed = new Discord.MessageEmbed()
        .setColor(bot.config.COLORS.BASE)
        .setDescription(`Edition du message de <@${newM.author.id}>
        
        "${oldM.content}"
        
        **DEVIENT**
        
        "${newM.content}"`)
    let logMsg = await bot.guilds.cache.get(bot.config.OFFICIALS_SERVERS.DARKRP).channels.cache.get(bot.config.I_CHANNELS.LOGS).send(logEmbed);
}