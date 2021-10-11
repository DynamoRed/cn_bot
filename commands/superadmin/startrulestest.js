const Discord = require('discord.js');
module.exports = {
    name: "startrulestest",
    description: "Demarrer le test de reglement d'un staff",
    category: "superadmin",
    timeout: 0,
    enabled: true,
    restrictions: ["staff+"],
    aliases: ["srt"],
    run: async (bot, message, args, botEmojis) => {

        if(!message.member.roles.cache.find(r => r.name.toLowerCase() == "staff+")) {
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.RED)
                .setFooter(`Message auto-supprimé dans 5 secondes`)
                .setDescription(`<@${message.author.id}> **vous n'avez pas la permission de faire ca**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 5 * 1000)
            return;
        }
        
        let mentionned = message.mentions.users;
        if(!mentionned) return;
        mentionned.forEach(async mention => {
            const guildMember = message.guild.members.cache.find(m => m.user.id === mention.id);
            const guildMemberName =  guildMember.nickname ? guildMember.nickname : guildMember.user.username;

            const testChannel = await message.guild.channels.create(`test-connaissances-de-${guildMemberName}`,{
                type: 'text',
                parent: bot.config.I_CHANNELS.STAFF_TEST_CATEGORY,
                permissionOverwrites: [
                    {deny: 'SEND_MESSAGES', id: mention.id},
                    {deny: 'VIEW_CHANNEL', id: message.guild.id},
                    {allow: 'VIEW_CHANNEL', id: mention.id},
                    {allow: 'VIEW_CHANNEL', id: bot.config.I_ROLES.SUPERADMIN},
                ],
            });

            testChannel.send(`<@${mention.id}>`);
            testChannel.isStaffRulesTestChannel = true;
            testChannel.isTested = mention;
            testChannel.isStarted = false;
            testChannel.staffTestIsOpen = false;
            testChannel.staffTestResp = message.author;

            let staffTestEmbed1 = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.BLURPLE)
                .setTitle(`📋 Test de connaissance du règlement de ${guildMemberName}`)
                .setDescription(`${bot.botEmojis.GLOBAL.BULLET} Pour chaque question le **type de réponse** est marqué en bas de la question. ***(QCM ou Réponse écrite)***
                ${bot.botEmojis.GLOBAL.BULLET} Vous ne pouvez envoyer **qu'UN seul** message pour les réponses écrites, pensez donc a bien vous **relire avant** d'envoyer votre réponse !
                ${bot.botEmojis.GLOBAL.BULLET} Vous avez **20** minutes pour faire ce test.
                ${bot.botEmojis.GLOBAL.BULLET} Si vous ne comprenez pas, n'hésitez pas à demander au **responsable de la session** de test réglements (<@${message.author.id}>)
                
                **QUAND VOUS ÊTES PRET A COMMENCER, APPUYEZ SUR ${bot.botEmojis.GLOBAL.VERIFIED} POUR LANCER LE TEST.**`);
            
            let msg = await testChannel.send(staffTestEmbed1);
            msg.react(bot.botEmojis.GLOBAL.VERIFIED);
        });
    }
}