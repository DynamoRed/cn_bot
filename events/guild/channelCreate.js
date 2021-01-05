const Discord = require("discord.js");

module.exports = async (bot, newC) => {
    if(newC.guild == undefined) return;
    if(newC.guild.id != "693198481086480544" && newC.guild.id != "618855620820336640"){
        return; 
    }

    var logEmbed = new Discord.MessageEmbed()
        .setColor(bot.config.COLORS.BASE)
        .setDescription(`Création du channel **${newC.name}**`)
    let logMsg = await bot.guilds.cache.get(bot.config.OFFICIALS_SERVERS.DARKRP).channels.cache.get(bot.config.I_CHANNELS.LOGS).send(logEmbed);
}