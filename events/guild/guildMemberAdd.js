const Discord = require("discord.js");

module.exports = (bot, m) => {
    let memberAddEmbed = new Discord.MessageEmbed()
        .setColor(bot.config.COLORS.BASE)
        .setTitle(`:inbox_tray: Nouveau Membre !`)
        .setDescription(`<@${m.user.id}> vient d'arriver sur notre discord ! :fire:`);

    m.guild.channels.cache.find(c => c.id == bot.config.I_CHANNELS.WELCOME).send(memberAddEmbed);

    //CAPTCHA EMBEDS
    let captchaEmbed1 = new Discord.MessageEmbed()
        .setColor(bot.config.COLORS.BASE)
        .setImage("https://i.imgur.com/Y4L6xDZ.png");
        
    let captchaEmbed2 = new Discord.MessageEmbed()
        .setColor(bot.config.COLORS.BASE)
        .setTitle(`🔐 Vérification`)
        .setDescription(`${bot.botEmojis.GLOBAL.BULLET} **Bienvenue <@${m.user.id}> sur SPLife !**
        Veuillez réagir sous le message dans <#${bot.config.I_CHANNELS.VERIFICATION}> avec ✅ pour passer notre captcha.`);

    m.guild.channels.cache.find(c => c.id == bot.config.I_CHANNELS.MEMBER_STATS).setName(`👥 Membres: ${m.guild.memberCount}`);
    m.user.send(captchaEmbed1);
    m.user.send(captchaEmbed2);
}