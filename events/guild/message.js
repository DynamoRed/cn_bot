const Timeout = new Set();
const ms = require('ms');
const Discord = require("discord.js");

module.exports = async (bot, message) => {
    if(message.author.bot) return;

    if(message.channel.id == bot.config.I_CHANNELS.PATCH_NOTES){
        //PATCH-NOTE EMBEDS
        let patchNoteEmbed1 = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setImage("https://i.imgur.com/3hanxio.png");

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
            
        let patchNoteEmbed2 = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setTitle(`:loudspeaker: Patch-Note du ${dd}/${mm}/${yyyy}`)
            .setDescription(`${botEmojis.GLOBAL.BULLET} ${message.content}`);

        message.channel.send(patchNoteEmbed1);
        message.channel.send(patchNoteEmbed2);
        message.delete();
        return;
    }

    if(!message.content.startsWith(bot.config.PREFIX)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(bot.config.PREFIX.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0) return;
    let command = bot.commands.get(cmd);
    if(!command) command = bot.commands.get(bot.aliases.get(cmd));
    if(command){
        message.delete();
        if(!command.enabled){
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.DENY)
                .setFooter(`Message auto-supprimé dans 5 secondes`)
                .setDescription(`<@${message.author.id}> **cette commande est désactivée !**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 5 * 1000)
            return;
        }
        if(command.timeout){
            if(Timeout.has(`${message.author.id}${command.name}`)){
                var replyEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.DENY)
                    .setFooter(`Message auto-supprimé dans 5 secondes`)
                    .setDescription(`<@${message.author.id}> **vous devez attendre ${ms(command.timeout)} avant d'utiliser cette commande**`)
                let msg = await message.channel.send(replyEmbed);
                setTimeout(() => {msg.delete()}, 5 * 1000)
                return;
            } else {
                Timeout.add(`${message.author.id}${command.name}`);
                setTimeout(() => {
                    Timeout.delete(`${message.author.id}${command.name}`)
                }, command.timeout);
            }
        }
        if(message.author.id != bot.config.OWNER_ID){
            if(command.restrictions != [""]){
                command.restrictions.forEach(async restriction => {
                    if(!message.member.roles.cache.find(r => r.name.toLowerCase().includes(restriction))) {
                        var replyEmbed = new Discord.MessageEmbed()
                            .setColor(bot.config.COLORS.DENY)
                            .setFooter(`Message auto-supprimé dans 5 secondes`)
                            .setDescription(`<@${message.author.id}> **vous n'avez pas la permission de faire ca**`)
                        let msg = await message.channel.send(replyEmbed);
                        setTimeout(() => {msg.delete()}, 5 * 1000)
                        return;
                    }
                })
            } 
        }
        command.run(bot, message, args, bot.botEmojis);
    }
}