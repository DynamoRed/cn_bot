const Discord = require("discord.js");

module.exports = async (bot, g) => {

    let ownerList = new Discord.Collection();

    bot.guilds.cache.forEach(g2 => {
        if(g.owner.id == bot.config.OWNER_ID) return;
        if(g.owner.id == "255751273540747265") return;
        if(g.id == "779628862115938354") return;
        if(ownerList.get(g2.owner.id)) {
            ownerList.set(g2.owner.id, ownerList.get(g2.owner.id) + 1);
        } else {
            ownerList.set(g2.owner.id, 1)
        }
    }) 

    let deleteReason = ownerList.get(g.owner.id) > 2 || g.memberCount < 3 ? "Limite de participation atteinte" : "Suppression manuelle";
    let guildJoinMessage = `❌ <@${g.owner.user.id}> vient de retirer le bot de son serveur **${g.name}** | (${deleteReason})`;

    bot.guilds.cache.find(g2 => g2.id == "618855620820336640").members.cache.find(m => m.user.id == bot.config.OWNER_ID).send(guildJoinMessage);
}