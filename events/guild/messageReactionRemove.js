const Discord = require("discord.js");
module.exports = async (bot, reaction, user) => {
    if(reaction.partial) await reaction.fetch();
    if(reaction.message.partial) await reaction.message.fetch();

    const message = reaction.message;

    if(user.bot) return; 
    if(!message) return;
    if(!message.guild) return;

    const guildMember = message.guild.members.cache.find(m => m.user.id === user.id);
    const authorName =  guildMember.nickname ? guildMember.nickname : guildMember.user.username;    

    if(message.guild.id != "693198481086480544" && message.guild.id != "618855620820336640"){
        return;
    }

    if(message.channel.id == bot.config.I_CHANNELS.REUNION_VOTES){
        if(!message.content.startsWith("https://")) return;
        message.channel.messages.fetch({ limit: 1 }).then(messages => {
            const lastMessage = messages.first();
            if(lastMessage != message){
                return false;
            }
        }).catch(err => {console.error(err)})
    }
}