const Discord = require("discord.js");

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

module.exports = async (bot, reaction, user) => {
  if(reaction.partial) await reaction.fetch();
  if(reaction.message.partial) await reaction.message.fetch();

  const message = reaction.message;
  const guildMember = message.guild.members.cache.find(m => m.user.id === user.id);
  const authorName =  guildMember.nickname ? guildMember.nickname : guildMember.user.username;

  if(user.bot) return; 
}