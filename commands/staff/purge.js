const Discord = require('discord.js');
module.exports = {
    name: "purge",
    description: "Supprime un certains nombres de messages d'un channel",
    category: "staff",
    timeout: 10000,
    enabled: true,
    restrictions: ["staff"],
    aliases: ["clear"],
    run: async (bot, message, args, botEmojis, hasNoTheRight) => {
        if (hasNoTheRight) return;

        if(!message.member.roles.cache.find(r => r.name.toLowerCase() == "staff")) {
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.RED)
                .setFooter(`Message auto-supprimé dans 5 secondes`)
                .setDescription(`<@${message.author.id}> **vous n'avez pas la permission de faire ca**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 5 * 1000)
            return;
        }
        
        if(isNaN(args[0])){
            return;   
        }

        const fetched = await message.channel.messages.fetch({limit: args[0]});

        let logEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor(bot.config.COLORS.BLURPLE)
            .setDescription(`<@${message.author.id}> a supprimé ${args[0]} messages dans <#${message.channel.id}>`);
        message.guild.channels.cache.find(c => c.id == bot.config.I_CHANNELS.LOGS).send(logEmbed);

        message.author.send(new Discord.MessageEmbed().setColor(bot.config.COLORS.GREEN).addField(`**${fetched.size}** messages supprimés avec succès !`, "Evenement enregistré dans les logs..."));

        message.channel.bulkDelete(fetched)
            .catch(e => message.channel.send(`Erreur: ${e}`));
    }
}