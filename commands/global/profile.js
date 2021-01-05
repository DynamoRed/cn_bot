const Discord = require('discord.js');
module.exports = {
    name: "profile",
    description: "Affiche le profil d'un joueur",
    category: "global",
    timeout: 120000,
    enabled: true,
    restrictions: [""],
    aliases: ["p", "profiles"],
    run: async (bot, message, args, botEmojis) => {
        let mentionned = message.mentions.users.first();
        if(args.length == 0){
            let profileEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.BASE)
                .setThumbnail(message.author.avatarURL())
                .setTitle(`➢ Profil de ${message.author.tag}`)
                .setDescription("**:link: Profils liés:**")
                .addField('Steam', `[DynamoRed](https://www.google.com/)`, true)
                .addField('GitHub', `[DynamoRed](https://www.google.com/)`, true)
                .addField('Youtube', `[DynamoRed](https://www.google.com/)`, true)
                .setTimestamp(2)

            message.channel.send(profileEmbed)
        } else if(args.length == 1){
            if(mentionned){
                
            } else {
                var replyEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.DENY)
                    .setFooter(`Message auto-supprimé dans 5 secondes`)
                    .setDescription(`<@${message.author.id}> **le membre spécifié n'a pas pu être trouvé !**`)
                let msg = await message.channel.send(replyEmbed);
                setTimeout(() => {msg.delete()}, 5 * 1000)
                return;
            }
        }
    }
}