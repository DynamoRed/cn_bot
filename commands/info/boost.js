const Discord = require('discord.js');
module.exports = {
    name: "boost",
    description: "Informations sur les Boosters Discord",
    category: "info",
    timeout: 120000,
    enabled: true, 
    restrictions: [""],
    aliases: ["boosters", "boosts", "booster"],
    run: async (bot, message, args, botEmojis) => {

        let informationsMessages = new Discord.Collection();

        //BOOSTER EMBEDS
        informationsMessages.set("booster_1", new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setImage("https://i.imgur.com/O6ROpXC.png"));

        informationsMessages.set("booster_2", new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setTitle(`${botEmojis.BOOST.HAND}${botEmojis.BOOST.BOOST}${botEmojis.BOOST.HAND_REVERSE} Booster notre serveur Discord revient à:`)
            .setDescription(`${botEmojis.GLOBAL.BULLET} Avoir une super couleur Rose pétante !
            ${botEmojis.GLOBAL.BULLET} Avoir 2x plus de chance de gagner a un giveaway !
            ${botEmojis.GLOBAL.BULLET} Avoir accès a un channel avec des giveaways exclusifs pour des gens stylés !
            ${botEmojis.GLOBAL.BULLET} Avoir 3.000.000$ IG par semaine !
            ${botEmojis.GLOBAL.BULLET} Être au courant des nouveautés en avance !${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}
            ${botEmojis.GLOBAL.TEAM} **Pour réobtenir ces informations a tous moments, faites !boost**`));

        for(let msg of informationsMessages){
            message.channel.send(msg);
        } 
    }
}