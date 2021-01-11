const Discord = require("discord.js");

module.exports = async (bot, m) => {
    let memberStatChannel = await bot.getServerChannel(m.guild.id, "members_stat");
    if(memberStatChannel != undefined) {
        m.guild.channels.cache.get(memberStatChannel).setName(`👥 Membres: ${m.guild.memberCount}`, "Actualisation Stats");
    }

    let logsChannel = await bot.getServerChannel(m.guild.id, "logs");
    if(logsChannel != undefined) {
        var logEmbed = new Discord.MessageEmbed()
            .setColor(await bot.getServerColor(m.guild.id))
            .setDescription(`<@${m.id}> a quitté le serveur`)
        m.guild.channels.cache.get(logsChannel).send(logEmbed);
    }
}