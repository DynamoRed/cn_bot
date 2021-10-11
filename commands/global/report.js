const Discord = require('discord.js');
module.exports = {
    name: "report",
    description: "Report un membre du serveur",
    category: "global",
    timeout: 120000,
    enabled: true,
    restrictions: [""],
    aliases: [""],
    run: async (bot, message, args, botEmojis) => {
        let mentionned = message.mentions.users.first();
        let reason = args.slice(1).join(' ');
        if(mentionned){
            if(reason){
                let mentionning = `<@${message.author.id}>`;
                try{
                    let reportEmbed = new Discord.MessageEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor(bot.config.COLORS.BLURPLE)
                        .setThumbnail('https://www.vanadiumcorp.com/wp-content/uploads/2018/01/annual_report_icon.png')
                        .setDescription(mentionning + ' signale <@' + mentionned + '>\nRaison: **' + reason + '**\nDans le channel: <#' + message.channel.id + '>');
                    message.guild.channels.cache.find(c => c.id == bot.config.I_CHANNELS.STAFF_CHAT).send(reportEmbed);

                    let confirmationEmbed = new Discord.MessageEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor(bot.config.COLORS.BLURPLE)
                        .setThumbnail('https://www.vanadiumcorp.com/wp-content/uploads/2018/01/annual_report_icon.png')
                        .setTitle("Votre report a bien été envoyé a notre équipe de modération !")
                        .setDescription('Vous avez signalé <@' + mentionned + '>\nRaison: **' + reason + '**\nDans le channel: <#' + message.channel.id + '>');
                    message.author.send(confirmationEmbed);
                } catch(e){
                    console.log(e);
                }
            } else {
                var replyEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.RED)
                    .setFooter(`Message auto-supprimé dans 5 secondes`)
                    .setDescription(`<@${message.author.id}> **vous devez ecrire une raison valable !**`)
                let msg = await message.channel.send(replyEmbed);
                setTimeout(() => {msg.delete()}, 5 * 1000)
            }
        } else {
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.RED)
                .setFooter(`Message auto-supprimé dans 5 secondes`)
                .setDescription(`<@${message.author.id}> **ce joueur est introuvable !**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 5 * 1000)
        }
    }
}