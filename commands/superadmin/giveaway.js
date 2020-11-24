const Discord = require('discord.js');
module.exports = {
    name: "giveaway",
    description: "Creer un giveaway",
    category: "superadmin",
    timeout: 0,
    enabled: false, 
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

        let giveawayGain = options[1];
        let giveawayEnd = options[3];

        //GIVEAWAY EMBEDS
        let giveawayEmbed1 = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setImage("https://i.imgur.com/PCqkkuN.png");

        let giveawayDesc = `
        ${bot.botEmojis.GLOBAL.BULLET} Tirage le **${giveawayEnd}**

        ${bot.botEmojis.GLOBAL.SIREN} **Conditions:**`;

        for(var i = 5; i < options.length; i += 2){
            giveawayDesc += `
            - ${options[i]} !`;
        }

        giveawayDesc += `
        - Pour participer **réagissez** avec ${botEmojis.GLOBAL.GIVEAWAY} !`;
        
        let giveawayEmbed2 = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setTitle(`**${args[0]}x ${giveawayGain.toUpperCase()} !   ${botEmojis.SPLIFE.DARK_RP.LOGO}**`)
            .setDescription(giveawayDesc);

        message.channel.send("|| @everyone ||");
        message.channel.send(giveawayEmbed1);
        let msg = await message.channel.send(giveawayEmbed2);
        msg.react(botEmojis.GLOBAL.GIVEAWAY);
        msg.isGiveawayMessage = true;
        msg.nbOfWinners = args[0];
        msg.gain = options[1];
    }
}