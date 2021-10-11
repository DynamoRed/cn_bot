const Discord = require('discord.js');
const DiscordButtons = require('discord-buttons');

module.exports = {
    name: "vote",
    description: "Invite les membres a voter pour le serveur",
    category: "superadmin",
    timeout: 0,
    enabled: true,
    restrictions: ["staff+"],
    aliases: [""], 
    run: async (bot, message, args, botEmojis) => {

        /*if(!message.member.roles.cache.find(r => r.name.toLowerCase() == "staff+")) {
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.RED)
                .setFooter(`Message auto-supprimé dans 5 secondes`)
                .setDescription(`<@${message.author.id}> **vous n'avez pas la permission de faire ca**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 5 * 1000)
            return;
        }*/
        
        //VOTE EMBEDS
        let voteEmbed1 = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BLURPLE)
            .setTitle(`📨 Vote`)
            .setDescription(`${botEmojis.GLOBAL.BULLET} Votez pour notre serveur sur [Top-Serveur](https://top-serveurs.net/garrys-mod/vote/...) !
            Les cinq plus gros votants recevront une récompense a la fin du mois !`);

        let voteButton = new DiscordButtons.MessageButton()
            .setLabel(" Voter")
            .setStyle("url")
            .setEmoji('📨')
            .setURL('https://top-serveurs.net/garrys-mod/vote/...')

        message.channel.send('', {
            component: voteButton,
            embed: voteEmbed1
        });
    }
}