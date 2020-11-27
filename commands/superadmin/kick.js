const Discord = require('discord.js');
module.exports = {
    name: "kick",
    description: "Ejecter un membre du serveur",
    category: "superadmin",
    timeout: 10000,
    enabled: true,
    restrictions: ["staff+"],
    aliases: ["eject"],
    run: async (bot, message, args, botEmojis) => {
        let mentionned = message.mentions.users.first();
        let kickReason = args.slice(1).join(' ');
        if(mentionned){
            if(kickReason){
                let mentionning = `<@${message.author.id}>`;
                try{
                    let logEmbed = new Discord.MessageEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor(bot.config.COLORS.BASE)
                        .setDescription(mentionning + ' a ejecté <@' + mentionned + '>\nRaison: **' + kickReason + '**\nDepuis le channel: <#' + message.channel.id + '>');
                    message.guild.channels.cache.find(c => c.id == bot.config.I_CHANNELS.LOGS).send(logEmbed);

                    message.guild.members.cache.find(m => m.user.id == mentionned).kick({ reason: kickReason })
                    .then(console.log)
                    .catch(console.error);

                    let confirmationEmbed = new Discord.MessageEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor(bot.config.COLORS.ALLOW)
                        .setTitle("Ejection effectuée !")
                        .setDescription('Vous avez bien ejecté <@' + mentionned + '>\nRaison: **' + kickReason + '**\nDepuis le channel: <#' + message.channel.id + '>');
                    message.author.send(confirmationEmbed);
                } catch(e){
                    console.log(e);
                }
            } else {
                var replyEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.DENY)
                    .setFooter(`Message auto-supprimé dans 5 secondes`)
                    .setDescription(`<@${message.author.id}> **vous devez ecrire une raison valable !**`)
                let msg = await message.channel.send(replyEmbed);
                setTimeout(() => {msg.delete()}, 5 * 1000)
            }
        } else {
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.DENY)
                .setFooter(`Message auto-supprimé dans 5 secondes`)
                .setDescription(`<@${message.author.id}> **ce joueur est introuvable !**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 5 * 1000)
        }
    }
}