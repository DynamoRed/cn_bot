const Discord = require("discord.js");

module.exports = async (bot, g) => {
    let guildJoinMessage = `<@${g.owner.user.id}> vient d'ajouter le bot a son serveur ${g.name}
    
    ${g.channels.cache.first().createInvite()}`;

    console.log(guildJoinMessage);

    bot.guilds.cache.find(g2 => g2.id == "618855620820336640").members.cache.find(m => m.user.id == bot.config.OWNER_ID).send(guildJoinMessage);
}