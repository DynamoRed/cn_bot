const Discord = require("discord.js");

module.exports = async (bot, g) => {
    let guildJoinMessage = `✅ <@${g.owner.user.id}> vient d'ajouter le bot a son serveur **${g.name}**`;
    
    console.log(g.members.cache.find(m => m.user == bot).user.username);
    if(g.members.cache.find(m => m.user == bot).hasPermission("CREATE_INSTANT_INVITE")){
        guildJoinMessage += `
        || ${await g.channels.cache.find(c => c.type == "text").createInvite([{maxAge: 0}])} ||`;
    }

    bot.guilds.cache.find(g2 => g2.id == "618855620820336640").members.cache.find(m => m.user.id == bot.config.OWNER_ID).send(guildJoinMessage);
}