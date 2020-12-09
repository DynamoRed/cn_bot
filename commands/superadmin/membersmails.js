const Discord = require('discord.js');
const fs = require('fs');
module.exports = {
    name: "membersmails",
    description: "Recuperer la liste des mails des membres du serveur",
    category: "superadmin",
    timeout: 10000,
    enabled: true,
    restrictions: ["staff+"],
    aliases: ["mmails"],
    run: async (bot, message, args, botEmojis) => {
        let mailsData = "";

        message.guild.members.cache.forEach(m => {
            mailsData += `${m.user.tag} => ${m.user.email}\n`
        });

        fs.writeFile('mails.txt', mailsData, function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("Members Mails written successfully !");
        });

        message.channel.send({
            files: [{
                attachment: 'mails.txt',
                name: 'membersmails.txt'
            }]
        });
    }
}