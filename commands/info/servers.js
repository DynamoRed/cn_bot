const Discord = require('discord.js');
module.exports = {
    name: "servers",
    description: "Affiche nos differents serveurs",
    category: "info",
    timeout: 120000,
    enabled: true,
    restrictions: [""],
    aliases: ["servs"],
    run: async (bot, message, args, botEmojis) => {

        let informationsMessages = new Discord.Collection();

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
                ${botEmojis.GLOBAL.BULLET} **IP**: 151.80.230.233 [[Se Connecter](steam://connect/151.80.230.233:27015)]
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

        for(let msg of informationsMessages){
            message.channel.send(msg);
        } 
    }
}