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
                .setDescription(`**:bookmark_tabs: Statistiques sur nos serveurs:**
                ${botEmojis.SPLIFE.DARK_RP.LOGO} 519h passées sur le DarkRP
                ${botEmojis.SPLIFE.DARK_RP.LOGO} 19h passées sur le ScpRP
                ${botEmojis.SPLIFE.DARK_RP.LOGO} 98h passées sur le PrisonRP
                
                **:bookmark_tabs: Statistiques Discord:**
                Messages envoyés: 409
                Heures passées en vocal: 509h
                Premiere connexion au discord: 00/00/0000
                Création du compte: 00/00/00
                
                
                **:link: Profils liés:**`)
                .addField(`${botEmojis.SOCIAL_NETWORK.STEAM} Steam`, `[DynamoRed](https://www.google.com/)`, true)
                .addField(`${botEmojis.SOCIAL_NETWORK.GITHUB} GitHub`, `[DynamoRed](https://www.google.com/)`, true)
                .addField(`${botEmojis.SOCIAL_NETWORK.YOUTUBE} Youtube`, `[DynamoRed](https://www.google.com/)`, true)

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