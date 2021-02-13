const Discord = require('discord.js');
module.exports = {
    name: "mute",
    description: "Rendre muet un membre du serveur",
    category: "staff",
    timeout: 10000,
    enabled: true,
    restrictions: ["staff"],
    aliases: [""],
    run: async (bot, message, args, botEmojis, hasNoTheRight) => {
        if (hasNoTheRight) return;
        let mentionned = message.mentions.users.first();
        let muteReason = args.slice(1).join(' ');
        if(mentionned){
            if(muteReason){
                let mentionning = `<@${message.author.id}>`;
                try{
                    let logEmbed = new Discord.MessageEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor(bot.config.COLORS.BASE)
                        .setDescription(mentionning + ' a rendu muet <@' + mentionned + '>\nRaison: **' + muteReason + '**\nDepuis le channel: <#' + message.channel.id + '>');
                    message.guild.channels.cache.find(c => c.id == bot.config.I_CHANNELS.LOGS).send(logEmbed);

                    message.guild.members.cache.find(m => m.user.id == mentionned).roles.add(message.guild.roles.cache.find(r => r.id == bot.config.I_ROLES.MUTE), "Mute by bot");

                    let confirmationEmbed = new Discord.MessageEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor(bot.config.COLORS.ALLOW)
                        .setTitle("Mute effectué !")
                        .setDescription('Vous avez bien rendu muet <@' + mentionned + '>\nRaison: **' + muteReason + '**\nDepuis le channel: <#' + message.channel.id + '>');
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