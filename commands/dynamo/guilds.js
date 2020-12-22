const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "guilds",
    description: "All guilds of the bot",
    category: "dynamo",
    timeout: 0,
    enabled: true,
    restrictions: [""],
    aliases: [""],
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

        let botGuilds = bot.guilds.cache.sort((a, b) => b.memberCount > a.memberCount);
        let guildsString = ``;
        botGuilds.forEach(g => {
            guildsString += `${g.id} - ${g.memberCount} - ${g.owner.tag}\n`;
        })

        fs.writeFile('guilds.txt', guildsString, (error) => { 
            if (error) throw err; 
        }) 

        message.author.send({
            files: [{
              attachment: 'guilds.txt',
              name: 'guilds.txt'
            }]
          })
            .then(console.log)
            .catch(console.error);
    }
}