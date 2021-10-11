const Discord = require('discord.js');
module.exports = {
    name: "help",
    description: "Affiche les aides du bot",
    category: "global",
    timeout: 120000,
    enabled: true,
    restrictions: [""],
    aliases: ["aide"],
    run: async (bot, message, args, botEmojis) => {
        bot.categories.forEach(category => {
            let categoryConfig = require(`../${category}/category.json`);
            if(category == "dynamo") return;
            if(message.author.id != bot.config.OWNER_ID){
                if(categoryConfig.CATEGORY_RESTRICTION != ""){
                    if(!message.member.roles.cache.find(r => r.name.toLowerCase() == categoryConfig.CATEGORY_RESTRICTION)) {
                        return;
                    }
                } 
            }
            
            let categoryHelpEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.BLURPLE)
                .setTitle(`${categoryConfig.CATEGORY_TITLE}`)
                .setThumbnail(`${categoryConfig.CATEGORY_THUMBNAIL}`);

            bot.commands.forEach(command => {
                if(command.category != category) return;
                categoryHelpEmbed.addField(`${bot.config.PREFIX}${command.name}`, `${command.description}`);
            })
            
            message.author.send(categoryHelpEmbed);
        });
    }
}