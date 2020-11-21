const Discord = require("discord.js");
module.exports = async (bot, reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();

    const message = reaction.message;
    const guildMember = message.guild.members.cache.find(m => m.user.id === user.id);
    const authorName =  guildMember.nickname ? guildMember.nickname : guildMember.user.username;

    if(user.bot) return; 

    if(message.channel.id == bot.config.I_CHANNELS.TICKETS){
        if(reaction.emoji.name == "📩"){
            message.guild.channels.create(`ticket-de-` + authorName, {
                type: 'text',
            }).then(async ch => {
                ch.updateOverwrite(ch.guild.roles.everyone, { VIEW_CHANNEL: false });
                ch.updateOverwrite(bot.config.I_ROLES.STAFF, { VIEW_CHANNEL: true });
                ch.updateOverwrite(user.id, { VIEW_CHANNEL: true });
                ch.send(`<@&${bot.config.I_ROLES.STAFF}>`);
                ch.ticketIsClosing = false;
                let ticketEmbed1 = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.BASE)
                    .setTitle(`🎫 Ticket Support de ${authorName}`)
                    .setDescription(`${bot.botEmojis.GLOBAL.BULLET} <@${user.id}> un membre de notre équipe arrive pour vous aider.
                    Merci de décrire clairement et avec détails votre soucis afin que la résolution de votre problème se fasse avec le plus rapidement possible !`);
                let msg = await ch.send(ticketEmbed1);
                msg.react(`🔐`);
                ch.setParent(bot.config.I_CHANNELS.TICKET_CATEGORY)
            });
            reaction.users.remove(user);
        }
    }

    if(message.channel.id == bot.config.I_CHANNELS.VERIFICATION){
        if(reaction.emoji.name == "✅"){
            message.guild.members.cache.find(m => m.user.id == user.id).roles.add(bot.config.I_ROLES.MEMBER, "");
            reaction.users.remove(user);
        }
    }

    if(message.channel.name.includes("ticket-de-")){
        if(reaction.emoji.name == "🔐"){
            if(message.channel.ticketIsClosing) return;
            reaction.users.remove(user);
            if(!message.guild.members.cache.find(m => m.user.id == user.id).roles.cache.find(r => r.id == bot.config.I_ROLES.STAFF)) {
                var replyEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.DENY)
                    .setFooter(`Message auto-supprimé dans 5 secondes`)
                    .setDescription(`<@${user.id}> **vous n'avez pas la permission de faire ca**`)
                let msg = await message.channel.send(replyEmbed);
                setTimeout(() => {msg.delete()}, 5 * 1000)
                return;
            }
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.DENY)
                .setDescription(`**Fermeture du ticket dans 10 secondes !**`)
            let msg = await message.channel.send(replyEmbed);
            message.channel.ticketIsClosing = true;
            setTimeout(() => {
                message.channel.delete()
            }, 10 * 1000)
           
        }
    }
}