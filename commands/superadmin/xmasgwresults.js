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

        for(var i = 0; i < 13; i++){
            let rdm = randomNumber(0, participants.length - 1);
            while(winners.includes(participants[rdm].id)){
                rdm = randomNumber(0, participants.length - 1);
            }
            winners[i] = participants[rdm].id;
            if(i == 0){
                let resultEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.BASE)
                    .setDescription(`:gift: @**${participants[rdm].user.tag}** remporte le **GRAND PACK DE NOËL**`);
                message.channel.send(resultEmbed);
            } else if(i <= 10){
                let resultEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.BASE)
                    .setDescription(`:gift: @**${participants[rdm].user.tag}** remporte **1 Discord Nitro Classic**`);
                message.channel.send(resultEmbed);
            } else {
                let resultEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.BASE)
                    .setDescription(`:gift: **<@${participants[rdm].user.tag}>** remporte **1 Grâde VIP**`);
                message.channel.send(resultEmbed);
            }
        }
    }
}