const Discord = require('discord.js');
const fs = require('fs');
const { isBuffer } = require('util');

module.exports = {
    name: "badges",
    description: "Parcourir ces badges ou ceux d'un autre",
    category: "global",
    timeout: 60000,
    enabled: true,
    restrictions: [""],
    aliases: ["b", "badge"],
    run: async (bot, message, args, botEmojis) => {
        if(message.channel.id != bot.config.I_CHANNELS.COMMANDS && !message.member.roles.cache.find(r => r.name.toLowerCase().includes("staff+"))){
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.DENY)
                .setFooter(`Message auto-supprimé dans 5 secondes`)
                .setDescription(`<@${message.author.id}> **cette commande n'est utilisable que dans le salon <#${bot.config.I_CHANNELS.COMMANDS}>**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 5 * 1000)
            return;
        }

        let mentionned = message.mentions.users.first();
        if(args.length == 0){
            console.log(message.author.mfa_enabled);
            bot.db.query(`SELECT * FROM discord_badges WHERE badge_owner='${message.author.id}'`, async function(err, results){
                if (err) throw err;
                if(results != undefined && results.length != 0){
                    let badge = bot.badges.get(results[0].badge_name);
                    let obtainedDate =  results[0].badge_get_at;
                    obtainedDate = obtainedDate.split("-");
                    obtainedDate = `${obtainedDate[0]}/${obtainedDate[1]}/${obtainedDate[2]} ${obtainedDate[3]}:${obtainedDate[4]}`
                    var badgeEmbed = new Discord.MessageEmbed()
                        .setColor(bot.config.COLORS.BASE)
                        .setThumbnail(`https://www.raphael-biron.fr/projets/splife/badges/${badge.category}/${badge.id}.png`)
                        .setFooter(`Badge 1/${results.length} | Obtenu le ${obtainedDate}`)
                        .setTitle(`➢ ${badge.name}`)
                        .setAuthor(`Badges de ${message.author.username}`, message.author.avatarURL())
                        .setDescription(`*${badge.description}*
                        `)
                    let badgeMessage = await message.channel.send(badgeEmbed);
                    if(results.length > 1){
                        badgeMessage.react("◀");
                        badgeMessage.react("▶");
                        badgeMessage.results = results;
                        badgeMessage.actualPage = 1;
                        badgeMessage.whoRequest = message.author;
                        badgeMessage.canChangePage = true;
                        badgeMessage.whoIsRequest = message.author;
                        setTimeout(() => {
                            if(badgeMessage.actualPage != 1) return;
                            badgeMessage.reactions.removeAll();
                            badgeMessage.canChangePage = false;
                        }, 15 * 1000)
                    }
                    return;
                } else {
                    var replyEmbed = new Discord.MessageEmbed()
                        .setColor(bot.config.COLORS.DENY)
                        .setFooter(`Message auto-supprimé dans 5 secondes`)
                        .setDescription(`<@${message.author.id}> **vous n'avez aucun badge !**`)
                    let msg = await message.channel.send(replyEmbed);
                    setTimeout(() => {msg.delete()}, 5 * 1000)
                    return;
                }
            })
        } else if(args.length == 1){
                if(mentionned){
                    bot.db.query(`SELECT * FROM discord_badges WHERE badge_owner='${mentionned.id}'`, async function(err, results){
                        if (err) throw err;
                        if(results != undefined && results.length != 0){
                            let badge = bot.badges.get(results[0].badge_name);
                            let obtainedDate =  results[0].badge_get_at;
                            obtainedDate = obtainedDate.split("-");
                            obtainedDate = `${obtainedDate[0]}/${obtainedDate[1]}/${obtainedDate[2]} ${obtainedDate[3]}:${obtainedDate[4]}`
                            var badgeEmbed = new Discord.MessageEmbed()
                                .setColor(bot.config.COLORS.BASE)
                                .setThumbnail(`https://www.raphael-biron.fr/projets/splife/badges/${badge.category}/${badge.id}.png`)
                                .setFooter(`Badge 1/${results.length} | Obtenu le ${obtainedDate}`)
                                .setTitle(`➢ ${badge.name}`)
                                .setAuthor(`Badges de ${mentionned.username}`, mentionned.avatarURL())
                                .setDescription(`*${badge.description}*
                                `)
                            let badgeMessage = await message.channel.send(badgeEmbed);
                            if(results.length > 1){
                                badgeMessage.react("◀");
                                badgeMessage.react("▶");
                                badgeMessage.results = results;
                                badgeMessage.actualPage = 1;
                                badgeMessage.whoRequest = message.author;
                                badgeMessage.canChangePage = true;
                                badgeMessage.whoIsRequest = mentionned;
                                setTimeout(() => {
                                    if(badgeMessage.actualPage != 1) return;
                                    badgeMessage.reactions.removeAll();
                                    badgeMessage.canChangePage = false;
                                }, 15 * 1000)
                            }
                            return;
                        } else {
                            var replyEmbed = new Discord.MessageEmbed()
                                .setColor(bot.config.COLORS.DENY)
                                .setFooter(`Message auto-supprimé dans 5 secondes`)
                                .setDescription(`<@${mentionned.id}> **n'a aucun badge !**`)
                            let msg = await message.channel.send(replyEmbed);
                            setTimeout(() => {msg.delete()}, 5 * 1000)
                            return;
                        }
                    })
                } else {
                    var replyEmbed = new Discord.MessageEmbed()
                        .setColor(bot.config.COLORS.DENY)
                        .setFooter(`Message auto-supprimé dans 5 secondes`)
                        .setDescription(`<@${message.author.id}> **le membre spécifié n'a pas pu être trouvé !**`)
                    let msg = await message.channel.send(replyEmbed);
                    setTimeout(() => {msg.delete()}, 5 * 1000)
                    return;
                }

        } else if(args.length == 3){
                if(!message.member.roles.cache.find(r => r.name.toLowerCase().includes("staff+"))) {
                    var replyEmbed = new Discord.MessageEmbed()
                        .setColor(bot.config.COLORS.DENY)
                        .setFooter(`Message auto-supprimé dans 5 secondes`)
                        .setDescription(`<@${message.author.id}> **vous n'avez pas la permission de faire ca**`)
                    let msg = await message.channel.send(replyEmbed);
                    setTimeout(() => {msg.delete()}, 5 * 1000)
                    return;
                }

                args[2] = args[2].toLowerCase();
                args[0] = args[0].toLowerCase();

                if(message.author.id != bot.config.OWNER_ID){
                    if(args[2] == "bot_creator" || args[2] == "secret_phrase"){
                        var replyEmbed = new Discord.MessageEmbed()
                            .setColor(bot.config.COLORS.DENY)
                            .setFooter(`Message auto-supprimé dans 5 secondes`)
                            .setDescription(`<@${message.author.id}> **vous n'avez pas la permission de faire ca**`)
                        let msg = await message.channel.send(replyEmbed);
                        setTimeout(() => {msg.delete()}, 5 * 1000)
                        return;
                    }
                }

                if(args[0] == "add"){
                    if(mentionned){
                        if(!bot.badges.get(args[2])){
                            var replyEmbed = new Discord.MessageEmbed()
                                .setColor(bot.config.COLORS.DENY)
                                .setFooter(`Message auto-supprimé dans 5 secondes`)
                                .setDescription(`<@${message.author.id}> **ce badge n'a pas pu être trouvé !**`)
                            let msg = await message.channel.send(replyEmbed);
                            setTimeout(() => {msg.delete()}, 5 * 1000)
                            return;
                        }

                        bot.db.query(`SELECT * FROM discord_badges WHERE badge_owner='${mentionned.id}' AND badge_name='${args[2]}'`, async function(err, results){
                            if (err) throw err;
                            if(results != undefined && results.length != 0){
                                var replyEmbed = new Discord.MessageEmbed()
                                    .setColor(bot.config.COLORS.DENY)
                                    .setFooter(`Message auto-supprimé dans 5 secondes`)
                                    .setDescription(`<@${message.author.id}> **ce membre a déjà ce badge !**`)
                                let msg = await message.channel.send(replyEmbed);
                                setTimeout(() => {msg.delete()}, 5 * 1000)
                                return;
                            } else {
                                let obtainedDate = new Date();
                                obtainedDate = obtainedDate.toLocaleString('en-GB', { timeZone: 'Europe/Paris' });
                                let hours = parseInt(obtainedDate.split(",")[1].split(":")[0]);
                                if(obtainedDate.split(",")[1].split(":")[2].includes("PM")){
                                    hours = hours + 12;
                                    if(hours == 24){
                                        hours = 0;
                                    }
                                }
                                obtainedDate = [obtainedDate.split(",")[0].split("/")[1],
                                obtainedDate.split(",")[0].split("/")[0],
                                obtainedDate.split(",")[0].split("/")[2],
                                hours,
                                obtainedDate.split(",")[1].split(":")[1]];
                                obtainedDate = obtainedDate.join("-");

                                bot.db.query(`INSERT INTO discord_badges (badge_name, badge_get_at, badge_owner) VALUES ('${args[2]}', '${obtainedDate}', '${mentionned.id}')`, async function(err, results){
                                    if (err){
                                        throw err
                                    } else {
                                        var replyEmbed = new Discord.MessageEmbed()
                                            .setColor(bot.config.COLORS.ALLOW)
                                            .setFooter(`Message auto-supprimé dans 5 secondes`)
                                            .setDescription(`<@${message.author.id}> **badge ajouté avec succès !**`)
                                        let msg = await message.channel.send(replyEmbed);
                                        setTimeout(() => {msg.delete()}, 5 * 1000)

                                        var confirmEmbed = new Discord.MessageEmbed()
                                            .setColor(bot.config.COLORS.ALLOW)
                                            .setFooter("Consultez vos badges avec !badges")
                                            .setDescription(`<@${mentionned.id}> **vous venez d'acquerir le badge __${bot.badges.get(args[2]).name}__**`)
                                        let confirmMessage = await mentionned.send(confirmEmbed);
                                        return;
                                    }
                                })
                            }
                        })
                    } else {
                        var replyEmbed = new Discord.MessageEmbed()
                            .setColor(bot.config.COLORS.DENY)
                            .setFooter(`Message auto-supprimé dans 5 secondes`)
                            .setDescription(`<@${message.author.id}> **le membre spécifié n'a pas pu être trouvé !**`)
                        let msg = await message.channel.send(replyEmbed);
                        setTimeout(() => {msg.delete()}, 5 * 1000)
                        return;
                    }
                } else if(args[0] == "remove"){
                    if(mentionned){
                        if(!bot.badges.get(args[2])){
                            var replyEmbed = new Discord.MessageEmbed()
                                .setColor(bot.config.COLORS.DENY)
                                .setFooter(`Message auto-supprimé dans 5 secondes`)
                                .setDescription(`<@${message.author.id}> **ce badge n'a pas pu être trouvé !**`)
                            let msg = await message.channel.send(replyEmbed);
                            setTimeout(() => {msg.delete()}, 5 * 1000)
                            return;
                        }

                        bot.db.query(`SELECT * FROM discord_badges WHERE badge_owner='${mentionned.id}' AND badge_name='${args[2]}'`, async function(err, results){
                            if (err) throw err;
                            if(results === undefined || results.length == 0){
                                var replyEmbed = new Discord.MessageEmbed()
                                    .setColor(bot.config.COLORS.DENY)
                                    .setFooter(`Message auto-supprimé dans 5 secondes`)
                                    .setDescription(`<@${message.author.id}> **ce membre n'a pas ce badge !**`)
                                let msg = await message.channel.send(replyEmbed);
                                setTimeout(() => {msg.delete()}, 5 * 1000)
                                return;
                            } else {
                                bot.db.query(`DELETE FROM discord_badges WHERE badge_name='${args[2]}' AND badge_owner='${mentionned.id}'`, async function(err, results){
                                    if (err){
                                        throw err
                                    } else {
                                        var replyEmbed = new Discord.MessageEmbed()
                                            .setColor(bot.config.COLORS.ALLOW)
                                            .setFooter(`Message auto-supprimé dans 5 secondes`)
                                            .setDescription(`<@${message.author.id}> **badge supprimé avec succès !**`)
                                        let msg = await message.channel.send(replyEmbed);
                                        setTimeout(() => {msg.delete()}, 5 * 1000)
                                        var confirmEmbed = new Discord.MessageEmbed()
                                            .setColor(bot.config.COLORS.DENY)
                                            .setFooter("Consultez vos badges avec !badges")
                                            .setDescription(`<@${mentionned.id}> **vous venez de perdre le badge __${bot.badges.get(args[2]).name}__**`)
                                        let confirmMessage = await mentionned.send(confirmEmbed);
                                        return;
                                    }
                                })
                            }
                        })
                    } else {
                        var replyEmbed = new Discord.MessageEmbed()
                            .setColor(bot.config.COLORS.DENY)
                            .setFooter(`Message auto-supprimé dans 5 secondes`)
                            .setDescription(`<@${message.author.id}> **le membre spécifié n'a pas pu être trouvé !**`)
                        let msg = await message.channel.send(replyEmbed);
                        setTimeout(() => {msg.delete()}, 5 * 1000)
                        return;
                    }
                } else {
                    var replyEmbed = new Discord.MessageEmbed()
                        .setColor(bot.config.COLORS.DENY)
                        .setFooter(`Message auto-supprimé dans 5 secondes`)
                        .setDescription(`<@${message.author.id}> **cette commande est incorrecte !**`)
                    let msg = await message.channel.send(replyEmbed);
                    setTimeout(() => {msg.delete()}, 5 * 1000)
                    return;
                }
        } else {

        }
    }
}