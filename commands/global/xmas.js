const Discord = require('discord.js');
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min+1)+min);
}

module.exports = {
    name: "xmas",
    description: "XMas Deco on Discord",
    category: "global",
    timeout: 0,
    enabled: true,
    restrictions: [""],
    aliases: [],
    run: async (bot, message, args, botEmojis) => {

        let m = message.guild.members.cache.find(m => m.user.id == message.author.id);
        let xmasEmojis = ["🎄","🎅","⛄"];
        let lastXmasEmojis = ["🎄","🎅","❄️","🎁","⛄"];
        let rdmEmoji = xmasEmojis[randomNumber(0, xmasEmojis.length - 1)];
        let name = m.nickname ? m.nickname : m.user.username;
        lastXmasEmojis.forEach(le => {
            name = name.startsWith(le + " ") ? name.slice((le + " ").length) : name;
        });
        m.edit({
            nick: `${rdmEmoji} ${name}`
        }, "XMas Deco");
    }
}