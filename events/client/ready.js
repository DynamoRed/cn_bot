const Discord = require('discord.js');
const ascii = require('ascii-table');
const http = require('http');
const formidable = require('formidable');
const { type } = require('os');

module.exports = async bot => {
    let indexActivities = 0; 

    setInterval(() => {
        bot.user.setActivity(bot.config.ACTIVITIES[indexActivities], { type: 'WATCHING' })
        indexActivities++;
        if(indexActivities == bot.config.ACTIVITIES.length + 1) indexActivities = 0;
    }, 3000);

    bot.user.setPresence({ status: 'online' });
    
    let baseGuild = bot.guilds.cache.find(g => g.id == "618855620820336640");

    function verificationProcessForUser(user_id){
        let member = bot.guilds.cache.get("701635848164081685").members.cache.find(m => m.id == user_id);
        if(member){
            member.roles.add(bot.config.I_ROLES.VERIFIED, "");
            let memberVerificationConfirmationEmbed = new Discord.MessageEmbed() 
                .setColor(bot.config.COLORS.GREEN)
                .setTitle(`✅ Compte vérifié !`)
                .setDescription(`_Vous pouvez désormais acceder a tous notre discord._`);
            member.send(memberVerificationConfirmationEmbed);

            let memberAddEmbed = new Discord.MessageEmbed() 
                .setColor(bot.config.COLORS.BLURPLE)
                .setTitle(`:inbox_tray: Nouveau Membre !`)
                .setDescription(`<@${member.user.id}> vient d'arriver sur notre discord ! :fire:`);
            member.guild.channels.cache.get("701635851725176878").send(memberAddEmbed);
        }
    }

    var server = http.createServer( function(req, res){
        if(res.socket.remoteAddress == '::ffff:127.0.0.1') {
            if(req.method == 'POST') {   
                var data = '';
                req.on('data', chunk => {
                    data += chunk;
                });
                req.on('end', () => {
                    let json_data = { "status": "success", "error": "" }
                    res.writeHead(200, [[ "Content-Type", "text/plain"]]);
                    res.write(JSON.stringify(json_data));
                    res.end();
                    data = JSON.parse(data);
                    let user_id = data['user_id'];
                    verificationProcessForUser(user_id);
                });
            }
        } else {
            let json_data = { "status": "failed", "error": "Authorization Required" }
            res.writeHead(200, [[ "Content-Type", "text/plain"]]);
            res.write(JSON.stringify(json_data));
            res.end();
        }
    });

    try {
        server.close();
    } catch(e){ throw e; }

    server.listen(8080);
    console.log("Listen Server Started !");

    bot.botEmojis = { 
        "SOCIAL_NETWORK": {
            "TOP_SERVEUR": baseGuild.emojis.cache.find(e => e.id == "779097325154992198"),
            "DISCORD": baseGuild.emojis.cache.find(e => e.id == "779096837034082325"),
            "STEAM": baseGuild.emojis.cache.find(e => e.id == "779097848355880980"),
            "YOUTUBE": baseGuild.emojis.cache.find(e => e.id == "779096840405909544"),
            "GITHUB": baseGuild.emojis.cache.find(e => e.id == "796137519544533029")
        },
        "GLOBAL": {
            "TEAM": baseGuild.emojis.cache.find(e => e.id == "779100120464752660"),
            "BULLET": baseGuild.emojis.cache.find(e => e.id == "854493775577350174"),
            "BLANK_BULLET": baseGuild.emojis.cache.find(e => e.id == "779113847717363722"),
            "SUPPORT": baseGuild.emojis.cache.find(e => e.id == "779142604754911232"),
            "GIVEAWAY": baseGuild.emojis.cache.find(e => e.id == "780590636478889994"),
            "SIREN": baseGuild.emojis.cache.find(e => e.id == "780596663646421003"),
            "NO": baseGuild.emojis.cache.find(e => e.id == "781544241057890314"),
            "YES": baseGuild.emojis.cache.find(e => e.id == "781544240890380328"),
            "VERIFIED": baseGuild.emojis.cache.find(e => e.id == "779430348521996329"),
            "LOGO": baseGuild.emojis.cache.find(e => e.id == "815717270034579517")
        },
        "NUMBERS": {
            "_1": baseGuild.emojis.cache.find(e => e.id == "842495372207194113"),
            "_2": baseGuild.emojis.cache.find(e => e.id == "842495372256346142"),
            "_3": baseGuild.emojis.cache.find(e => e.id == "842495372269977620"),
            "_4": baseGuild.emojis.cache.find(e => e.id == "842495372365791252"),
            "_5": baseGuild.emojis.cache.find(e => e.id == "842495516612100146"),
            "_6": baseGuild.emojis.cache.find(e => e.id == "842495372135366667"),
            "_7": baseGuild.emojis.cache.find(e => e.id == "842495372067733517"),
            "_8": baseGuild.emojis.cache.find(e => e.id == "842495372453609482"),
            "_9": baseGuild.emojis.cache.find(e => e.id == "842495372467109968"),
            "_10": baseGuild.emojis.cache.find(e => e.id == "842495372333285406")
        },
        "BOOST": {
            "HAND": baseGuild.emojis.cache.find(e => e.id == "779116891599142932"),
            "HAND_REVERSE": baseGuild.emojis.cache.find(e => e.id == "779116900037820426"),
            "BOOST": baseGuild.emojis.cache.find(e => e.id == "779116901632311348")
        },

    }

    bot.db = bot.mysql.createConnection({
        host: "*******",
        user: "*******",
        password: "*******",
        database : "*******"
    });
    
    bot.db.connect(function(err) {
        if (err) throw err;
        console.log("Connected to database !");
    });
 
    console.log("Initialization finished !");

    bot.guilds.cache.first().members.cache.get(bot.config.OWNER_ID).send("Initialization finished !");
}