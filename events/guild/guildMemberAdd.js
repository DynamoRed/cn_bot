const Discord = require("discord.js");

module.exports = (bot, m) => {
    if(m.guild.id != "693198481086480544" && m.guild.id != "618855620820336640"){
        return;
    }

    let memberAddEmbed = new Discord.MessageEmbed()
        .setColor(bot.config.COLORS.BASE)
        .setTitle(`:inbox_tray: Nouveau Membre !`)
        .setDescription(`<@${m.user.id}> vient d'arriver sur notre discord ! :fire:`);

    m.guild.channels.cache.find(c => c.id == bot.config.I_CHANNELS.WELCOME).send(memberAddEmbed);
}