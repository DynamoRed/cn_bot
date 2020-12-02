const Discord = require('discord.js');
module.exports = {
    name: "xmasinfos",
    description: "Affiche les messages informatifs de noël",
    category: "superadmin",
    timeout: 0,
    enabled: true,
    restrictions: ["staff+"],
    aliases: ["xmasinformations"],
    run: async (bot, message, args, botEmojis) => {

        let informationsMessages = new Discord.Collection();

        informationsMessages.set("welcome_1", new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setImage("https://i.imgur.com/uTPVSji.png"));

        informationsMessages.set("welcome_2", new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setTitle(`${botEmojis.SPLIFE.DARK_RP.XMAS_LOGO}  SPLife passe en mode NOËL !`)
            .setDescription(`**SPLife revêt son manteau de fourrure blanche et se prépare pour les fêtes de fin d'années !**

            ${botEmojis.GLOBAL.BULLET} Pour l'occasion on met aux couleurs de 🎅 Noël nos logos !

            ${botEmojis.GLOBAL.BULLET} On vous a prévu des giveaways **exclusifs** pour vous combler de bonheur ***(Surtout pour nos VIP, VIP+, Premiums et nos Boosters car ils nous soutiennent tous les joueurs ces petits veinards !)***
            
            ${botEmojis.GLOBAL.BULLET} On a aussi mis a votre disposition la commande ***!xmas*** pour que vous aussi vous ayez un pseudo dans le style Noël ! 😎

            ${botEmojis.GLOBAL.BULLET} Preparez vous a voir des **événements spécial** Noël directement sur le serveur (Merci a nos <@&${bot.config.I_ROLES.ANIMS}> pour ça)
            

            *Pour bien commencer ce mois de décembre et pour les plus rapides:* ||CODE DE REDUCTION SUR LA BOUTIQUE||

            ${botEmojis.GLOBAL.TEAM} **Notre équipe vous souhaite de joyeuses fêtes !**`));   
            
        for(let msg of informationsMessages){
            message.channel.send(msg);
        }  
    }
}