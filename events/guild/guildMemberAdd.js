const Discord = require("discord.js");

module.exports = async (bot, m) => {

    let memberStatChannel = await bot.getServerChannel(m.guild.id, "members_stat");
    if(memberStatChannel != undefined) {
        m.guild.channels.cache.get(memberStatChannel).setName(`👥 Membres: ${m.guild.memberCount}`, "Actualisation Stats");
    }

    let welcomeChannel = await bot.getServerChannel(m.guild.id, "welcome");
    if(welcomeChannel != undefined) {
        let logsChannel = await bot.getServerChannel(m.guild.id, "logs");
        if(logsChannel != undefined) {
            var logEmbed = new Discord.MessageEmbed()
                .setColor(await bot.getServerColor(m.guild.id))
                .setDescription(`<@${m.id}> a rejoint le serveur`)
            m.guild.channels.cache.get(logsChannel).send(logEmbed);
        }

        let memberAddEmbed = new Discord.MessageEmbed()
            .setColor(await bot.getServerColor(m.guild.id))
            .setTitle(`:inbox_tray: Nouveau Membre !`)
            .setDescription(`<@${m.user.id}> vient d'arriver sur notre discord ! :fire:`);

        m.guild.channels.cache.get(welcomeChannel).send(memberAddEmbed);
    }
}