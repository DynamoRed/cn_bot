const Discord = require('discord.js');
module.exports = {
    name: "informations",
    description: "Affiche les messages informatifs de bienvenue",
    category: "superadmin",
    timeout: 0,
    enabled: true,
    restrictions: ["staff+"],
    aliases: ["infos"],
    run: async (bot, message, args, botEmojis) => {

        let informationsMessages = new Discord.Collection();

        //WELCOME EMBEDS
        informationsMessages.set("welcome_1", new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setImage("https://i.imgur.com/co5rC3Q.png"));
 
        informationsMessages.set("welcome_2", new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setTitle(`${botEmojis.SPLIFE.DARK_RP.LOGO}  Bienvenue sur le discord de notre communauté DarkRP !`)
            .setDescription(`SPLife c'est 3 serveurs Garry's Mod Roleplay, une communauté de plusieurs centaines de membres et une équipe de staffs actives et a l'écoute !
            Afin de vous proposer une experience nouvelle, nous vous proposons des addons exclusifs, des animations quasi quotidiennes et des giveaways réguliers !

            Sur discord, nous vous proposons de multiples salons dédiés pour le plaisir de tous. Cette plateforme est notre principale moyen de communication; N'oubliez pas de rester a l'affût !

            :link: **Utilitaires:**
            
            ${botEmojis.SOCIAL_NETWORK.DISCORD} __Discord__: [Cliquez ici](https://discord.gg/WqsPx3J)
            ${botEmojis.SOCIAL_NETWORK.STEAM} __Groupe Steam__: [Cliquez ici](https://www.steamcommunity.com/)
            ${botEmojis.SOCIAL_NETWORK.TOP_SERVEUR} __Top-Serveur__: [Cliquez ici](https://top-serveurs.net/garrys-mod/vote/splife)
            ${botEmojis.SOCIAL_NETWORK.YOUTUBE} __Youtube__: [Cliquez ici](https://www.youtube.com/channel/UCqf4CqxojIcwekxP_J65ETg)
            :family: __Système de Familles Officielles__: [Cliquez ici](https://sites.google.com/view/splife-garrys-mod/famille-officiel?authuser=0)
            :shopping_cart: __Boutique__: [Cliquez ici](https://www.splife.fr/)
            
            ${botEmojis.GLOBAL.TEAM} **Notre équipe vous souhaite la bienvenue !**`));

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

        //SERVERS EMBEDS
        informationsMessages.set("servers_1", new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setImage("https://i.imgur.com/KWaYHPb.png"));

        informationsMessages.set("servers_2", new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setTitle(`:joystick: Nos plateformes de Jeu`)
            .setDescription(`SPLife est composé de 3 serveurs Garry's Mod distincts: ${botEmojis.GLOBAL.BLANK_BULLET} ${botEmojis.GLOBAL.BLANK_BULLET} ${botEmojis.GLOBAL.BLANK_BULLET} ${botEmojis.GLOBAL.BLANK_BULLET} ${botEmojis.GLOBAL.BLANK_BULLET} ${botEmojis.GLOBAL.BLANK_BULLET} ${botEmojis.GLOBAL.BLANK_BULLET} ${botEmojis.GLOBAL.BLANK_BULLET} ${botEmojis.GLOBAL.BLANK_BULLET} ${botEmojis.GLOBAL.BLANK_BULLET}
            ${botEmojis.SPLIFE.DARK_RP.LOGO} **Notre serveur DarkRP:**
                ${botEmojis.GLOBAL.BULLET} **Discord**: [Cliquez ici](https://discord.gg/WqsPx3J)
                ${botEmojis.GLOBAL.BULLET} **Collection Steam**: [Cliquez ici](https://steamcommunity.com/sharedfiles/filedetails/?id=2190229711)
                ${botEmojis.GLOBAL.BULLET} **IP**: 144.76.199.67
                ${botEmojis.GLOBAL.BULLET} **Carte de Jeu**: rp_rockford_v2b

            ${botEmojis.SPLIFE.PRISON_RP.LOGO} **Notre serveur PrisonRP:**
                ${botEmojis.GLOBAL.BULLET} **Discord**: [Cliquez ici](https://discord.gg/VkyV9BN)
                ${botEmojis.GLOBAL.BULLET} **Collection Steam**: Indisponible
                ${botEmojis.GLOBAL.BULLET} **IP**: Indisponible
                ${botEmojis.GLOBAL.BULLET} **Carte de Jeu**: Indisponible

            ${botEmojis.SPLIFE.SCP_RP.LOGO} **Notre serveur SCP RP:**
                ${botEmojis.GLOBAL.BULLET} **Discord**: [Cliquez ici](https://discord.gg/7pxQjJC)
                ${botEmojis.GLOBAL.BULLET} **Collection Steam**: Indisponible
                ${botEmojis.GLOBAL.BULLET} **IP**: Indisponible
                ${botEmojis.GLOBAL.BULLET} **Carte de Jeu**: rp_site65
            
            ${botEmojis.GLOBAL.TEAM} **Notre règlement s'applique sur tous nos serveurs**`));

        //PARTNER EMBEDS
        informationsMessages.set("partners_1", new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setImage("https://i.imgur.com/8iDiGbZ.png"));

        informationsMessages.set("partners_2", new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setTitle(`:handshake: Nos partenariats`)
            .setDescription(`Nos partenaires bénéficient d'une place particulière sur toutes nos plateformes. Nous mettons en avant toutes les informations les concernants !
            
            Nos partenaires bénéficient d'avantages lors de giveaways, animations ou encore lors d'annonces multiples.

            Si vous souhaitez parler d'un potentiel partenariat avec nos plateformes, veuillez contacter <@${bot.config.OWNER_ID}>

            Notre Branding est disponible [ici](https://cdn.discordapp.com/attachments/779357716128071762/779490359632986132/SPLife-Branding.rar) pour ceux souhaitant mettre en avant SPLife !
            
            ${botEmojis.GLOBAL.TEAM} **Une commande !nom_du_partenaire est disponible pour obtenir les informations de chaque partenaire**`));

        //BOOSTER EMBEDS
        informationsMessages.set("booster_1", new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setImage("https://i.imgur.com/O6ROpXC.png"));

        informationsMessages.set("booster_2", new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setTitle(`${botEmojis.BOOST.HAND}${botEmojis.BOOST.BOOST}${botEmojis.BOOST.HAND_REVERSE} Booster notre serveur Discord revient à:`)
            .setDescription(`${botEmojis.GLOBAL.BULLET} Avoir une super couleur Rose pétante !
            ${botEmojis.GLOBAL.BULLET} Avoir 2x plus de chance de gagner a un giveaway !
            ${botEmojis.GLOBAL.BULLET} Avoir accès a un channel avec des giveaways exclusifs pour des gens stylés !
            ${botEmojis.GLOBAL.BULLET} Avoir 3.000.000$ IG par semaine !
            ${botEmojis.GLOBAL.BULLET} Être au courant des nouveautés en avance !${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}${botEmojis.GLOBAL.BLANK_BULLET}
            ${botEmojis.GLOBAL.TEAM} **Pour réobtenir ces informations a tous moments, faites !boost**`));

        for(let msg of informationsMessages){
            message.channel.send(msg);
        }        
    }
}