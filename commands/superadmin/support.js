const Discord = require('discord.js');
module.exports = {
    name: "support",
    description: "Affiche le message du système ticket du support",
    category: "superadmin",
    timeout: 0,
    enabled: true,
    restrictions: ["staff+"],
    aliases: ["ticket", "tickets"],
    run: async (bot, message, args, botEmojis) => {

        if(!message.member.roles.cache.find(r => r.name.toLowerCase() == "staff+")) {
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.DENY)
                .setFooter(`Message auto-supprimé dans 5 secondes`)
                .setDescription(`<@${message.author.id}> **vous n'avez pas la permission de faire ca**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 5 * 1000)
            return;
        }
        
        //SUPPORT EMBEDS
        let supportEmbed1 = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setImage("https://i.imgur.com/fgC47lv.png");

        let supportEmbed2 = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setTitle(`${bot.botEmojis.GLOBAL.SUPPORT} Support`)
            .setDescription(`${bot.botEmojis.GLOBAL.BULLET} Pour contacter notre équipe de modération il vous suffit de cliquer sur :envelope_with_arrow: en dessous de ce message.
            :pushpin: Merci de ne pas utiliser inutilement ce système sous peine de sanctions !`);

        message.channel.send(supportEmbed1);
        let msg = await message.channel.send(supportEmbed2);
        msg.react("📩");
    }
}