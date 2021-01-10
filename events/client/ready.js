const Discord = require('discord.js');
const ascii = require('ascii-table');

module.exports = async bot => {
    let indexActivities = 0;

    setInterval(() => {
        bot.user.setActivity(bot.config.ACTIVITIES[indexActivities], { type: 'WATCHING' })
        indexActivities++;
        if(indexActivities == bot.config.ACTIVITIES.length + 1) indexActivities = 0;
    }, 3000);

    bot.user.setPresence({ status: 'online' });
    
    let baseGuild = bot.guilds.cache.find(g => g.id == "618855620820336640");

    bot.botEmojis = { 
        "SPLIFE": {
            "DARK_RP": {
                "LOGO": baseGuild.emojis.cache.find(e => e.id == "779090508395315241"),
                "XMAS_LOGO": baseGuild.emojis.cache.find(e => e.id == "783514983836942376")
            },
            "PRISON_RP": {
                "LOGO": baseGuild.emojis.cache.find(e => e.id == "779090505333604372")
            },
            "SCP_RP": {
                "LOGO": baseGuild.emojis.cache.find(e => e.id == "779090513277878302")
            }
        },
        "SOCIAL_NETWORK": {
            "TOP_SERVEUR": baseGuild.emojis.cache.find(e => e.id == "779097325154992198"),
            "DISCORD": baseGuild.emojis.cache.find(e => e.id == "779096837034082325"),
            "STEAM": baseGuild.emojis.cache.find(e => e.id == "779097848355880980"),
            "YOUTUBE": baseGuild.emojis.cache.find(e => e.id == "779096840405909544"),
            "GITHUB": baseGuild.emojis.cache.find(e => e.id == "796137519544533029")
        },
        "GLOBAL": {
            "TEAM": baseGuild.emojis.cache.find(e => e.id == "779100120464752660"),
            "BULLET": baseGuild.emojis.cache.find(e => e.id == "779111275292524545"),
            "BLANK_BULLET": baseGuild.emojis.cache.find(e => e.id == "779113847717363722"),
            "SUPPORT": baseGuild.emojis.cache.find(e => e.id == "779142604754911232"),
            "GIVEAWAY": baseGuild.emojis.cache.find(e => e.id == "780590636478889994"),
            "SIREN": baseGuild.emojis.cache.find(e => e.id == "780596663646421003"),
            "NO": baseGuild.emojis.cache.find(e => e.id == "781544241057890314"),
            "YES": baseGuild.emojis.cache.find(e => e.id == "781544240890380328"),
            "VERIFIED": baseGuild.emojis.cache.find(e => e.id == "779430348521996329")
        },
        "NUMBERS": {
            "_1": baseGuild.emojis.cache.find(e => e.id == "779107503480111145"),
            "_2": baseGuild.emojis.cache.find(e => e.id == "779107536736485397"),
            "_3": baseGuild.emojis.cache.find(e => e.id == "779107549038247938"),
            "_4": baseGuild.emojis.cache.find(e => e.id == "779107547516764180"),
            "_5": baseGuild.emojis.cache.find(e => e.id == "779107547478884362"),
            "_6": baseGuild.emojis.cache.find(e => e.id == "779107549680238622"),
            "_7": baseGuild.emojis.cache.find(e => e.id == "779107548271869973"),
            "_8": baseGuild.emojis.cache.find(e => e.id == "779107548815949845"),
            "_9": baseGuild.emojis.cache.find(e => e.id == "779107549646422026"),
            "_10": baseGuild.emojis.cache.find(e => e.id == "779107543481450531")
        },
        "BOOST": {
            "HAND": baseGuild.emojis.cache.find(e => e.id == "779116891599142932"),
            "HAND_REVERSE": baseGuild.emojis.cache.find(e => e.id == "779116900037820426"),
            "BOOST": baseGuild.emojis.cache.find(e => e.id == "779116901632311348")
        }
    }

    bot.db = bot.mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : "splife"
    });
    
    bot.isOfficialServer = function(id){
        let result = false;
        for(v in bot.config.OFFICIALS_SERVERS){
            if(bot.config.OFFICIALS_SERVERS[v] == id) result = true;
        }
        return result;
    }

    bot.db.connect(function(err) {
        if (err) throw err;
        console.log("Connecté à la base de données MySQL!");
    });

    bot.getServerColor = function(id){
        let result;
        bot.db.query(`SELECT server_color FROM servers_config WHERE server_id='${id}'`, async function(err, results){
            if (err) throw err;
            if(results != undefined && results.length == 1){
                result = results[0];
            } else {
                result = bot.config.COLORS.BASE;
            }
        })
        return result;
    }

    bot.getServerChannel = function(id, referTo){
        let result;
        bot.db.query(`SELECT channel_id FROM servers_channels_config WHERE server_id="${id}" AND refer_to="${referTo}"`, async function(err, results){
            if (err) throw err;
            if(results != undefined && results.length == 1){
                console.log(results)
                console.log(results[0])
                result = results[0];
            } else {
                result = undefined;
            }
        })
        return result;
    }

    bot.setServerChannel = function(id, referTo, channelId){
        let result = false;
        bot.db.query(`SELECT * FROM servers_channels_config WHERE server_id='${id}' and refer_to=${referTo}`, async function(err, results){
            if (err) throw err;
            if(results != undefined && results.length == 1){
                bot.db.query(`UPDATE servers_channels_config SET channel_id='${channelId}' WHERE server_id='${id}' and refer_to='${referTo}'`, async function(err, results){
                    if (err){
                        throw err;
                    } else {
                        result = true;
                    }
                })
            } else {
                bot.db.query(`INSERT INTO servers_channels_config (server_id, channel_id, refer_to) VALUES ('${id}', '${channelId}', '${referTo}')`, async function(err, results){
                    if (err){
                        throw err;
                    } else {
                        result = true;
                    }
                })
            }
        })
        return result;
    }

    bot.guilds.cache.forEach(g => {
        if(!g.name.includes("DarkRP")) return
        let memberStatChannel = bot.getServerChannel(g.id, "members_stat");
        console.log(memberStatChannel + " POUR " + g.name)
        if(memberStatChannel != undefined) {
            console.log(memberStatChannel + " 11")
            g.channels.cache.get(memberStatChannel).setName(`👥 Membres: ${g.memberCount}`, "Actualisation Stats");
        }

        let staffStatChannel = bot.getServerChannel(g.id, "staff_stat");
        if(staffStatChannel != undefined) {
            g.channels.cache.get(staffStatChannel).setName(`👮 Staffs: ${g.memberCount}`, "Actualisation Stats");
        }
    }) 

    bot.guilds.cache.find(g => g.id == "693198481086480544").members.cache.forEach(m => {
        if(m.roles.cache.find(r => r.name.toLowerCase() == "staff" || r.name.toLowerCase().includes("staff+"))){
            bot.db.query(`SELECT * FROM discord_badges WHERE badge_owner='${m.user.id}' AND badge_name='staff'`, async function(err, results){
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

                    bot.db.query(`INSERT INTO discord_badges (badge_name, badge_get_at, badge_owner) VALUES ('staff', '${obtainedDate}', '${m.user.id}')`, async function(err, results){
                        if (err){
                            throw err
                        } else {
                            var confirmEmbed = new Discord.MessageEmbed()
                                .setColor(bot.config.COLORS.ALLOW)
                                .setFooter("Consultez vos badges avec !badges")
                                .setDescription(`<@${m.user.id}> **vous venez d'acquerir le badge __Staff__**`)
                            let confirmMessage = await m.user.send(confirmEmbed);
                            return;
                        }
                    })
                }
            })
        }

        if(m.roles.cache.find(r => r.name.toLowerCase().includes("youtuber"))){
            bot.db.query(`SELECT * FROM discord_badges WHERE badge_owner='${m.user.id}' AND badge_name='youtuber'`, async function(err, results){
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

                    bot.db.query(`INSERT INTO discord_badges (badge_name, badge_get_at, badge_owner) VALUES ('youtuber', '${obtainedDate}', '${m.user.id}')`, async function(err, results){
                        if (err){
                            throw err
                        } else {
                            var confirmEmbed = new Discord.MessageEmbed()
                                .setColor(bot.config.COLORS.ALLOW)
                                .setFooter("Consultez vos badges avec !badges")
                                .setDescription(`<@${m.user.id}> **vous venez d'acquerir le badge __Vidéaste__**`)
                            let confirmMessage = await m.user.send(confirmEmbed);
                            return;
                        }
                    })
                }
            })
        }

        if(m.roles.cache.find(r => r.name.toLowerCase() == "ancien staff")){
            bot.db.query(`SELECT * FROM discord_badges WHERE badge_owner='${m.user.id}' AND badge_name='old_staff'`, async function(err, results){
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

                    bot.db.query(`INSERT INTO discord_badges (badge_name, badge_get_at, badge_owner) VALUES ('old_staff', '${obtainedDate}', '${m.user.id}')`, async function(err, results){
                        if (err){
                            throw err
                        } else {
                            var confirmEmbed = new Discord.MessageEmbed()
                                .setColor(bot.config.COLORS.ALLOW)
                                .setFooter("Consultez vos badges avec !badges")
                                .setDescription(`<@${m.user.id}> **vous venez d'acquerir le badge __Vieux Croulant__**`)
                            let confirmMessage = await m.user.send(confirmEmbed);
                            return;
                        }
                    })
                }
            })
        }

        if(m.roles.cache.find(r => r.name.toLowerCase() == "spbooster")){
            bot.db.query(`SELECT * FROM discord_badges WHERE badge_owner='${m.user.id}' AND badge_name='booster'`, async function(err, results){
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

                    bot.db.query(`INSERT INTO discord_badges (badge_name, badge_get_at, badge_owner) VALUES ('booster', '${obtainedDate}', '${m.user.id}')`, async function(err, results){
                        if (err){
                            throw err
                        } else {
                            var confirmEmbed = new Discord.MessageEmbed()
                                .setColor(bot.config.COLORS.ALLOW)
                                .setFooter("Consultez vos badges avec !badges")
                                .setDescription(`<@${m.user.id}> **vous venez d'acquerir le badge __Booster__**`)
                            let confirmMessage = await m.user.send(confirmEmbed);
                            return;
                        }
                    })
                }
            })
        }
    })
 
    console.log("Initialization finished !");
}