const Discord = require("discord.js");

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

module.exports = async (bot, reaction, user) => {
    if(reaction.partial) await reaction.fetch();
    if(reaction.message.partial) await reaction.message.fetch();

    const message = reaction.message;
    const guildMember = message.guild.members.cache.find(m => m.user.id === user.id);
    const authorName =  guildMember.nickname ? guildMember.nickname : guildMember.user.username;

    if(user.bot) return; 

    if(message.guild.id != "693198481086480544" && message.guild.id != "618855620820336640"){
        return;
    }

    if(message.channel.id == bot.config.I_CHANNELS.REUNION_VOTES){
        if(reaction.emoji != bot.botEmojis.GLOBAL.YES && reaction.emoji != bot.botEmojis.GLOBAL.NO){
            reaction.users.remove(user);
            return;
        }

        message.channel.messages.fetch({ limit: 1 }).then(messages => {
            const lastMessage = messages.first();
            if(lastMessage != message){
                reaction.users.remove(user);
                return;
            }
        }).catch(err => {console.error(err)})
    }

    if(message.channel.name.startsWith("test-staff-de-")){
        if(!message.channel.isStaffTestChannel) return;
        if(!message.channel.isTested) return;

        reaction.users.remove(user);

        if(reaction.emoji == bot.botEmojis.GLOBAL.VERIFIED){
            if(message.channel.isStarted) return;
            message.channel.staffTestIsOpen = true;
            message.channel.testIsStarted = true;
            reaction.users.remove(bot.user);
            message.channel.quizQuestions = [
                {
                    "QUESTION": "Le BunnyHop est t-il autorisé sur le serveur ? Si oui, dans quels cas ?"
                },
                {
                    "QUESTION": "Rappelez-nous la règle du N.L.R. ?"
                },
                {
                    "QUESTION": "Les licence d'arme concerne :",
                    "ANSWER": ["Les armes lourdes", "Les pistolets", "Les deux", "Aucune des réponses ci-dessus"]
                },
                {
                    "QUESTION": "Quand est-ce que le travers est autorisé ?"
                },
                {
                    "QUESTION": "Qu'est ce que le \"Use Button\" ?"
                },
                {
                    "QUESTION": "Rappelez-nous le temps d'attente a respecter entre deux C.A.P. ?"
                },
                {
                    "QUESTION": "Definissez-nous le PropsClimb:"
                },
                {
                    "QUESTION": "Les insultes parentales sont autorisées sur le serveur.",
                    "ANSWER": ["Vrai", "Faux"]
                },
                {
                    "QUESTION": "Assommer quelqu'un sans /me est autorisé.",
                    "ANSWER": ["Vrai", "Faux"]
                },
                {
                    "QUESTION": "Combien de forces de l'ordre doivent être présentes en ville pour un braquage de banque ?"
                },
                {
                    "QUESTION": "Combien faut-il être de braqueurs au minimum pour une prise d'otage ?"
                },
                {
                    "QUESTION": "Rappelez-nous le règlement du métier de Solitaire:"
                },
                {
                    "QUESTION": "Faire un contre braquage sur un braquage de commissariat est autorisé.",
                    "ANSWER": ["Vrai", "Faux"]
                },
                {
                    "QUESTION": "Rappelez-nous le règlement du métier de Psycopathe:"
                },
                {
                    "QUESTION": "Donnez-nous les armes auxquelles a le droit le cuisinier:",
                    "ANSWER": ["Pistolets", "Snipers", "PM", "Fusil à pompe", "Aucune des réponses ci-dessus"]
                },
                {
                    "QUESTION": "Donnez-nous les armes auxquelles a le droit le SDF:",
                    "ANSWER": ["Pistolets", "Snipers", "PM", "Fusil à pompe", "Aucune des réponses ci-dessus"]
                },
                {
                    "QUESTION": "Les gendarmes ont le droit aux armes personnelles.",
                    "ANSWER": ["Vrai", "Faux"]
                },
                {
                    "QUESTION": "Il est autorisé de revendre ces armes permanentes aux autres joueurs.",
                    "ANSWER": ["Vrai", "Faux"]
                },
                {
                    "QUESTION": "Dites-nous dans quel contexte le vol de véhicule de gendarmerie est autorisé:"
                },
                {
                    "QUESTION": "Les constructions dans lesquelles tous les murs, plafond et sol sont recouvert de noir sont autorisées.",
                    "ANSWER": ["Vrai", "Faux"]
                },
                {
                    "QUESTION": "Le montant maximal que les braqueurs peuvent récuperer lors d'un braquage de Banque est de:",
                    "ANSWER": ["500.000$", "250.000$", "1.000.000$", "Aucune des réponses ci-dessus"]
                },
                {
                    "QUESTION": "Quelles conditions doivent être respectées pour tuer le Maire ?"
                }
            ]

            message.channel.answeredQuestions = [];
            let rdmNumber = Math.floor((Math.random() * (message.channel.quizQuestions.length - 1)) + 0);
            let rdmQuestion = message.channel.quizQuestions[rdmNumber];
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
                footerContent += `Réponse courte`;
            }

            message.channel.isTested.testQuestion = 1;
            message.channel.testTotalQuestions = 2;

            var questionEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.BASE)
                .setTitle(`Question N°${message.channel.isTested.testQuestion}`)
                .setDescription(descriptionContent)
                .setFooter(footerContent)

            let msg = await message.channel.send(questionEmbed);

            message.channel.lastQuestionEmbed = msg;
            message.channel.waitingAnswerType = "RC";

            if(rdmQuestion.ANSWER){
                message.channel.waitingAnswerType = "QCM";
                message.channel.lastQuestionEmbed.answer = rdmQuestion.ANSWER;
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

                message.channel.overwritePermissions([
                    {deny: 'VIEW_CHANNEL', id: message.guild.id},
                    {deny: 'SEND_MESSAGES', id: message.channel.isTested},
                    {deny: 'ADD_REACTIONS', id: message.channel.isTested},
                    {allow: 'VIEW_CHANNEL', id: message.channel.isTested},
                    {allow: 'VIEW_CHANNEL', id: bot.config.I_ROLES.SUPERADMIN},
                ], '');
            }
        
        } else if(reaction.emoji.name == "🖊️"){
            if(message.channel.isStarted) return;

            message.channel.messages.cache.forEach(qM => {
                if(!qM.embeds) return;
                if(!qM.embeds[0]) return;
                if(!qM.embeds[0].title) return;
                if(!qM.embeds[0].title.startsWith("Question N°")) return;

                qM.react(bot.botEmojis.GLOBAL.YES);
                qM.react(bot.botEmojis.GLOBAL.NO);
            });

            message.reactions.removeAll();
        } else if(reaction.emoji == bot.botEmojis.GLOBAL.YES){
            if(message.channel.isStarted) return;

            console.log("AB");
            if(!message.channel.finalScore) message.channel = 1
            else message.channel.finalScore = message.channel.finalScore + 1;

            message.reactions.removeAll();
        } else if(reaction.emoji == bot.botEmojis.GLOBAL.NO){
            if(message.channel.isStarted) return;

            console.log("AA");
            if(!message.channel.finalScore) message.channel = 0;

            message.reactions.removeAll();
        } else {
            if(!message.channel.quizQuestions) return;
            if(!message.channel.isTested.testQuestion) return;
            if(message.channel.waitingAnswerType != "QCM") return;
            if(user != message.channel.isTested) return;
            if(!message.channel.testIsStarted) return;
            if(!message.channel.lastQuestionEmbed) return;
            if(!message.channel.lastQuestionEmbed.answer) return;

            let answer = reaction.emoji.name.replace('_','');
            message.reactions.removeAll();

            lastMessage = message.channel.lastQuestionEmbed;
            if(!lastMessage.embeds[0]) return;
            if(!lastMessage.embeds[0].description || !lastMessage.embeds[0].title) return;
            if(!lastMessage.embeds[0].title.startsWith("Question N°")) return;

            let answerDescription = `${lastMessage.embeds[0].description}
            
            ${bot.botEmojis.GLOBAL.BULLET} ***Réponse: ${message.channel.lastQuestionEmbed.answer[answer - 1]}***`;

            var questionAnsweredEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.BASE)
                .setTitle(`${lastMessage.embeds[0].title}`)
                .setDescription(`${answerDescription}`)
                .setFooter(`Type de réponse: QCM`);

            lastMessage.edit(questionAnsweredEmbed);

            if(message.channel.isTested.testQuestion == message.channel.testTotalQuestions){
                var testEndEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.BASE)
                    .setTitle(`📩  Fin de votre Test d'entrée`)
                    .setDescription(`Votre responsable de session (<@${message.channel.staffTestResp.id}>) va vous communiquer vos **résultats** sous peu.
                    
                    ${bot.botEmojis.GLOBAL.BULLET} **Ne discutez pas** du test tant que les autres n'ont **pas fini**. Sous peine de **retrait de points** !
                    ${bot.botEmojis.GLOBAL.BULLET} Pour rappel: Il faut minimum **10/20** pour passer dans notre équipe !
                
                    ${bot.botEmojis.GLOBAL.TEAM} _Reservé aux correcteur:_
                    **Cliquez sur 🖊️ pour lancer le processus de correction !**
                    ${bot.botEmojis.GLOBAL.YES} pour une bonne réponse !
                    ${bot.botEmojis.GLOBAL.NO} pour une mauvaise réponse !`)

                let endMsg = await message.channel.send(testEndEmbed);

                endMsg.react("🖊️");

                message.channel.overwritePermissions([
                    {deny: 'VIEW_CHANNEL', id: message.guild.id},
                    {deny: 'SEND_MESSAGES', id: bot.config.I_ROLES.SUPERADMIN},
                    {deny: 'SEND_MESSAGES', id: message.channel.isTested},
                    {deny: 'ADD_REACTIONS', id: message.channel.isTested},
                    {allow: 'VIEW_CHANNEL', id: message.channel.isTested},
                    {allow: 'VIEW_CHANNEL', id: bot.config.I_ROLES.SUPERADMIN},
                ], '');

                message.channel.staffTestIsOpen = false;
                message.channel.testIsStarted = false;
                return; 
            }

            let rdmNumber = Math.floor((Math.random() * (message.channel.quizQuestions.length - 1)) + 0);
            while(message.channel.answeredQuestions.includes(rdmNumber)){
                rdmNumber = Math.floor((Math.random() * (message.channel.quizQuestions.length - 1)) + 0);
            }
            let rdmQuestion = message.channel.quizQuestions[rdmNumber];
            message.channel.answeredQuestions[message.channel.isTested.testQuestion] = rdmNumber;

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
                message.channel.overwritePermissions([
                    {deny: 'VIEW_CHANNEL', id: message.guild.id},
                    {deny: 'SEND_MESSAGES', id: bot.config.I_ROLES.SUPERADMIN},
                    {allow: 'SEND_MESSAGES', id: message.channel.isTested},
                    {deny: 'ADD_REACTIONS', id: message.channel.isTested},
                    {allow: 'VIEW_CHANNEL', id: message.channel.isTested},
                    {allow: 'VIEW_CHANNEL', id: bot.config.I_ROLES.SUPERADMIN},
                ], '');
                footerContent += `Réponse courte`;
            }

            message.channel.isTested.testQuestion += 1;

            var questionEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.BASE)
                .setTitle(`Question N°${message.channel.isTested.testQuestion}`)
                .setDescription(descriptionContent)
                .setFooter(footerContent)

            let msg = await message.channel.send(questionEmbed);

            message.channel.lastQuestionEmbed = msg;
            message.channel.waitingAnswerType = "RC";

            if(rdmQuestion.ANSWER){
                message.channel.waitingAnswerType = "QCM";
                message.channel.lastQuestionEmbed.answer = rdmQuestion.ANSWER;
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

                message.channel.overwritePermissions([
                    {deny: 'VIEW_CHANNEL', id: message.guild.id},
                    {deny: 'SEND_MESSAGES', id: bot.config.I_ROLES.SUPERADMIN},
                    {deny: 'SEND_MESSAGES', id: message.channel.isTested},
                    {deny: 'ADD_REACTIONS', id: message.channel.isTested},
                    {allow: 'VIEW_CHANNEL', id: message.channel.isTested},
                    {allow: 'VIEW_CHANNEL', id: bot.config.I_ROLES.SUPERADMIN},
                ], '');
            }
        }
    } else {
        if(message.channel.name.startsWith("ticket-de-")){
            if(reaction.emoji.name == "🔐"){
                if(message.channel.ticketIsClosing) return;
                reaction.users.remove(user);
                if(message.channel.ticketMember) message.channel.ticketMember.isInTicket = false;
                if(!message.guild.members.cache.find(m => m.user.id == user.id).roles.cache.find(r => r.id == bot.config.I_ROLES.STAFF)) {
                    var replyEmbed = new Discord.MessageEmbed()
                        .setColor(bot.config.COLORS.DENY)
                        .setFooter(`Message auto-supprimé dans 5 secondes`)
                        .setDescription(`<@${user.id}> **vous n'avez pas la permission de faire ca**`)
                    let msg = await message.channel.send(replyEmbed);
                    setTimeout(() => {msg.delete()}, 5 * 1000)
                    return;
                }
                reaction.users.remove(bot.user);
                var replyEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.DENY)
                    .setDescription(`**Fermeture du ticket dans 10 secondes !**`)
                    .setFooter("Cliquez sur 🔓 pour réouvrir le ticket");
                let msg = await message.channel.send(replyEmbed);
                msg.react("🔓");
                message.channel.ticketIsClosing = true;
                setTimeout(() => {
                    if(!message.channel.ticketIsClosing) return;
                    message.channel.delete()
                }, 10 * 1000)
               
            }
            if(reaction.emoji.name == "🔓"){
                if(!message.channel.ticketIsClosing) return;
                reaction.users.remove(user);
                if(message.channel.ticketMember) message.channel.ticketMember.isInTicket = false;
                if(!message.guild.members.cache.find(m => m.user.id == user.id).roles.cache.find(r => r.id == bot.config.I_ROLES.STAFF)) {
                    var replyEmbed = new Discord.MessageEmbed()
                        .setColor(bot.config.COLORS.DENY)
                        .setFooter(`Message auto-supprimé dans 5 secondes`)
                        .setDescription(`<@${user.id}> **vous n'avez pas la permission de faire ca**`)
                    let msg = await message.channel.send(replyEmbed);
                    setTimeout(() => {msg.delete()}, 5 * 1000)
                    return;
                }        
                reaction.users.remove(bot.user);
                message.channel.ticketIsClosing = false; 
                var replyEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.ALLOW)
                    .setDescription(`**Réouverture du ticket !**`)
                    .setFooter("Cliquez sur 🔐 pour refermer le ticket");
                let msg = await message.channel.send(replyEmbed);
                msg.react("🔐");
            }
        }
    }

    if(message.channel.id == bot.config.I_CHANNELS.TICKETS){
        if(reaction.emoji.name == "📩"){
            if(user.isInTicket) return;
            user.isInTicket = true;
            const channel = await reaction.message.guild.channels.create(`ticket-de-${authorName}`,{
                type: 'text',
                parent: bot.config.I_CHANNELS.TICKET_CATEGORY,
                permissionOverwrites: [
                    {deny: 'VIEW_CHANNEL', id: reaction.message.guild.id},
                    {allow: 'VIEW_CHANNEL', id: user.id},
                    {allow: 'VIEW_CHANNEL', id: bot.config.I_ROLES.STAFF},
                ],
            });

            let ticketCategory = message.guild.channels.cache.find(c => c.id == bot.config.I_CHANNELS.TICKET_CATEGORY);

            channel.ticketIsClosing = false;
            channel.ticketMember = user;
            channel.send(`<@&${bot.config.I_ROLES.STAFF}> <@${user.id}>`);

            let ticketEmbed1 = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.BASE)
                .setTitle(`🎫 Ticket Support de ${authorName}`)
                .setDescription(`${bot.botEmojis.GLOBAL.BULLET} <@${user.id}> un membre de notre équipe arrive pour vous aider.
                Merci de décrire clairement et avec détails votre soucis afin que la résolution de votre problème se fasse avec le plus rapidement possible !`);
            let msg = await channel.send(ticketEmbed1);
            msg.react(`🔐`);

            reaction.users.remove(user);
        }
    }

    if(message.channel.id == bot.config.I_CHANNELS.VERIFICATION){
        if(reaction.emoji.name == "✅"){
            message.guild.members.cache.find(m => m.user.id == user.id).roles.add(bot.config.I_ROLES.MEMBER, "");
        }
    }
}