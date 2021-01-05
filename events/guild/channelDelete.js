const Discord = require("discord.js");

module.exports = async (bot, oldC) => {
    if(oldC.guild == undefined) return;
    if(oldC.guild.id != "693198481086480544" && oldC.guild.id != "618855620820336640"){
        return; 
    }

    var logEmbed = new Discord.MessageEmbed()
    .setAuthor(oldC.client.user.username, oldC.client.user.avatarURL())
        .setColor(bot.config.COLORS.BASE)
        .setDescription(`<@${oldC.client.user.id}> a supprimé le channel **${oldC.name}**`)
    let logMsg = await bot.guilds.cache.get(bot.config.OFFICIALS_SERVERS.DARKRP).channels.cache.get(bot.config.I_CHANNELS.LOGS).send(logEmbed);
}