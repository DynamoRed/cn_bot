const Timeout = new Set();
const ms = require('ms');
const Discord = require("discord.js");

module.exports = async (bot, message) => {
    if(message.author.bot) return;

    if(message.channel.id == bot.config.I_CHANNELS.PATCH_NOTES){
        //PATCH-NOTE EMBEDS
        let patchNoteEmbed1 = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setImage("https://i.imgur.com/3hanxio.png");

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
            
        let patchNoteEmbed2 = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setTitle(`:loudspeaker: Patch-Note du ${dd}/${mm}/${yyyy}`)
            .setDescription(`${bot.botEmojis.GLOBAL.BULLET} ${message.content}`);

        message.channel.send(patchNoteEmbed1);
        message.channel.send(patchNoteEmbed2);
        message.delete();
        return;
    }

    if(message.channel.id == bot.config.I_CHANNELS.BOOSTS){
        if(message.type ==  "USER_PREMIUM_GUILD_SUBSCRIPTION"
        || message.type ==  "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1"
        || message.type ==  "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2"
        || message.type ==  "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3"){
            //BOOST EMBEDS
            let boostEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.BASE)
                .setTitle(`${bot.botEmojis.BOOST.HAND}${bot.botEmojis.BOOST.BOOST}${bot.botEmojis.BOOST.HAND_REVERSE} Nouveau BOOOOOOOOOOOOST !`)
                .setDescription(`${bot.botEmojis.GLOBAL.BULLET} <@${message.author.id}> vient de **booster** notre discord ! **Quel BG !** Merci a lui :tada:`);

            message.channel.send(boostEmbed);
            message.delete();
            return;
        }
    }

    if(message.channel.id == bot.config.I_CHANNELS.REUNION_VOTES){
        if(message.content.startsWith("https://")){
            message.react(bot.botEmojis.GLOBAL.NO);
            message.react(bot.botEmojis.GLOBAL.YES);
        }
    }

    if(message.channel.name.startsWith("test-staff-de-")){
        if(!message.channel.isStaffTestChannel) return;
        if(!message.channel.isTested) return;
        if(!message.channel.quizQuestions) return;
        if(!message.channel.isTested.testQuestion) return;
        if(message.channel.waitingAnswerType != "RC") return;
        if(message.author != message.channel.isTested) return;
        if(!message.channel.testIsStarted) return;

        message.delete();
        let i = 1;
        let lastMessageIsFound = false;
        message.channel.messages.cache.forEach(lastMessage => {
            if(lastMessageIsFound) return;
            lastMessage = message.channel.messages.cache.get(message.channel.messages.cache.array().length - i);
            console.log("ARRAYL: " + message.channel.messages.cache.array().length - i)
            console.log(lastMessage);
            i++;
            if(!lastMessage.embeds[0]) return;
            if(!lastMessage.embeds[0].description || !lastMessage.embeds[0].title) return;
            if(!lastMessage.embeds[0].title.startsWith("Question N°")) return;

            lastMessageIsFound = true;

            var questionAnsweredEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.BASE)
                .setTitle(`${lastMessage.embeds[0].title}`)
                .setDescription(`${lastMessage.embeds[0].description}
                ***Réponse: ${message.content}***`)
                .setFooter(`Type de réponse: Réponse courte`);

            lastMessage.edit(questionAnsweredEmbed);
        }).catch(err => {console.error(err)}) 

        if(message.channel.isTested.testQuestion == 20){
            var testEndEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.BASE)
                .setTitle(`📩 Fin de votre Test d'entrée`)
                .setDescription(`Votre responsable de session (<@${message.channel.staffTestResp.id}>) va vous communiquer vos **résultats** sous peu.
                
                ${bot.botEmojis.GLOBAL.BULLET} **Ne discutez pas** du test tant que les autres n'ont **pas fini**. Sous peine de **retrait de points** !
                ${bot.botEmojis.GLOBAL.BULLET} Pour rappel: Il faut minimum **10/20** pour passer dans notre équipe !`)

            let endMsg = await message.channel.send(testEndEmbed);

            message.channel.overwritePermissions([{deny: 'VIEW_CHANNEL', id: message.guild.id},
                {allow: 'VIEW_CHANNEL', id: message.channel.isTested.id},
                {deny: 'SEND_MESSAGES', id: message.channel.isTested.id},
                {allow: 'VIEW_CHANNEL', id: bot.config.I_ROLES.SUPERADMIN},], '');

            return;
        }

        let rdmNumber = Math.floor(Math.random() * (message.channel.quizQuestions.length + 1));
        while(message.channel.answeredQuestions.includes(rdmNumber)){
            rdmNumber = Math.floor(Math.random() * (message.channel.quizQuestions.length + 1));
        }
        let rdmQuestion = message.channel.quizQuestions[rdmNumber - 1];
        message.channel.answeredQuestions[0] = rdmNumber;

        let footerContent = `Type de réponse: `;
        let descriptionContent = `__${rdmQuestion.QUESTION}__`;

        if(rdmQuestion.ANSWER){
            let emojis = [bot.botEmojis.NUMBERS._1, 
                bot.botEmojis.NUMBERS._2, 
                bot.botEmojis.NUMBERS._3, 
                bot.botEmojis.NUMBERS._4, 
                bot.botEmojis.NUMBERS._5, 
                bot.botEmojis.NUMBERS._6, 
                bot.botEmojis.NUMBERS._7, 
                bot.botEmojis.NUMBERS._8, 
                bot.botEmojis.NUMBERS._9];

            let y = 0;
            rdmQuestion.ANSWER.forEach(a => {
                descriptionContent += `
                
                ${emojis[y]} ${a}`;
                y++;
            })
            footerContent += `QCM`;
        } else {
            message.channel.overwritePermissions([{deny: 'VIEW_CHANNEL', id: message.guild.id},
                {allow: 'VIEW_CHANNEL', id: message.channel.isTested.id},
                {allow: 'SEND_MESSAGES', id: message.channel.isTested.id},
                {allow: 'VIEW_CHANNEL', id: bot.config.I_ROLES.SUPERADMIN},], '');
            footerContent += `Réponse courte`;
        }

        message.channel.isTested.testQuestion += 1;

        var questionEmbed = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setTitle(`Question N°${message.channel.isTested.testQuestion}`)
            .setDescription(descriptionContent)
            .setFooter(footerContent)

        let msg = await message.channel.send(questionEmbed);

        message.channel.waitingAnswerType = "RC";

        if(rdmQuestion.ANSWER){
            message.channel.waitingAnswerType = "QCM";
            let emojis = [bot.botEmojis.NUMBERS._1, 
                bot.botEmojis.NUMBERS._2, 
                bot.botEmojis.NUMBERS._3, 
                bot.botEmojis.NUMBERS._4, 
                bot.botEmojis.NUMBERS._5, 
                bot.botEmojis.NUMBERS._6, 
                bot.botEmojis.NUMBERS._7, 
                bot.botEmojis.NUMBERS._8, 
                bot.botEmojis.NUMBERS._9];

            let y = 0;
            rdmQuestion.ANSWER.forEach(a => {
                msg.react(emojis[y]);
                y++;
            })

            message.channel.overwritePermissions([{deny: 'VIEW_CHANNEL', id: message.guild.id},
                {allow: 'VIEW_CHANNEL', id: message.channel.isTested.id},
                {deny: 'SEND_MESSAGES', id: message.channel.isTested.id},
                {allow: 'VIEW_CHANNEL', id: bot.config.I_ROLES.SUPERADMIN},], '');
        }
    }

    if(!message.content.startsWith(bot.config.PREFIX)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(bot.config.PREFIX.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0) return;
    let command = bot.commands.get(cmd);
    if(!command) command = bot.commands.get(bot.aliases.get(cmd));
    if(command){
        message.delete();
        if(command.name != "setac" && message.guild.id != "693198481086480544" && message.guild.id != "618855620820336640"){
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.DENY)
                .setFooter(`Message auto-supprimé dans 5 secondes`)
                .setDescription(`<@${message.author.id}> **cette commande n'est pas disponible sur ce serveur !**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 5 * 1000)
            return;
        }
        if(!command.enabled){
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.DENY)
                .setFooter(`Message auto-supprimé dans 5 secondes`)
                .setDescription(`<@${message.author.id}> **cette commande est désactivée !**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 5 * 1000)
            return;
        }
        if(command.timeout){
            if(Timeout.has(`${message.author.id}${command.name}`)){
                var replyEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.DENY)
                    .setFooter(`Message auto-supprimé dans 5 secondes`)
                    .setDescription(`<@${message.author.id}> **vous devez attendre ${ms(command.timeout)} avant d'utiliser cette commande**`)
                let msg = await message.channel.send(replyEmbed);
                setTimeout(() => {msg.delete()}, 5 * 1000)
                return;
            } else {
                Timeout.add(`${message.author.id}${command.name}`);
                setTimeout(() => {
                    Timeout.delete(`${message.author.id}${command.name}`)
                }, command.timeout);
            }
        }
        if(message.author.id != bot.config.OWNER_ID){
            if(command.restrictions != [""]){
                command.restrictions.forEach(async restriction => {
                    if(!message.member.roles.cache.find(r => r.name.toLowerCase().includes(restriction))) {
                        var replyEmbed = new Discord.MessageEmbed()
                            .setColor(bot.config.COLORS.DENY)
                            .setFooter(`Message auto-supprimé dans 5 secondes`)
                            .setDescription(`<@${message.author.id}> **vous n'avez pas la permission de faire ca**`)
                        let msg = await message.channel.send(replyEmbed);
                        setTimeout(() => {msg.delete()}, 5 * 1000)
                        return;
                    }
                })
            } 
        }
        command.run(bot, message, args, bot.botEmojis);
    }
}