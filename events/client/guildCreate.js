const Discord = require("discord.js");

module.exports = async (bot, g) => {

    let ownerList = new Discord.Collection();

    bot.guilds.cache.forEach(g2 => {
        if(g.owner.id == bot.config.OWNER_ID) return;
        if(g.owner.id == "255751273540747265") return;
        if(g.id == "779628862115938354") return;
        if(g2.owner.id != g.owner.id) return;
        if(ownerList.get(g.owner.id)) {
            ownerList.set(g.owner.id, ownerList.get(g.owner.id) + 1);
        } else {
            ownerList.set(g.owner.id, 1)
        }
    }) 

    if(ownerList.get(g.owner.id) > 2 || g.memberCount < 3){
        var replyEmbed = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.DENY)
            .setDescription(`<@${g.owner.id}> **notre bot n'a pas pu etre ajouté a votre serveur. Soit vous avez atteints le nombre maximal de participation soit il n'y a pas assez de membres dans votre serveur discord !**`)
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