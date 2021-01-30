const Discord = require('discord.js');

function JSONArrayInclude(array, value){
    let result = false;
    for(v in array){
        if(v == value) result = true;
    }
    return result;
}

module.exports = {
    name: "set",
    description: "Permet de parametrer son serveur",
    category: "superadmin",
    timeout: 0,
    enabled: false,
    restrictions: ["staff+"],
    aliases: [],
    run: async (bot, message, args, botEmojis) => {
        if(args.length != 2 && args[0].toLowerCase() != "help"){
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.DENY)
                .setFooter(`Message auto-supprimé dans 10 secondes`)
                .setDescription(`<@${message.author.id}> **commande incorrecte ! Faites __!set help__ pour plus d'informations**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 10 * 1000)
            return;
        } else {
            if(args[0].toLowerCase() == "help"){
                let setHelpEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.BASE)
                    .setTitle(`Paramètres`)
                    .setDescription(`**__Commande principale:__** !set <parametre> <ID du channel cible>
                    **Pour recuperer l'id d'un channel: **
                    *- Activez le mode developpeur sur Discord
                    - Faites Clic Droit sur le channel
                    - Cliquez sur "Copier l'identifiant"*`)
                    .setThumbnail(`http://icons.iconarchive.com/icons/dtafalonso/android-l/512/Settings-L-icon.png`);

                for(c in bot.config.CONFIGURABLE_CHANNELS){
                    setHelpEmbed.addField(`${c}`, `${bot.config.CONFIGURABLE_CHANNELS[c].description}`);
                }
                
                message.channel.send(setHelpEmbed);
            } else {
                if(JSONArrayInclude(bot.config.CONFIGURABLE_CHANNELS, args[0])){
                    if(args[1].length != 18){
                        var replyEmbed = new Discord.MessageEmbed()
                            .setColor(bot.config.COLORS.DENY)
                            .setFooter(`Message auto-supprimé dans 10 secondes`)
                            .setDescription(`<@${message.author.id}> **cet ID n'est pas valide !**`)
                        let msg = await message.channel.send(replyEmbed);
                        setTimeout(() => {msg.delete()}, 10 * 1000)
                        return;
                    } else {
                        let channelInGuild = message.guild.channels.cache.get(args[1]);
                        if(channelInGuild){
                            bot.setServerChannel(message.guild.id, args[0].toLowerCase(), args[1]);
                            var replyEmbed = new Discord.MessageEmbed()
                                .setColor(bot.config.COLORS.ALLOW)
                                .setFooter(`Message auto-supprimé dans 10 secondes`)
                                .setDescription(`<@${message.author.id}> **paramètre enregistré avec succès !**`)
                            let msg = await message.channel.send(replyEmbed);
                            setTimeout(() => {msg.delete()}, 10 * 1000)
                            return;
                        } else {
                            var replyEmbed = new Discord.MessageEmbed()
                                .setColor(bot.config.COLORS.DENY)
                                .setFooter(`Message auto-supprimé dans 10 secondes`)
                                .setDescription(`<@${message.author.id}> **cet ID ne correspond a aucun channel sur ce serveur !**`)
                            let msg = await message.channel.send(replyEmbed);
                            setTimeout(() => {msg.delete()}, 10 * 1000)
                            return;
                        }
                    }
                } else {
                    var replyEmbed = new Discord.MessageEmbed()
                        .setColor(bot.config.COLORS.DENY)
                        .setFooter(`Message auto-supprimé dans 10 secondes`)
                        .setDescription(`<@${message.author.id}> **ce parametre n'est pas configurable/valable ! Faites __!set help__ pour plus d'informations**`)
                    let msg = await message.channel.send(replyEmbed);
                    setTimeout(() => {msg.delete()}, 10 * 1000)
                    return;
                }
            }
        }
    }
}