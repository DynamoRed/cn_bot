const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "getavatar",
    description: "Get avatar of a player",
    category: "dynamo",
    timeout: 0,
    enabled: true,
    restrictions: [""],
    aliases: [""],
    run: async (bot, message, args, botEmojis) => {
        if(message.author.id != bot.config.OWNER_ID){
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.DENY)
                .setFooter(`Message auto-supprimé dans 5 secondes`)
                .setDescription(`<@${message.author.id}> **vous n'avez pas la permission de faire ca**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 5 * 1000)
            return;
        }

        let mentionned = message.mentions.users.first();

        message.reply(mentionned.displayAvatarURL())
    }
}