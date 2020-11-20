const Discord = require('discord.js');
module.exports = {
    name: "boost",
    description: "Restart Bot",
    category: "dynamo",
    timeout: 0,
    enabled: true,
    restrictions: [""],
    aliases: ["update"],
    run: async (bot, message, args, botEmojis) => {
        if(message.author.id != config.OWNER_ID){
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(config.COLORS.DENY)
                .setFooter(`Message auto-supprimé dans 5 secondes`)
                .setDescription(`<@${message.author.id}> **vous n'avez pas la permission de faire ca**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 5 * 1000)
            return;
        }

        console.log("Updating...");
        var replyEmbed = new Discord.MessageEmbed()
            .setColor(config.COLORS.ALLOW)
            .setFooter(`Message auto-supprimé dans 5 secondes`)
            .setDescription(`**Updating...**`)
        message.channel.send(replyEmbed).then(() => bot.destroy()).then(() => bot.login(bot.config.BOT_TOKEN));
    }
}