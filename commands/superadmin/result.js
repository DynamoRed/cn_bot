const Discord = require('discord.js');
module.exports = {
    name: "result",
    description: "Creer un giveaway",
    category: "superadmin",
    timeout: 0,
    enabled: true,
    restrictions: ["staff+"],
    aliases: [""],
    run: async (bot, message, args, botEmojis) => {

        if(!message.member.roles.cache.find(r => r.name.toLowerCase() == "staff+")) {
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.DENY)
                .setFooter(`Message auto-supprimé dans 5 secondes`)
                .setDescription(`<@${message.author.id}> **vous n'avez pas la permission de faire ca**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 5 * 1000)
            return;
        }
        
        if(isNaN(args[0]) || args.length != 1){
            return;
        }

        let giveawayMessage = message.channel.messages.cache.find(m => m.id == args[0]);

        giveawayMessage.reactions.cache.get(botEmojis.GLOBAL.GIVEAWAY.id).users.remove(bot.id);
        let participants = giveawayMessage.reactions.cache.get(botEmojis.GLOBAL.GIVEAWAY.id).users;
        let winners = [];
        let resultDesc = ``;
        let pronoms = ["DU", "lui", ""];

        if(giveawayMessage.nbOfWinners > 1){
            pronoms = ["DES", "eux", "(S)"];
        }

        for(var i = 0; i < giveawayMessage.nbOfWinners; i++){
            console.log(participants.length);
            let rdm = Math.floor(Math.random() * (participants.length + 1));
            if(winners.includes(participants[rdm])) continue;
            console.log(`Random: ${rdm}`);
            winners[i] = participants[rdm];
            resultDesc = ` 
                ${bot.botEmojis.GLOBAL.BULLET} <@${winners[i].id}>`;
        }

        resultDesc += `

        ${bot.botEmojis.GLOBAL.GIVEAWAY} **Bravo a ${pronoms[1]} !**`
        
        let resultEmbed = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setTitle(`**GAGNANT${pronoms[2]} ${pronoms[0]}${giveawayMessage.nbOfWinners}x ${giveawayMessage.gain.toUpperCase()} !**`)
            .setDescription(resultDesc);

        message.channel.send(resultEmbed);
    }
}