const Discord = require('discord.js');
module.exports = {
    name: "startcorrect",
    description: "Demarrer la correction d'un test d'entrée dans le staff d'un joueur",
    category: "superadmin",
    timeout: 0,
    enabled: true,
    restrictions: ["staff+"],
    aliases: ["sc"],
    run: async (bot, message, args, botEmojis) => {
        if(!message.channel.isStaffTestChannel) return;
        if(message.channel.testIsStarted) return;
        if(!message.channel.staffTestResp) return;

        message.channels.messages.cache.forEach(m => {
            if(!m.embeds) return;
            if(!m.embeds[0].title) return;
            if(!m.embeds[0].title.startsWith("Question N°")) return;
            m.react(bot.botEmojis.GLOBAL.YES);
            m.react(bot.botEmojis.GLOBAL.NO);
        });

        var replyEmbed = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.ALLOW)
            .setDescription(`Début de la correction par <@${message.channel.staffTestResp.id}>...`);
        message.channel.send(replyEmbed);

        message.channel.testStaffResult = 0;
    }
}