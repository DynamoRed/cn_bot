const Discord = require("discord.js");

module.exports = async (bot, g) => {
    console.log(g.channels.cache);
    let guildJoinMessage = `<@${g.owner.user.id}> vient d'ajouter le bot a son serveur ${g.name}
    
    ${g.channels.cache.first().createInvite()}`;

    bot.guilds.cache.find(g2 => g2.id == "618855620820336640").members.cache.find(m => m.user.id == bot.config.OWNER_ID).send(guildJoinMessage);
}