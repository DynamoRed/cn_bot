const Discord = require('discord.js');
const fs = require('fs');
module.exports = {
    name: "badges",
    description: "Parcourir ces badges ou ceux d'un autre",
    category: "dynamo",
    timeout: 0,
    enabled: true,
    restrictions: [""],
    aliases: ["b"],
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
        if(args.length == 0){
            if(bot.badgesData[message.author.id]){
                let badge = bot.badges.get(bot.badgesData[message.author.id].badges[0].id);
                let obtainedDate =  bot.badgesData[message.author.id].badges[0].get_at;
                obtainedDate = obtainedDate.split("-");
                obtainedDate = `${obtainedDate[0]}/${obtainedDate[1]}/${obtainedDate[2]} ${obtainedDate[3]}:${obtainedDate[4]}`
                var badgeEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.BASE)
                    .setThumbnail(`https://www.raphael-biron.fr/projets/splife/badges/${badge.category}/${badge.id}.png`)
                    .setFooter(`Badge 1/${bot.badgesData[message.author.id].badges.length} | Obtenu le ${obtainedDate}`)
                    .setTitle(`👉 ${badge.name}`)
                    .setAuthor(`Badges de ${message.author.username}`, message.author.avatarURL())
                    .setDescription(`*${badge.description}*
                    `)
                let badgeMessage = await message.channel.send(badgeEmbed);
                badgeMessage.react("◀");
                badgeMessage.react("▶");
                badgeMessage.actualPage = 1;
                badgeMessage.whoRequest = message.author;
                badgeMessage.canChangePage = true;
                badgeMessage.whoIsRequest = message.author;
                setTimeout(() => {
                    if(badgeMessage.actualPage != 1) return;
                    badgeMessage.reactions.removeAll();
                    badgeMessage.canChangePage = false;
                }, 15 * 1000)
                return;
            } else {
                var replyEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.DENY)
                    .setFooter(`Message auto-supprimé dans 5 secondes`)
                    .setDescription(`<@${message.author.id}> **vous n'avez aucun badge !**`)
                let msg = await message.channel.send(replyEmbed);
                setTimeout(() => {msg.delete()}, 5 * 1000)
                return;
            }
        } else if(args.length == 1){
                if(mentionned){
                    if(bot.badgesData[mentionned.id]){
                        let badge = bot.badges.get(bot.badgesData[mentionned.id].badges[0].id);
                        let obtainedDate =  bot.badgesData[mentionned.id].badges[0].get_at;
                        obtainedDate = obtainedDate.split("-");
                        obtainedDate = `${obtainedDate[0]}/${obtainedDate[1]}/${obtainedDate[2]} ${obtainedDate[3]}:${obtainedDate[4]}`
                        var badgeEmbed = new Discord.MessageEmbed()
                            .setColor(bot.config.COLORS.BASE)
                            .setThumbnail(`https://www.raphael-biron.fr/projets/splife/badges/${badge.category}/${badge.id}.png`)
                            .setFooter(`Badge 1/${bot.badgesData[mentionned.id].badges.length} | Obtenu le ${obtainedDate}`)
                            .setTitle(`👉 ${badge.name}`)
                            .setAuthor(`Badges de ${mentionned.username}`, mentionned.avatarURL())
                            .setDescription(`*${badge.description}*
                            `)
                        let badgeMessage = await message.channel.send(badgeEmbed);
                        badgeMessage.react("◀");
                        badgeMessage.react("▶");
                        badgeMessage.actualPage = 1;
                        badgeMessage.whoRequest = message.author;
                        badgeMessage.canChangePage = true;
                        badgeMessage.whoIsRequest = mentionned;
                        setTimeout(() => {
                            if(badgeMessage.actualPage != 1) return;
                            badgeMessage.reactions.removeAll();
                            badgeMessage.canChangePage = false;
                        }, 15 * 1000)
                        return;
                    } else {
                        var replyEmbed = new Discord.MessageEmbed()
                            .setColor(bot.config.COLORS.DENY)
                            .setFooter(`Message auto-supprimé dans 5 secondes`)
                            .setDescription(`<@${message.author.id}> **ce joueur n'a aucun badge !**`)
                        let msg = await message.channel.send(replyEmbed);
                        setTimeout(() => {msg.delete()}, 5 * 1000)
                        return;
                    }
                } else {
                    var replyEmbed = new Discord.MessageEmbed()
                        .setColor(bot.config.COLORS.DENY)
                        .setFooter(`Message auto-supprimé dans 5 secondes`)
                        .setDescription(`<@${message.author.id}> **le membre spécifié n'a pas pu être trouvé !**`)
                    let msg = await message.channel.send(replyEmbed);
                    setTimeout(() => {msg.delete()}, 5 * 1000)
                    return;
                }

        } else if(args.length == 3){
                if(!message.member.roles.cache.find(r => r.name.toLowerCase().includes("staff+"))) {
                    var replyEmbed = new Discord.MessageEmbed()
                        .setColor(bot.config.COLORS.DENY)
                        .setFooter(`Message auto-supprimé dans 5 secondes`)
                        .setDescription(`<@${message.author.id}> **vous n'avez pas la permission de faire ca**`)
                    let msg = await message.channel.send(replyEmbed);
                    setTimeout(() => {msg.delete()}, 5 * 1000)
                    return;
                }

                if(args[0] == "add"){
                    if(mentionned){
                        if(!bot.badges.get(args[2])){
                            var replyEmbed = new Discord.MessageEmbed()
                                .setColor(bot.config.COLORS.DENY)
                                .setFooter(`Message auto-supprimé dans 5 secondes`)
                                .setDescription(`<@${message.author.id}> **ce badge n'a pas pu être trouvé !**`)
                            let msg = await message.channel.send(replyEmbed);
                            setTimeout(() => {msg.delete()}, 5 * 1000)
                            return;
                        }

                        let obtainedDate = new Date();
                        console.log(obtainedDate.toLocaleDateString('fr-FR')); 
                        let badgeRef = bot.badgesData[mentionned.id].badges.length+1;
                        bot.badgesData[mentionned.id].badges[badgeRef].id = args[2];
                        bot.badgesData[mentionned.id].badges[badgeRef].get_at = "00-00-0000-00-00";

                        fs.writeFileSync('../../resources/badges.json', bot.badgesData, err => {
                            if(err) throw err;
                        })

                        var replyEmbed = new Discord.MessageEmbed()
                            .setColor(bot.config.COLORS.ALLOW)
                            .setFooter(`Message auto-supprimé dans 5 secondes`)
                            .setDescription(`<@${message.author.id}> **badge ajouté avec succès !**`)
                        let msg = await message.channel.send(replyEmbed);
                        setTimeout(() => {msg.delete()}, 5 * 1000)
                        return;
                    } else {
                        var replyEmbed = new Discord.MessageEmbed()
                            .setColor(bot.config.COLORS.DENY)
                            .setFooter(`Message auto-supprimé dans 5 secondes`)
                            .setDescription(`<@${message.author.id}> **le membre spécifié n'a pas pu être trouvé !**`)
                        let msg = await message.channel.send(replyEmbed);
                        setTimeout(() => {msg.delete()}, 5 * 1000)
                        return;
                    }
                } else if(args[0] == "remove"){
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
                } else {
                    var replyEmbed = new Discord.MessageEmbed()
                        .setColor(bot.config.COLORS.DENY)
                        .setFooter(`Message auto-supprimé dans 5 secondes`)
                        .setDescription(`<@${message.author.id}> **cette commande est incorrecte !**`)
                    let msg = await message.channel.send(replyEmbed);
                    setTimeout(() => {msg.delete()}, 5 * 1000)
                    return;
                }
        } else {

        }
    }
}