const Discord = require('discord.js');
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min+1)+min);
}

module.exports = {
    name: "xmas",
    description: "XMas Mode on Discord",
    category: "dynamo",
    timeout: 0,
    enabled: true,
    restrictions: [""],
    aliases: ["christmas", "noel"],
    run: async (bot, message, args, botEmojis) => {
        if(message.author.id != bot.config.OWNER_ID){
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.DENY)
                .setFooter(`Message auto-supprimé dans 5 secondes`)
                .setDescription(`<@${message.author.id}> **vous n'avez pas la permission de faire ca**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 5 * 1000)
            return;
        }

        message.guild.members.cache.forEach(m => {
            if (!m.roles.cache.find(r => r.name === "Staff")) return;
            let xmasEmojis = ["🎄","🎅","❄️","🎁","⛄"];
            let rdmEmoji = xmasEmojis[randomNumber(0, xmasEmojis.length)];
            m.edit({
                nick: `${rdmEmoji} ${m.nickname ? m.nickname : m.user.username}`
            }, "XMas Deco");
        });
    }
}