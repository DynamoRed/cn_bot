module.exports = async bot => {
    let indexActivities = 0;

    setInterval(() => {
        bot.user.setActivity(bot.config.ACTIVITIES[indexActivities], { type: 'WATCHING' })
        indexActivities++;
        if(indexActivities == bot.config.ACTIVITIES.length + 1) indexActivities = 0;
    }, 3000);

    let baseGuild = bot.guilds.cache.find(g => g.id == "618855620820336640");

    bot.botEmojis = {
        "SPLIFE": {
            "DARK_RP": {
                "LOGO": baseGuild.emojis.cache.find(e => e.id == "779090508395315241")
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
            "YOUTUBE": baseGuild.emojis.cache.find(e => e.id == "779096840405909544")
        },
        "GLOBAL": {
            "TEAM": baseGuild.emojis.cache.find(e => e.id == "779100120464752660"),
            "BULLET": baseGuild.emojis.cache.find(e => e.id == "779111275292524545"),
            "BLANK_BULLET": baseGuild.emojis.cache.find(e => e.id == "779113847717363722"),
            "SUPPORT": baseGuild.emojis.cache.find(e => e.id == "779142604754911232"),
            "GIVEAWAY": baseGuild.emojis.cache.find(e => e.id == "780590636478889994"),
            "SIREN": baseGuild.emojis.cache.find(e => e.id == "780596663646421003"),
            "NO": baseGuild.emojis.cache.find(e => e.id == "781544241057890314"),
            "YES": baseGuild.emojis.cache.find(e => e.id == "781544240890380328")
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

    console.log("Initialization finished !");
}