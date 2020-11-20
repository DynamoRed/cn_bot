const Discord = require('discord.js');
module.exports = {
    name: "captcha",
    description: "Affiche le message du système de captcha",
    category: "superadmin",
    timeout: 0,
    enabled: true,
    restrictions: ["staff+"],
    aliases: ["verif"],
    run: async (bot, message, args, botEmojis) => {
        //CAPTCHA EMBEDS
        let captchaEmbed1 = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setImage("https://i.imgur.com/Y4L6xDZ.png");
        
        let captchaEmbed2 = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setTitle(`${bot.botEmojis.GLOBAL.SUPPORT} Vérification`)
            .setDescription(`${bot.botEmojis.GLOBAL.BULLET} Veuillez réagir a ce message avec ✅ pour passer notre captcha. Cela vous donnera accès a la totalité de notre serveur !`);

        message.channel.send(captchaEmbed1);
        let msg = await message.channel.send(captchaEmbed2);
        msg.react("✅");
    }
}