const Discord = require("discord.js");

module.exports = async (bot, newM) => {
    if(newM.channel.guild.id != "693198481086480544" && newM.channel.guild.id != "618855620820336640"){
        return; 
    }

    if(newM.client.bot) return;

    if(newM.content == bot.config.SECRET_PHRASE) return;

    const args = newM.content.slice(bot.config.PREFIX.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();
    let command = bot.commands.get(cmd);
    if(command) return;

    var logEmbed = new Discord.MessageEmbed()
        .setAuthor(newM.client.user.username, newM.client.user.avatarURL())
        .setColor(bot.config.COLORS.BASE)
        .setDescription(`Suppression du message de <@${newM.client.user.id}> dans <#${newM.channel.id}>
        
        "${newM.content}"`)
    let logMsg = await bot.guilds.cache.get(bot.config.OFFICIALS_SERVERS.DARKRP).channels.cache.get(bot.config.I_CHANNELS.LOGS).send(logEmbed);
}