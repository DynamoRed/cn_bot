const Discord = require('discord.js');
const DiscordButtons = require('discord-buttons');

module.exports = {
    name: "support",
    description: "Affiche le message du système ticket du support",
    category: "superadmin",
    timeout: 0,
    enabled: true,
    restrictions: ["staff+"],
    aliases: ["ticket", "tickets"],
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
        const attachment = new Discord.MessageAttachment('./resources/images/support_banner.png', 'support_banner.png');
        let supportEmbed1 = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BLURPLE)
            .attachFiles(attachment)
            .setImage("attachment://support_banner.png");

        message.channel.send(supportEmbed1).then(() => {
            let supportEmbed2 = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.BLURPLE)
                .setTitle(`${bot.botEmojis.GLOBAL.SUPPORT} Support`)
                .setDescription(`${bot.botEmojis.GLOBAL.BULLET} Pour contacter notre équipe de modération il vous suffit de cliquer sur :envelope_with_arrow: en dessous de ce message.
                :pushpin: Merci de ne pas utiliser inutilement ce système sous peine de sanctions !`);

            let openTicketButton = new DiscordButtons.MessageButton()
                .setLabel(" Ouvrir un ticket de support")
                .setStyle("blurple")
                .setEmoji('📩')
                .setID('open_support_ticket_b_j1O1De')

            message.channel.send('', {
                component: openTicketButton,
                embed: supportEmbed2
            });
        })
    }
}