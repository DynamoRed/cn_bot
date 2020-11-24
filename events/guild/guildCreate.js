const Discord = require("discord.js");

module.exports = (bot, g) => {
    let guildJoinMessage = `<@${g.owner.user.id}> vient d'ajouter le bot a son serveur ${g.name}
    
    ${await g.channels.cache.first().createInvite()}`;

    bot.guilds.cache.find(g => g.id == "618855620820336640").members.cache.find(m => m.id == bot.config.OWNER_ID).send(guildJoinMessage);
}