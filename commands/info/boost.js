const Discord = require('discord.js');
const DiscordButtons = require('discord-buttons');

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
        const attachment = new Discord.MessageAttachment('./resources/images/booster_banner.png', 'booster_banner.png');
        let booster1Embed = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BLURPLE)
            .attachFiles(attachment)
            .setImage("attachment://booster_banner.png");

        message.channel.send(booster1Embed).then(() => {
            let booster2Embed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.BLURPLE)
                .setTitle(`${botEmojis.BOOST.HAND}${botEmojis.BOOST.BOOST}${botEmojis.BOOST.HAND_REVERSE} Booster notre serveur Discord revient à:`)
                .setDescription(`${botEmojis.GLOBAL.BULLET} Avoir une super couleur Rose pétante !
                ${botEmojis.GLOBAL.BULLET} Avoir 2x plus de chance de gagner a un giveaway !
                ${botEmojis.GLOBAL.BULLET} Avoir accès a un channel avec des giveaways exclusifs pour des gens stylés !${botEmojis.GLOBAL.BLANK_BULLET}
                ${botEmojis.GLOBAL.BULLET} Avoir 5% de réduction sur notre boutique !
                ${botEmojis.GLOBAL.BULLET} Participer a des soirées jeux avec nos Staffs !
                ${botEmojis.GLOBAL.BULLET} Être au courant des nouveautés en avance !
                
                ${botEmojis.GLOBAL.TEAM} **Pour réobtenir ces informations a tous moments, faites !boost**`);
    
            message.channel.send(booster2Embed);
        })
    }
}