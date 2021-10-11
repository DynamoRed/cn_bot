const Discord = require('discord.js');
module.exports = {
    name: "unmute",
    description: "Unmute un membre du serveur",
    category: "staff",
    timeout: 10000,
    enabled: true,
    restrictions: ["staff"],
    aliases: [""],
    run: async (bot, message, args, botEmojis, hasNoTheRight) => {
        if (hasNoTheRight) return;

        if(!message.member.roles.cache.find(r => r.name.toLowerCase() == "staff")) {
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.RED)
                .setFooter(`Message auto-supprimé dans 5 secondes`)
                .setDescription(`<@${message.author.id}> **vous n'avez pas la permission de faire ca**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 5 * 1000)
            return;
        }
        
        let mentionned = message.mentions.users.first();
        if(mentionned){
            let mentionning = `<@${message.author.id}>`;
            try{
                let logEmbed = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setColor(bot.config.COLORS.BLURPLE)
                    .setDescription(mentionning + ' a rendu la parole à <@' + mentionned + '>\nDepuis le channel: <#' + message.channel.id + '>');
                message.guild.channels.cache.find(c => c.id == bot.config.I_CHANNELS.LOGS).send(logEmbed);

                message.guild.members.cache.find(m => m.user.id == mentionned).roles.remove(message.guild.roles.cache.find(r => r.id == bot.config.I_ROLES.MUTE), "Mute by bot");

                let confirmationEmbed = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setColor(bot.config.COLORS.GREEN)
                    .setTitle("Mute effectué !")
                    .setDescription('Vous avez bien rendu la parole à <@' + mentionned + '>\nDepuis le channel: <#' + message.channel.id + '>');
                message.author.send(confirmationEmbed);
            } catch(e){
                console.log(e);
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