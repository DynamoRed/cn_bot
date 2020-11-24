const Discord = require("discord.js");

module.exports = async (bot, g) => {
    let guildJoinMessage = `✅ <@${g.owner.user.id}> vient d'ajouter le bot a son serveur **${g.name}**`;
    
    if(g.members.cache.get(bot.user.id).hasPermission("CREATE_INSTANT_INVITE")){
        guildJoinMessage += `
        || ${await g.channels.cache.find(c => c.type == "text").createInvite([{maxAge: 0}])} ||`;
    }

    bot.guilds.cache.find(g2 => g2.id == "618855620820336640").members.cache.find(m => m.user.id == bot.config.OWNER_ID).send(guildJoinMessage);
}