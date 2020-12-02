const Discord = require('discord.js');
module.exports = {
    name: "xmasgwinfos",
    description: "Affiche les messages informatifs du giveaway de noël",
    category: "superadmin",
    timeout: 0,
    enabled: true,
    restrictions: ["staff+"],
    aliases: ["xmasgwinformations"],
    run: async (bot, message, args, botEmojis) => {

        let informationsMessages = new Discord.Collection();

        informationsMessages.set("welcome_1", new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setImage("https://i.imgur.com/csFUYEs.png"));

        informationsMessages.set("welcome_2", new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setTitle(`${botEmojis.GLOBAL.GIVEAWAY}  Le grand Giveaway de NOËL !`)
            .setDescription(`**Pour vous apporter du réconfort le 25 décembre nous vous organisons un giga Giveaway !**

            :gift: **A GAGNER**:
            ${botEmojis.GLOBAL.BULLET} __Un **Premium** a vie sur notre serveur DarkRP !__ _(50€)_
            ${botEmojis.GLOBAL.BULLET} __Un **Grappin** permanent !__ _(5€)_
            ${botEmojis.GLOBAL.BULLET} __Un **Ithaca M37** permanent !__ _(7€)_
            ${botEmojis.GLOBAL.BULLET} __Un discord **Nitro** !__ _(9.99€)_
            ${botEmojis.GLOBAL.BULLET} __Un pack **Bronze** !__ _(15€)_

            :envelope_with_arrow: **TIRAGE AU SORT DU GAGNANT**:
            ${botEmojis.GLOBAL.BULLET} _Le 25 décembre 2020__

            ${botEmojis.GLOBAL.SIREN} **SEULE CONDITION**: 
            _Ajouter nôtre bot a votre serveur Discord !_ [En cliquant simplement ici](https://discord.com/oauth2/authorize?client_id=778266786130165791&scope=bot&permissions=125953)

            **PS**: _Si vous ajoutez notre bot sur 2 serveurs vous aurez 2x plus de chance de gagner et ainsi de suite..._
            ${botEmojis.GLOBAL.TEAM} **Notre équipe vous souhaite de joyeuses fêtes !**`));   
            
        for(let msg of informationsMessages){
            message.channel.send(msg);
        }  
    }
}