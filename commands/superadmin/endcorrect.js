const Discord = require('discord.js');
module.exports = {
    name: "endcorrect",
    description: "Finir la correction d'un test d'entrée dans le staff d'un joueur",
    category: "superadmin",
    timeout: 0,
    enabled: true,
    restrictions: ["staff+"],
    aliases: ["ec"],
    run: async (bot, message, args, botEmojis) => {
        if(!message.channel.isStaffTestChannel) return;
        if(message.channel.testIsStarted) return;
        if(!message.channel.testStaffResult) return;

        var replyEmbed = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.ALLOW)
            .setDescription(`Note Finale: ${message.channel.testStaffResult}`);
        message.channel.send(replyEmbed);
    }
}