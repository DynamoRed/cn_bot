const Discord = require('discord.js');
const snekfetch = require('snekfetch');
module.exports = {
    name: "staffcard",
    description: "Affiche/Creer la carte d'identité d'un staff",
    category: "superadmin",
    timeout: 0,
    enabled: false,
    restrictions: ["staff+"],
    aliases: ["sc", "staffc", "scard"],
    run: async (bot, message, args, botEmojis) => {

        if(!message.member.roles.cache.find(r => r.name.toLowerCase() == "staff+")) {
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.DENY)
                .setFooter(`Message auto-supprimé dans 5 secondes`)
                .setDescription(`<@${message.author.id}> **vous n'avez pas la permission de faire ca**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 5 * 1000)
            return;
        }
        
        if(!args[0]){
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.DENY)
                .setFooter(`Message auto-supprimé dans 5 secondes`)
                .setDescription(`<@${message.author.id}> **vous devez mentionner un membre en premier argument**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 5 * 1000)
            return;
        }

        if(!args[1]){
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.DENY)
                .setFooter(`Message auto-supprimé dans 5 secondes`)
                .setDescription(`<@${message.author.id}> **vous devez ecrire une SteamID64 correct en second argument**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 5 * 1000)
            return;
        }

        let mentionnedStaff = message.mentions.users.first();

        let steamId64 = args[1];
        let link = `https://steamidapi.uk/request.php?api=test&player=${args[1]}&request_type=1&format=json`;
        let steamId = "STEAM_0:0:000000000";
        let steamName = "XXXXXXXXXXXXX";
        let avatarUrl = "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png";
        let profileUrl = `https://steamcommunity.com/profiles/${steamId64}/`;

        snekfetch.get(link).then(async r => {
            let body = r.body;
            if(!body){
                var replyEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.DENY)
                    .setFooter(`Message auto-supprimé dans 5 secondes`)
                    .setDescription(`<@${message.author.id}> **une erreur est survenue !**`)
                let msg = await message.channel.send(replyEmbed);
                setTimeout(() => {msg.delete()}, 5 * 1000)
                return;
            }
            let profileInfos = body.profile;
            if(!profileInfos){
                var replyEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.DENY)
                    .setFooter(`Message auto-supprimé dans 5 secondes`)
                    .setDescription(`<@${message.author.id}> **une erreur est survenue !**`)
                let msg = await message.channel.send(replyEmbed);
                setTimeout(() => {msg.delete()}, 5 * 1000)
                return;
            }
            steamId = profileInfos.steamid;
            steamName = profileInfos.playername;
            avatarUrl = profileInfos.avatar;

            //STAFFLIST EMBEDS
            let staffListEmbed1 = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.BASE)
                .setTitle(`${botEmojis.GLOBAL.TEAM} Carte Staff de ${mentionnedStaff.username}`)
                .addField('Tag Discord', `<@${mentionnedStaff.id}>`, true)
                .addField('Nom Steam', `${steamName}`, true)
                .addField('Steam ID64', `${steamId64}`, true)
                .addField('Steam ID', `${steamId}`, true)
                .addField('Profil Steam', `[Cliquez ici](${profileUrl})`, true)
                .setThumbnail(avatarUrl);

            message.channel.send(staffListEmbed1);
        })
    }
}