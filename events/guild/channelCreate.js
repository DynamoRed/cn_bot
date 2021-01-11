const Discord = require("discord.js");

module.exports = async (bot, newC) => {
    if(newC.guild == undefined) return;

    let logsChannel = await bot.getServerChannel(newC.guild.id, "logs");
    if(logsChannel != undefined) {
        var logEmbed = new Discord.MessageEmbed()
            .setColor(await bot.getServerColor(newC.guild.id))
            .setDescription(`Création du channel **${newC.name}**`)
        newC.guild.channels.cache.get(logsChannel).send(logEmbed);
    }
}