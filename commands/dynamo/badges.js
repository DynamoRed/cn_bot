const Discord = require('discord.js');
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
                    setTimeout(() => {
                        if(badgeMessage.actualPage != 1) return;
                        badgeMessage.reactions.removeAll();
                    }, 15 * 1000)
                    return;
                } else {

                }
        
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

        } else if(args.length == 3){
                if(!message.member.roles.cache.find(r => r.name.toLowerCase().includes("superadmin"))) {
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

                } else {

                }
        } else {

        }
    }
}