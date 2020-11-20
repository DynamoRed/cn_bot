const Discord = require('discord.js');
module.exports = {
    name: "rules",
    description: "Affiche notre règlement",
    category: "info",
    timeout: 120000,
    enabled: true,
    restrictions: [""],
    aliases: ["rule", "reglement"],
    run: async (bot, message, args, botEmojis) => {

        let informationsMessages = new Discord.Collection();

        //RULES EMBEDS
        informationsMessages.set("rules_1", new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setImage("https://i.imgur.com/lUnhcZx.png"));

        informationsMessages.set("rules_2", new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setTitle(`:clipboard: Règlement de SPLife`)
            .setDescription(`${botEmojis.NUMBERS._1} Nous vous demandons de faire appel à votre bon sens !
            ${botEmojis.NUMBERS._2} Les publicités sont évidemment interdites, dans votre intérêt personnel comme pour celui des autres.
            ${botEmojis.NUMBERS._3} Tout abus quel qu'il soit sera sanctionné par un bannissement permanent de SPLife.
            ${botEmojis.NUMBERS._4} Merci de respecter le but des différents salons, tout usage abusif pourra être sanctionné.
            ${botEmojis.NUMBERS._5} Votre comportement doit être correct, et ne doit montrer aucun message à caractère sexuel, discriminatoire, raciste, homophobe, haineux, violent, xénophobe ou sexiste.
            ${botEmojis.NUMBERS._6} Toute diffusion d’informations personnelles (Nom réel, adresse IP, mot de passe…) est strictement interdite et sera sanctionnée par un bannissement définitif de SPLife.
            ${botEmojis.NUMBERS._7} Le français est la seule langue autorisée sur SPLife.
            ${botEmojis.NUMBERS._8} Votre nom doit être le même que sur le serveur.
            ${botEmojis.NUMBERS._9} Le règlement présent [ICI](https://splifecommunity.mtxserv.com/index.php?threads/règlement-général.113/): s'applique, pour ce qui concerne le comportement, sur ce discord.
            
            ${botEmojis.GLOBAL.TEAM} **Veillez a respecter ce règlement sous peine de sanctions**`));

        for(let msg of informationsMessages){
            message.channel.send(msg);
        } 
    }
}