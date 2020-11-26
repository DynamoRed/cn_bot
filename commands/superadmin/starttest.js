const Discord = require('discord.js');
module.exports = {
    name: "starttest",
    description: "Demarrer le test d'entrée dans le staff d'un joueur",
    category: "superadmin",
    timeout: 0,
    enabled: true,
    restrictions: ["staff+"],
    aliases: [""],
    run: async (bot, message, args, botEmojis) => {
        let mentionned = message.mentions.users;
        if(!mentionned) return;
        mentionned.forEach(async mention => {
            const guildMember = message.guild.members.cache.find(m => m.user.id === mention.id);
            const guildMemberName =  guildMember.nickname ? guildMember.nickname : guildMember.user.username;

            const testChannel = await message.guild.channels.create(`test-staff-de-${mention.id}`,{
                type: 'text',
                parent: bot.config.I_CHANNELS.STAFF_TEST_CATEGORY,
                permissionOverwrites: [
                    {deny: 'VIEW_CHANNEL', id: message.guild.id},
                    {allow: 'VIEW_CHANNEL', id: mention.id},
                    {allow: 'VIEW_CHANNEL', id: bot.config.I_ROLES.SUPERADMIN},
                ],
            });

            testChannel.send(`<@${mention.id}>`);

            let staffTestEmbed1 = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.BASE)
                .setTitle(`📋 Test d'entrée dans le Staff ${guildMemberName}`)
                .setDescription(`<@${mention.id}> Votre test d'entrée dans le staff vient de commencer !

                ${bot.botEmojis.GLOBAL.BULLET} Pour chaque question le **type de réponse** est marqué en bas de la question. ***(QCM ou Réponse écrite)***
                ${bot.botEmojis.GLOBAL.BULLET} Si vous **éditez** un message, il sera supprimé et votre réponse vaudra **0** !
                ${bot.botEmojis.GLOBAL.BULLET} Vous ne pouvez envoyer **qu'UN seul** message pour les réponses écrites, pensez donc a bien vous **relire avant** d'envoyer votre réponse !
                ${bot.botEmojis.GLOBAL.BULLET} Vous avez **60** secondes par question.
                ${bot.botEmojis.GLOBAL.BULLET} Si vous ne comprenez pas, n'hésitez pas à demander au **responsable de la session** de recrutement (<@${message.author.id}>)
                
                ${bot.botEmojis.GLOBAL.BULLET} Quand vous êtes prêt a commencer le test, appuyez sur ${bot.botEmojis.GLOBAL.YES} pour lancer le test.`);
            
            let msg = await testChannel.send(staffTestEmbed1);
            msg.react(bot.botEmojis.GLOBAL.YES);
        });
    }
}