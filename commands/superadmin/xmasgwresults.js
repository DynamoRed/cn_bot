const Discord = require('discord.js');

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min+1)+min);
}

module.exports = {
    name: "xmasgwresult",
    description: "Affiche les resultats du giveaway de noël",
    category: "superadmin",
    timeout: 0,
    enabled: true,
    restrictions: ["staff+"],
    aliases: ["xmasgwr"],
    run: async (bot, message, args, botEmojis) => {
        let participants = [];
        let winners = [];

        let y = 0;
        bot.guilds.cache.forEach(g => {
            if(g.id == "779628862115938354") return;
            participants[y] = g.owner;
            y++;
        })

        let winnersEmbed = ``;

        for(var i = 0; i < 13; i++){
            let rdm = randomNumber(0, participants.length - 1);
            while(winners.includes(participants[rdm].id)){
                rdm = randomNumber(0, participants.length - 1);
            }
            winners[i] = participants[rdm].id;
            if(i == 0){
                winnersEmbed += `:gift: __**${participants[rdm].user.tag}**__ remporte le **GRAND PACK DE NOËL** !\n\n`;
            } else if(i <= 10){
                winnersEmbed += `:gift: __**${participants[rdm].user.tag}**__ remporte **1 Discord Nitro Classic** !\n`;
                if(i == 10){
                    winnersEmbed += `\n`;
                }
            } else {
                winnersEmbed += `:gift: __**${participants[rdm].user.tag}**__ remporte **1 Grâde VIP** !\n`;
            }
        }

        console.log(winners)

        let resultEmbed = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setTitle(`${botEmojis.GLOBAL.GIVEAWAY}  Résultats du Grand Giveaways de Noël`)
            .setDescription(`${winnersEmbed}

            *Nous invitons les gagnants a venir contacter <@${bot.config.OWNER_ID}> ou <@255751273540747265> pour récuperer leur(s) gain(s)*

            ${botEmojis.GLOBAL.TEAM} **Notre équipe vous souhaite a tous de joyeuses fêtes !**`);

        message.channel.send(resultEmbed);

        let winnersMentions = ``;
        for(var i = 0; i < winners.length; i++){
            if(i == winners.length - 1){
                winnersMentions += `<@${winners[i]}>.`;
            } else if(i == winners.length - 2){
                winnersMentions += `<@${winners[i]}> et `;
            } else {
                winnersMentions += `<@${winners[i]}>, `;
            }
        }

        message.channel.send(winnersMentions);
    }
}