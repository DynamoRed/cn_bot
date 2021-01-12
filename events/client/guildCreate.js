const Discord = require("discord.js");

module.exports = async (bot, g) => {
    let firstChannel = g.channels.cache.filter(c => c.type == "text").first();
    if(firstChannel) {
        let newGuildEmbed = new Discord.MessageEmbed() 
            .setColor(await bot.getServerColor(g.id))
            .setTitle(`:inbox_tray: Arrivée sur **${g.name}** !`)
            .setDescription(`Il semblerait que vous veniez d'ajouter le bot **SPLife Community** a votre serveur ! :fire:
            Bonne Nouvelle ! Nous vous avons fait un systeme de configuration simple et rapide. __Utilisez la commande__ **!set help**
            
            ${botEmojis.GLOBAL.TEAM} **Bienvenue dans la grande famille d'SPLife et bon jeu a vous !**`);
        firstChannel.send(newGuildEmbed)
    }
}