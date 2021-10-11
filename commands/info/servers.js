const Discord = require('discord.js');
const DiscordButtons = require('discord-buttons');

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
        const attachment = new Discord.MessageAttachment('./resources/images/servers_banner.png', 'servers_banner.png');
        let servers1Embed = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BLURPLE)
            .attachFiles(attachment)
            .setImage("attachment://servers_banner.png");

        message.channel.send(servers1Embed).then(() => {
            let servers2Embed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.BLURPLE)
                .setTitle(`:joystick: Nos plateformes de Jeu`)
                .setDescription(`Conoda Roleplay est actuellement composé d'un unique serveur Garry's Mod: ${botEmojis.GLOBAL.BLANK_BULLET}

                ${botEmojis.NUMBERS._1} **Notre serveur DarkRP:**`);

            let discordButton = new DiscordButtons.MessageButton()
                .setLabel("Discord")
                .setID('darkrp_server_discord_b_vhPOjM')
                .setEmoji('855184280274862090')
                .setStyle('blurple')
            let workshopButton = new DiscordButtons.MessageButton()
                .setLabel("Collection Steam")
                .setStyle("url")
                .setEmoji('854493775577350174')
                .setURL(`https://steamcommunity.com/sharedfiles/filedetails/?id=2448603132`)
            let ipButton = new DiscordButtons.MessageButton()
                .setLabel("IP")
                .setStyle("url")
                .setEmoji('854493775577350174')
                .setURL(`https://conoda-roleplay.fr/api/connect/164.132.206.138:27075`)
            let mapButton = new DiscordButtons.MessageButton()
                .setLabel("rp_conoda_alpha")
                .setStyle("grey")
                .setEmoji('🗺️')
                .setID('darkrp_server_map_b_SxkzeV')

            let row = new DiscordButtons.MessageActionRow()
                .addComponent(discordButton)
                .addComponent(workshopButton)
                .addComponent(ipButton)
                .addComponent(mapButton);

            message.channel.send('', {
                component: row,
                embed: servers2Embed
            });
        })
    }
}