const Discord = require("discord.js");

module.exports = async (bot, g) => {

    let ownerList = new Discord.Collection();

    if( g.memberCount < 5){
        var replyEmbed = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.DENY)
            .setDescription(`<@${g.owner.id}> **notre bot n'a pas pu etre ajouté a votre serveur car il n'y a pas assez de membres dans votre serveur discord !**`)
        let msg = await g.owner.send(replyEmbed);
        g.leave();
        return;
    }

    let guildJoinMessage = `✅ <@${g.owner.user.id}> vient d'ajouter le bot a son serveur **${g.name}**`;
    
    if(g.members.cache.get(bot.user.id).hasPermission("CREATE_INSTANT_INVITE")){
        guildJoinMessage += `
        || ${await g.channels.cache.find(c => c.type == "text").createInvite([{maxAge: 0}])} ||`;
    }

    bot.guilds.cache.find(g2 => g2.id == "618855620820336640").members.cache.find(m => m.user.id == bot.config.OWNER_ID).send(guildJoinMessage);
}