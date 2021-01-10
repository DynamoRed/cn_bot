const Discord = require("discord.js");

module.exports = async (bot, g) => {
    let deleteReason = g.memberCount < 3 ? "Pas assez de membres" : "Suppression manuelle";
    let guildJoinMessage = `❌ <@${g.owner.user.id}> vient de retirer le bot de son serveur **${g.name}** | (${deleteReason})`;

    bot.guilds.cache.find(g2 => g2.id == "618855620820336640").members.cache.find(m => m.user.id == bot.config.OWNER_ID).send(guildJoinMessage);
}