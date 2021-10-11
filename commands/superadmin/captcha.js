const Discord = require('discord.js');
const DiscordButtons = require('discord-buttons');

module.exports = {
    name: "captcha",
    description: "Affiche le message du système ticket du support",
    category: "superadmin",
    timeout: 0,
    enabled: true,
    restrictions: ["staff+"],
    aliases: ["verif", "verification"],
    run: async (bot, message, args, botEmojis) => {

        if(!message.member.roles.cache.find(r => r.name.toLowerCase() == "staff+")) {
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.RED)
                .setFooter(`Message auto-supprimé dans 5 secondes`)
                .setDescription(`<@${message.author.id}> **vous n'avez pas la permission de faire ca**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 5 * 1000)
            return;
        }
        
        //SUPPORT EMBEDS 
        const attachment = new Discord.MessageAttachment('./resources/images/captcha_banner.png', 'captcha_banner.png');
        let welcomeEmbed1 = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BLURPLE)
            .attachFiles(attachment)
            .setImage("attachment://captcha_banner.png");

        message.channel.send(welcomeEmbed1).then(() => {
            let welcomeEmbed2 = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.BLURPLE)
                .setDescription(`👋 **Bienvenue sur Conoda Roleplay !**
                
                ${bot.botEmojis.GLOBAL.BULLET} Afin de nous assurer que vous n'êtes pas un robot, nous vous prions de **verifier votre compte**.

                ${bot.botEmojis.GLOBAL.BULLET} Pour verifier votre compte, il vous suffit de demander un **lien de verification** grace au **bouton ci-dessous** et de vous **connecter** a votre compte ${bot.botEmojis.SOCIAL_NETWORK.STEAM} **Steam** !
                
                ${bot.botEmojis.GLOBAL.TEAM} ***En cas de soucis n'hesitez pas a faire un <#${"815004548723900506"}> pour contacter un administrateur.***`);
        
            let askVerificationButton = new DiscordButtons.MessageButton()
                .setLabel(" Demander mon lien")
                .setStyle("blurple")
                .setEmoji('🗝️')
                .setID('ask_verification_b_svS3yV')

            message.channel.send('', {
                component: askVerificationButton,
                embed: welcomeEmbed2
            });
        });
    }
}