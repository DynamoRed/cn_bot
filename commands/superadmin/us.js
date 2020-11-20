const Discord = require('discord.js');
module.exports = {
    name: "us",
    description: "Présente SPLife",
    category: "superadmin",
    timeout: 0,
    enabled: true,
    restrictions: ["staff+"],
    aliases: ["nous", "splife"],
    run: async (bot, message, args, botEmojis) => {
        //US EMBEDS
        let usEmbed1 = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setImage("https://i.imgur.com/6hXvm07.png");

        let usEmbed2 = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setTitle(`${botEmojis.SPLIFE.DARK_RP.LOGO} Qui sommes-nous ?`)
            .setDescription(`${botEmojis.GLOBAL.BULLET} SPLife c'est 3 serveurs Garry's Mod Roleplay, une communauté de plusieurs centaines de membres et une équipe de staffs actives et a l'écoute !
            Afin de vous proposer une experience nouvelle, nous vous proposons des addons exclusifs, des animations quasi quotidiennes et des giveaways réguliers !

            Sur discord, nous vous proposons de multiples salons dédiés pour le plaisir de tous. Cette plateforme est notre principale moyen de communication; N'oubliez pas de rester a l'affût !

            :link: **Utilitaires:**
            
            ${botEmojis.SOCIAL_NETWORK.DISCORD} __Discord__: [Cliquez ici](https://discord.gg/WqsPx3J)
            ${botEmojis.SOCIAL_NETWORK.STEAM} __Groupe Steam__: [Cliquez ici](https://www.steamcommunity.com/)
            ${botEmojis.SOCIAL_NETWORK.TOP_SERVEUR} __Top-Serveur__: [Cliquez ici](https://top-serveurs.net/garrys-mod/vote/fr-splife-recrutement-on-5f6bab49ecb56)
            ${botEmojis.SOCIAL_NETWORK.YOUTUBE} __Youtube__: [Cliquez ici](https://www.youtube.com/)`);

        message.channel.send(usEmbed1);
        message.channel.send(usEmbed2);
    }
}