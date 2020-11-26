const Discord = require("discord.js");
module.exports = async (bot, reaction, user) => {
    if(reaction.partial) await reaction.fetch();
    if(reaction.message.partial) await reaction.message.fetch();

    const message = reaction.message;
    const guildMember = message.guild.members.cache.find(m => m.user.id === user.id);
    const authorName =  guildMember.nickname ? guildMember.nickname : guildMember.user.username;

    if(user.bot) return; 
}