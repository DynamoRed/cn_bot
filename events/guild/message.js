const Timeout = new Set();
const ms = require('ms');
const Discord = require("discord.js");

module.exports = async (bot, message) => {
    if(message.author.bot) return;

    if(message.guild.id == "693198481086480544" || message.guild.id == "618855620820336640"){
        bot.db.query(`SELECT * FROM messages_stats WHERE author_id='${message.author.id}'`, async function(err, results){
            if (err) throw err;
            if(results != undefined && results.length != 0){
                bot.db.query(`UPDATE messages_stats SET count=${results[0].count + 1} WHERE author_id='${message.author.id}'`, async function(err, results){
                    if (err) throw err;
                })
                if(results[0].count + 1 == 500){
                    bot.db.query(`SELECT * FROM discord_badges WHERE badge_owner='${message.author.id}' AND badge_name='500_m_v2'`, async function(err, results){
                        if (err) throw err;
                        if(results != undefined && results.length != 0){
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
    
                            bot.db.query(`INSERT INTO discord_badges (badge_name, badge_get_at, badge_owner) VALUES ('500_m_v2', '${obtainedDate}', '${message.author.id}')`, async function(err, results){
                                if (err){
                                    throw err
                                } else {
                                    var confirmEmbed = new Discord.MessageEmbed()
                                        .setColor(bot.config.COLORS.ALLOW)
                                        .setFooter("Consultez vos badges avec !badges")
                                        .setDescription(`<@${message.author.id}> **vous venez d'acquerir le badge __${bot.badges.get("500_m_v2").name}__**`)
                                    let confirmMessage = await message.author.send(confirmEmbed);
                                    return;
                                }
                            })
                        }
                    })
                }
    
                if(results[0].count + 1 == 1000){
                    bot.db.query(`SELECT * FROM discord_badges WHERE badge_owner='${message.author.id}' AND badge_name='1000_m_v2'`, async function(err, results){
                        if (err) throw err;
                        if(results != undefined && results.length != 0){
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
    
                            bot.db.query(`INSERT INTO discord_badges (badge_name, badge_get_at, badge_owner) VALUES ('1000_m_v2', '${obtainedDate}', '${message.author.id}')`, async function(err, results){
                                if (err){
                                    throw err
                                } else {
                                    var confirmEmbed = new Discord.MessageEmbed()
                                        .setColor(bot.config.COLORS.ALLOW)
                                        .setFooter("Consultez vos badges avec !badges")
                                        .setDescription(`<@${message.author.id}> **vous venez d'acquerir le badge __${bot.badges.get("1000_m_v2").name}__**`)
                                    let confirmMessage = await message.author.send(confirmEmbed);
                                    return;
                                }
                            })
                        }
                    })
                }
    
                if(results[0].count + 1 == 2000){
                    bot.db.query(`SELECT * FROM discord_badges WHERE badge_owner='${message.author.id}' AND badge_name='2000_m_v2'`, async function(err, results){
                        if (err) throw err;
                        if(results != undefined && results.length != 0){
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
    
                            bot.db.query(`INSERT INTO discord_badges (badge_name, badge_get_at, badge_owner) VALUES ('2000_m_v2', '${obtainedDate}', '${message.author.id}')`, async function(err, results){
                                if (err){
                                    throw err
                                } else {
                                    var confirmEmbed = new Discord.MessageEmbed()
                                        .setColor(bot.config.COLORS.ALLOW)
                                        .setFooter("Consultez vos badges avec !badges")
                                        .setDescription(`<@${message.author.id}> **vous venez d'acquerir le badge __${bot.badges.get("2000_m_v2").name}__**`)
                                    let confirmMessage = await message.author.send(confirmEmbed);
                                    return;
                                }
                            })
                        }
                    })
                }
            } else {
                bot.db.query(`INSERT INTO messages_stats (author_id, count) VALUES ('${message.author.id}', '1')`, async function(err, results){
                    if (err) throw err;
                })
            }
        })
    }

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
            .setDescription(`${bot.botEmojis.GLOBAL.BULLET} ${message.content}`);

        message.channel.send(patchNoteEmbed1);
        message.channel.send(patchNoteEmbed2);
        message.delete();
        return;
    }

    if(message.channel.id == bot.config.I_CHANNELS.BOOSTS){
        if(message.type ==  "USER_PREMIUM_GUILD_SUBSCRIPTION"
        || message.type ==  "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1"
        || message.type ==  "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2"
        || message.type ==  "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3"){
            bot.db.query(`SELECT * FROM discord_badges WHERE badge_owner='${message.author.id}' AND badge_name='booster'`, async function(err, results){
                if (err) throw err;
                if(results != undefined && results.length != 0){
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

                    bot.db.query(`INSERT INTO discord_badges (badge_name, badge_get_at, badge_owner) VALUES ('booster', '${obtainedDate}', '${message.author.id}')`, async function(err, results){
                        if (err){
                            throw err
                        } else {
                            var confirmEmbed = new Discord.MessageEmbed()
                                .setColor(bot.config.COLORS.ALLOW)
                                .setFooter("Consultez vos badges avec !badges")
                                .setDescription(`<@${mentionned.id}> **vous venez d'acquerir le badge __Booster__**`)
                            let confirmMessage = await mentionned.send(confirmEmbed);
                            return;
                        }
                    })
                }
            })
            return;
        }
    }

    if(message.channel.id == bot.config.I_CHANNELS.REUNION_VOTES){
        if(message.content.startsWith("https://")){
            message.react(bot.botEmojis.GLOBAL.NO);
            message.react(bot.botEmojis.GLOBAL.YES);
        }
    }

    if(message.channel.name.startsWith("test-staff-de-")){
        if(message.guild.id != "693198481086480544" && message.guild.id != "618855620820336640"){
            return;
        } 

        if(message.content.startsWith(bot.config.PREFIX)) return;
        if(!message.channel.isStaffTestChannel) return;
        if(!message.channel.isTested) return;
        if(!message.channel.quizQuestions) return;
        if(!message.channel.isTested.testQuestion) return;
        if(message.channel.waitingAnswerType != "RC") return;
        if(message.author != message.channel.isTested) return;
        if(!message.channel.testIsStarted) return;
        if(!message.channel.lastQuestionEmbed) return;

        message.delete();

        lastMessage = message.channel.lastQuestionEmbed;
        if(!lastMessage.embeds[0]) return;
        if(!lastMessage.embeds[0].description || !lastMessage.embeds[0].title) return;
        if(!lastMessage.embeds[0].title.startsWith("Question N°")) return;

        var questionAnsweredEmbed = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setTitle(`${lastMessage.embeds[0].title}`)
            .setDescription(`${lastMessage.embeds[0].description}

            ${bot.botEmojis.GLOBAL.BULLET} ***Réponse: ${message.content}***`)
            .setFooter(`Type de réponse: Réponse courte`);

        lastMessage.edit(questionAnsweredEmbed);

        if(message.channel.isTested.testQuestion == message.channel.testTotalQuestions){
            var testEndEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.BASE)
                .setTitle(`📩  Fin de votre Test d'entrée`)
                .setDescription(`Votre responsable de session (<@${message.channel.staffTestResp.id}>) va vous communiquer vos **résultats** sous peu.
                
                ${bot.botEmojis.GLOBAL.BULLET} **Ne discutez pas** du test tant que les autres n'ont **pas fini**. Sous peine de **retrait de points** !
                ${bot.botEmojis.GLOBAL.BULLET} Pour rappel: Il faut minimum **${message.channel.testTotalQuestions/2}/${message.channel.testTotalQuestions}** pour passer dans notre équipe !
                
                ${bot.botEmojis.GLOBAL.TEAM} _Reservé aux correcteur:_
                **Cliquez sur 🖊️ pour lancer le processus de correction !**
                ${bot.botEmojis.GLOBAL.YES} pour une bonne réponse !
                ${bot.botEmojis.GLOBAL.NO} pour une mauvaise réponse !`);

            let endMsg = await message.channel.send(testEndEmbed);

            endMsg.react("🖊️");
            
            message.channel.overwritePermissions([
                {deny: 'SEND_MESSAGES', id: message.channel.isTested},
                {deny: 'SEND_MESSAGES', id: bot.config.I_ROLES.SUPERADMIN},
                {deny: 'SEND_MESSAGES', id: bot.config.I_ROLES.ADMIN},
                {deny: 'ADD_REACTIONS', id: message.channel.isTested},
                {deny: 'ADD_REACTIONS', id: bot.config.I_ROLES.ADMIN},
                {deny: 'ADD_REACTIONS', id: bot.config.I_ROLES.SUPERADMIN},
                {allow: 'VIEW_CHANNEL', id: message.channel.isTested},
                {deny: 'VIEW_CHANNEL', id: bot.config.I_ROLES.ADMIN},
                {allow: 'VIEW_CHANNEL', id: bot.config.I_ROLES.SUPERADMIN},
                {deny: 'VIEW_CHANNEL', id: message.guild.id},
            ], '');

            message.channel.staffTestIsOpen = false;
            message.channel.testIsStarted = false;
            return;
        }

        let rdmNumber = Math.floor((Math.random() * (message.channel.quizQuestions.length - 1)) + 0);
        while(message.channel.answeredQuestions.includes(rdmNumber)){
            rdmNumber = Math.floor((Math.random() * (message.channel.quizQuestions.length - 1)) + 0);
        }
        let rdmQuestion = message.channel.quizQuestions[rdmNumber];
        message.channel.answeredQuestions[message.channel.isTested.testQuestion] = rdmNumber;

        let footerContent = `Type de réponse: `;
        let descriptionContent = `__${rdmQuestion.QUESTION}__`;

        if(rdmQuestion.ANSWER){
            let emojis = [bot.botEmojis.NUMBERS._1, 
                bot.botEmojis.NUMBERS._2, 
                bot.botEmojis.NUMBERS._3, 
                bot.botEmojis.NUMBERS._4, 
                bot.botEmojis.NUMBERS._5, 
                bot.botEmojis.NUMBERS._6, 
                bot.botEmojis.NUMBERS._7, 
                bot.botEmojis.NUMBERS._8, 
                bot.botEmojis.NUMBERS._9];

            let y = 0;
            rdmQuestion.ANSWER.forEach(a => {
                descriptionContent += `
                
                ${emojis[y]} ${a}`;
                y++;
            })
            footerContent += `QCM`;
        } else {
            message.channel.overwritePermissions([
                {allow: 'SEND_MESSAGES', id: message.channel.isTested},
                {deny: 'SEND_MESSAGES', id: bot.config.I_ROLES.SUPERADMIN},
                {deny: 'SEND_MESSAGES', id: bot.config.I_ROLES.ADMIN},
                {deny: 'ADD_REACTIONS', id: message.channel.isTested},
                {deny: 'ADD_REACTIONS', id: bot.config.I_ROLES.ADMIN},
                {deny: 'ADD_REACTIONS', id: bot.config.I_ROLES.SUPERADMIN},
                {allow: 'VIEW_CHANNEL', id: message.channel.isTested},
                {deny: 'VIEW_CHANNEL', id: bot.config.I_ROLES.ADMIN},
                {allow: 'VIEW_CHANNEL', id: bot.config.I_ROLES.SUPERADMIN},
                {deny: 'VIEW_CHANNEL', id: message.guild.id},
            ], '');
            footerContent += `Réponse courte`;
        }

        message.channel.isTested.testQuestion += 1;

        var questionEmbed = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setTitle(`Question N°${message.channel.isTested.testQuestion}`)
            .setDescription(descriptionContent)
            .setFooter(footerContent)

        let msg = await message.channel.send(questionEmbed);

        message.channel.lastQuestionEmbed = msg;
        message.channel.waitingAnswerType = "RC";

        if(rdmQuestion.ANSWER){
            message.channel.waitingAnswerType = "QCM";
            message.channel.lastQuestionEmbed.answer = rdmQuestion.ANSWER;
            let emojis = [bot.botEmojis.NUMBERS._1, 
                bot.botEmojis.NUMBERS._2, 
                bot.botEmojis.NUMBERS._3, 
                bot.botEmojis.NUMBERS._4, 
                bot.botEmojis.NUMBERS._5, 
                bot.botEmojis.NUMBERS._6, 
                bot.botEmojis.NUMBERS._7, 
                bot.botEmojis.NUMBERS._8, 
                bot.botEmojis.NUMBERS._9];

            let y = 0;
            rdmQuestion.ANSWER.forEach(a => {
                msg.react(emojis[y]);
                y++;
            })

            message.channel.overwritePermissions([
                {deny: 'SEND_MESSAGES', id: message.channel.isTested},
                {deny: 'SEND_MESSAGES', id: bot.config.I_ROLES.SUPERADMIN},
                {deny: 'SEND_MESSAGES', id: bot.config.I_ROLES.ADMIN},
                {deny: 'ADD_REACTIONS', id: message.channel.isTested},
                {deny: 'ADD_REACTIONS', id: bot.config.I_ROLES.ADMIN},
                {deny: 'ADD_REACTIONS', id: bot.config.I_ROLES.SUPERADMIN},
                {allow: 'VIEW_CHANNEL', id: message.channel.isTested},
                {deny: 'VIEW_CHANNEL', id: bot.config.I_ROLES.ADMIN},
                {allow: 'VIEW_CHANNEL', id: bot.config.I_ROLES.SUPERADMIN},
                {deny: 'VIEW_CHANNEL', id: message.guild.id},
            ], '');
        }
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
        if(command.name != "setac" && message.guild.id != "693198481086480544" && message.guild.id != "618855620820336640"){
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.DENY)
                .setFooter(`Message auto-supprimé dans 5 secondes`)
                .setDescription(`<@${message.author.id}> **cette commande n'est pas disponible sur ce serveur !**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 5 * 1000)
            return;
        }
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
            if(Timeout.has(`${message.author.id}${command.name}`) && !message.member.roles.cache.find(r => r.name.toLowerCase().includes("staff+"))){
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