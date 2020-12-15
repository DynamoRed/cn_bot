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
                    console.log(`ppp ${bot.badgesData[message.author.id].badges}`)
                    for(var i = 0; i < bot.badgesData[message.author.id].badges.length; i++){
                        let badge = bot.badgesData[message.author.id].badges[i];
                        console.log(`ppp222 ${bot.badges.get(badge.id).name}`)
                        var badgeEmbed = new Discord.MessageEmbed()
                            .setColor(bot.config.COLORS.BASE)
                            .setFooter(`Badge obtenu le ${badge.get_at}`)
                            .setTitle(`${bot.badges.get(badge.id).name}`)
                            .setDescription(`${bot.badges.get(badge.id).description}`)
                        let badgeMessage = await message.channel.send(badgeEmbed);
                    }
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