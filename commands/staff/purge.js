const Discord = require('discord.js');
module.exports = {
    name: "purge",
    description: "Supprime un certains nombres de messages d'un channel",
    category: "staff",
    timeout: 10000,
    enabled: true,
    restrictions: ["staff"],
    aliases: ["clear"],
    run: async (bot, message, args, botEmojis) => {
        if(isNaN(args[0])){
            return;   
        }

        const fetched = await message.channel.messages.fetch({limit: args[0]});

        let logEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor(bot.config.COLORS.BASE)
            .setDescription(`<@${message.author.id}> a supprimé ${args[0]} messages dans <#${message.channel.id}>`);
        message.guild.channels.cache.find(c => c.id == bot.config.I_CHANNELS.LOGS).send(logEmbed);

        message.author.send(new Discord.MessageEmbed().setColor(bot.config.COLORS.ALLOW).addField(`**${fetched.size}** messages supprimés avec succès !`, "Evenement enregistré dans les logs..."));

        message.channel.bulkDelete(fetched)
            .catch(e => message.channel.send(`Erreur: ${e}`));
    }
}