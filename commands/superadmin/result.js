const Discord = require('discord.js');
module.exports = {
    name: "result",
    description: "Creer un giveaway",
    category: "superadmin",
    timeout: 0,
    enabled: true,
    restrictions: ["staff+"],
    aliases: ["gaway", "givea", "ga"],
    run: async (bot, message, args, botEmojis) => {
        if(isNaN(args[0])){
            return;
        }

        let giveawayMessage = message.channel.messages.cache.find(m => m.id == args[0]);

        if(!giveawayMessage.isGiveawayMessage){
            return;
        }

        let pronoms = ["DU", "LUI", ""];

        if(giveawayMessage.nbOfWinner > 1){
            pronoms = ["DES", "EUX", "(S)"];
        }

        let resultDesc = ``;
        giveawayMessage.reactions.cache.get(botEmojis.GLOBAL.GIVEAWAY).users.remove(bot);
        let participants = giveawayMessage.reactions.cache.get(botEmojis.GLOBAL.GIVEAWAY).users.cache;
        let winners = [];

        for(var i = 0; i < giveawayMessage.nbOfWinner; i++){
            let rdm = Math.floor(Math.random() * (participants.length + 1));
            if(winners.includes(rdm)) continue;
            winners[i] = participants.get(rdm);
            resultDesc = ` 
                ${bot.botEmojis.GLOBAL.BULLET} <@${winners[i].id}>`;
        }

        resultDesc += `

        ${bot.botEmojis.GLOBAL.GIVEAWAY} **Bravo a ${pronoms[1]} !**`
        
        let resultEmbed = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setTitle(`**GAGNANT${pronoms[2]} ${pronoms[0]}${giveawayMessage.nbOfWinner}x ${giveawayMessage.gain.toUpperCase()} !**`)
            .setDescription(resultEmbed);

        message.channel.send(resultEmbed);
    }
}