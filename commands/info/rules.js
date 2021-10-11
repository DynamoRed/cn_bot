const Discord = require('discord.js');
const DiscordButtons = require('discord-buttons');

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
        const attachment = new Discord.MessageAttachment('./resources/images/rules_banner.png', 'rules_banner.png');
        let rules1Embed = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BLURPLE)
            .attachFiles(attachment)
            .setImage("attachment://rules_banner.png");

        message.channel.send(rules1Embed).then(() => {
            let rules2Embed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.BLURPLE)
                .setTitle(`:clipboard: Règlement de Conoda Roleplay`)
                .setDescription(`${botEmojis.NUMBERS._1} Nous vous demandons de faire appel à votre bon sens !

                ${botEmojis.NUMBERS._2} Les publicités sont évidemment interdites, dans votre intérêt personnel comme pour celui des autres.
                
                ${botEmojis.NUMBERS._3} Tout abus quel qu'il soit sera sanctionné par un bannissement permanent de nos plateformes.
                
                ${botEmojis.NUMBERS._4} Merci de respecter le but des différents salons, tout usage abusif pourra être sanctionné.
                
                ${botEmojis.NUMBERS._5} Votre comportement doit être correct, et ne doit montrer aucun message à caractère sexuel, discriminatoire, raciste, homophobe, haineux, violent, xénophobe ou sexiste.
                
                ${botEmojis.NUMBERS._6} Toute diffusion d’informations personnelles (Nom réel, adresse IP, mot de passe…) est strictement interdite et sera sanctionnée par un bannissement définitif de nos plateformes.
                
                ${botEmojis.NUMBERS._7} Le français est la seule langue autorisée sur Conoda Roleplay (Désolé a nos amis anglophones 🙂).

                ${botEmojis.NUMBERS._8} Votre nom doit être le même que sur le serveur. (Il est géré automatiquement par nos bots et ne doit pas être modifié par une tierce personne)

                ${botEmojis.GLOBAL.TEAM} **Veillez a respecter ce règlement sous peine de sanctions**`);

            let discordRulesButton = new DiscordButtons.MessageButton()
                .setLabel("Réglement Discord")
                .setStyle("url")
                .setURL(`https://forum.conoda-roleplay.fr/thread/0000000/0000000`)

            let ingameRulesButton = new DiscordButtons.MessageButton()
                .setLabel("Réglement DarkRP")
                .setStyle("url")
                .setURL(`https://forum.conoda-roleplay.fr/thread/0000000/0000000`)

            let forumRulesButton = new DiscordButtons.MessageButton()
                .setLabel("Réglement Forum")
                .setStyle("url")
                .setURL(`https://forum.conoda-roleplay.fr/thread/0000000/0000000`)

            let row = new DiscordButtons.MessageActionRow()
                .addComponent(discordRulesButton)
                .addComponent(ingameRulesButton)
                .addComponent(forumRulesButton);

            message.channel.send('', {
                component: row,
                embed: rules2Embed
            });
        });
    }
}