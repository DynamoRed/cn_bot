const Discord = require("discord.js");
module.exports = async (bot, reaction, user) => {
    if(reaction.partial) await reaction.fetch();
    if(reaction.message.partial) await reaction.message.fetch();

    const message = reaction.message;
    const guildMember = message.guild.members.cache.find(m => m.user.id === user.id);
    const authorName =  guildMember.nickname ? guildMember.nickname : guildMember.user.username;

    if(user.bot) return; 

    if(message.channel.id == bot.config.I_CHANNELS.REUNION_VOTES){
        if(reaction.emoji != bot.botEmojis.GLOBAL.YES && reaction.emoji != bot.botEmojis.GLOBAL.NO){
            reaction.users.remove(user);
            return;
        }

        message.channel.messages.fetch({ limit: 1 }).then(messages => {
            const lastMessage = messages.first();
            if(lastMessage != message){
                reaction.users.remove(user);
                return;
            }
        }).catch(err => {console.error(err)})
    }
}