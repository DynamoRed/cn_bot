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
            while(winners.includes(participants[rdm])){
                rdm = randomNumber(0, participants.length - 1);
            }
            winners[i] = participants[rdm];
            if(i == 0){
                winnersEmbed += `:gift: <@${participants[rdm].id}> remporte le **GRAND PACK DE NOËL** !\n`;
            } else if(i <= 10){
                winnersEmbed += `${botEmojis.GLOBAL.BULLET} <@${participants[rdm].id}> remporte **1 Discord Nitro Classic** !\n`;
            } else {
                winnersEmbed += `${botEmojis.GLOBAL.BULLET} <@${participants[rdm].id}> remporte **1 Grâde VIP** !\n`;
            }
        }

        let resultEmbed = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setTitle(`${botEmojis.GLOBAL.GIVEAWAY}  Résultats du Grand Giveaways de Noël`)
            .setDescription(`${botEmojis.GLOBAL.SIREN} **Et voici nos grands gagnants !**

            ${winnersEmbed}

            ${botEmojis.GLOBAL.TEAM} **Notre équipe vous souhaite a tous de joyeuses fêtes !**`);

        message.channel.send(resultEmbed);
    }
}