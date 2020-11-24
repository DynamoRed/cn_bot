const Discord = require('discord.js');
module.exports = {
    name: "giveaway",
    description: "Creer un giveaway",
    category: "superadmin",
    timeout: 0,
    enabled: true,
    restrictions: ["staff+"],
    aliases: ["gaway", "givea", "ga"],
    run: async (bot, message, args, botEmojis) => {
        let options = message.content.slice(bot.config.PREFIX.length).trim().split(`"`);
        if(options.length < 5){
            return;
        }
        if(isNaN(args[0])){
            return;
        }
        console.log(options);

        let giveawayGain = options[1];
        let giveawayEnd = options[3];

        //GIVEAWAY EMBEDS
        let giveawayEmbed1 = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setImage("https://i.imgur.com/PCqkkuN.png");
        
        let giveawayEmbed2 = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setTitle(`**${args[0]}x ${giveawayGain.toUpperCase()} ! ${botEmojis.SPLIFE.DARK_RP.LOGO}**`)
            .setDescription(`
            ${bot.botEmojis.GLOBAL.BULLET} Tirage le ${giveawayEnd}

            ${bot.botEmojis.GLOBAL.BULLET} Pour participer réagissez avec ${botEmojis.GLOBAL.GIVEAWAY} !`);

        message.channel.send(giveawayEmbed1);
        let msg = await message.channel.send(giveawayEmbed2);
        msg.react(botEmojis.GLOBAL.GIVEAWAY);
    }
}