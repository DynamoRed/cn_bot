const Discord = require('discord.js');
module.exports = {
    name: "set",
    description: "Permet de parametrer son serveur",
    category: "superadmin",
    timeout: 0,
    enabled: true,
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
            console.log("11")
            if(args[0].toLowerCase() == "help"){
                console.log("22")
                let setHelpEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.BASE)
                    .setTitle(`Paramètres`)
                    .setThumbnail(`http://icons.iconarchive.com/icons/dtafalonso/android-l/512/Settings-L-icon.png`);

                bot.config.CONFIGURABLE_CHANNELS.forEach(c => {
                    setHelpEmbed.addField(`${c.name}`, `${c.description}`);
                })
                
                message.channel.send(setHelpEmbed);
            } else {
                console.log("22")
                if(bot.config.CONFIGURABLE_CHANNELS.includes(args[0])){

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