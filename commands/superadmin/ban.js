const Discord = require('discord.js');
module.exports = {
    name: "ban",
    description: "Bannir un membre du serveur",
    category: "superadmin",
    timeout: 10000,
    enabled: true,
    restrictions: ["staff+"],
    aliases: ["bannissement"],
    run: async (bot, message, args, botEmojis) => {
        let mentionned = message.mentions.users.first();
        let banReason = args.slice(1).join(' ');
        if(mentionned){
            if(banReason){
                let mentionning = `<@${message.author.id}>`;
                try{
                    let logEmbed = new Discord.MessageEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor(bot.config.COLORS.BASE)
                        .setDescription(mentionning + ' a banni <@' + mentionned + '>\nRaison: **' + banReason + '**\nDepuis le channel: <#' + message.channel.id + '>');
                    message.guild.channels.cache.find(c => c.id == bot.config.I_CHANNELS.LOGS).send(logEmbed);

                    message.guild.members.cache.find(m => m.user.id == mentionned).ban({ days: 7, reason: banReason })
                    .then(console.log)
                    .catch(console.error);

                    let confirmationEmbed = new Discord.MessageEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor(bot.config.COLORS.ALLOW)
                        .setTitle("Bannissement effectué !")
                        .setDescription('Vous avez bien banni <@' + mentionned + '>\nRaison: **' + banReason + '**\nDepuis le channel: <#' + message.channel.id + '>');
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