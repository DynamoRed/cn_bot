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

    if(reaction.emoji.name == "◀"){ 
        if(!message.embeds[0]) return;
        if(!message.embeds[0].author) return;
        if(!message.embeds[0].author.name.startsWith("Badges de")) return;
        if(!message.results) return;
        if(!message.actualPage) return;
        if(!message.whoRequest) return;
        reaction.users.remove(user);
        if(!message.canChangePage) return;
        if(message.whoRequest != user) return;
        if(!message.whoIsRequest) return;

        if(message.actualPage <= 1){
            message.actualPage = message.results.length;
        } else {
            message.actualPage--;
        }

        let pageNumber = message.actualPage;

        let badge = bot.badges.get(message.results[pageNumber - 1].id);
        let obtainedDate =  message.results[pageNumber - 1].get_at;
        obtainedDate = obtainedDate.split("-");
        obtainedDate = `${obtainedDate[0]}/${obtainedDate[1]}/${obtainedDate[2]} ${obtainedDate[3]}:${obtainedDate[4]}`
        var badgeEmbed = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setThumbnail(`https://www.raphael-biron.fr/projets/splife/badges/${badge.category}/${badge.id}.png`)
            .setFooter(`Badge ${pageNumber}/${message.results.length} | Obtenu le ${obtainedDate}`)
            .setTitle(`👉 ${badge.name}`)
            .setAuthor(`Badges de ${message.whoIsRequest.username}`, message.whoIsRequest.avatarURL())
            .setDescription(`*${badge.description}*
            `)
        setTimeout(() => {
            if(message.actualPage != pageNumber) return;
            message.reactions.removeAll();
            message.canChangePage = false;
        }, 15 * 1000) 

        message.edit(badgeEmbed);  
    } else if(reaction.emoji.name == "▶"){
        if(!message.embeds[0]) return;
        if(!message.embeds[0].author) return;
        if(!message.embeds[0].author.name.startsWith("Badges de")) return;
        if(!message.results) return;
        if(!message.actualPage) return;
        if(!message.whoRequest) return;
        reaction.users.remove(user);
        if(!message.canChangePage) return;
        if(message.whoRequest != user) return;
        if(!message.whoIsRequest) return;

        if(message.actualPage >= message.results.length){
            message.actualPage = 1;
        } else {
            message.actualPage++;
        }

        let pageNumber = message.actualPage;

        let badge = bot.badges.get(message.results[pageNumber - 1].id);
        let obtainedDate =  message.results[pageNumber - 1].get_at;
        obtainedDate = obtainedDate.split("-");
        obtainedDate = `${obtainedDate[0]}/${obtainedDate[1]}/${obtainedDate[2]} ${obtainedDate[3]}:${obtainedDate[4]}`
        var badgeEmbed = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setThumbnail(`https://www.raphael-biron.fr/projets/splife/badges/${badge.category}/${badge.id}.png`)
            .setFooter(`Badge ${pageNumber}/${message.results.length} | Obtenu le ${obtainedDate}`)
            .setTitle(`👉 ${badge.name}`)
            .setAuthor(`Badges de ${message.whoIsRequest.username}`, message.whoIsRequest.avatarURL())
            .setDescription(`*${badge.description}*
            `)
        setTimeout(() => {
            if(message.actualPage != pageNumber) return;
            message.reactions.removeAll();
            message.canChangePage = false;
        }, 15 * 1000) 

        message.edit(badgeEmbed);  
    }

    if(message.channel.name.startsWith("formation-de-")){
        if(reaction.emoji.name == "🔑"){
            if(!guildMember.roles.cache.find(r => r.id == bot.config.I_ROLES.ADMIN)
            && !guildMember.roles.cache.find(r => r.id == bot.config.I_ROLES.SUPERADMIN)) return;

            message.reactions.removeAll();

            message.channel.members.forEach(async qM => {
                if(qM.roles.cache.find(r => r.id == bot.config.I_ROLES.FORMATION)){
                    qM.roles.remove(bot.config.I_ROLES.FORMATION, "");

                    var endFormationEmbed = new Discord.MessageEmbed()
                        .setColor(bot.config.COLORS.BASE)
                        .setDescription(`<@${user.id}> **a mis fin a la formation de** <@${qM.user.id}>`);
                    let endFormationMsg = await message.channel.send(endFormationEmbed);
    
                    var replyEmbed = new Discord.MessageEmbed()
                        .setColor(bot.config.COLORS.DENY)
                        .setDescription(`**Fermeture du channel de formation dans 5 minutes !**`);
                    let msg = await message.channel.send(replyEmbed);
                    setTimeout(() => {
                        message.channel.delete()
                    }, 5 * 60 * 1000)
                };                
            });
        }
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
            message.channel.testTotalQuestions = 20;

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
                    {deny: 'SEND_MESSAGES', id: message.channel.isTested},
                    {deny: 'SEND_MESSAGES', id: bot.config.I_ROLES.SUPERADMIN},
                    {deny: 'SEND_MESSAGES', id: bot.config.I_ROLES.ADMIN},
                    {deny: 'ADD_REACTIONS', id: message.channel.isTested},
                    {deny: 'ADD_REACTIONS', id: bot.config.I_ROLES.ADMIN},
                    {deny: 'ADD_REACTIONS', id: bot.config.I_ROLES.SUPERADMIN},
                    {allow: 'VIEW_CHANNEL', id: message.channel.isTested},
                    {deny: 'VIEW_CHANNEL', id: bot.config.I_ROLES.ADMIN},
                    {allow: 'VIEW_CHANNEL', id: bot.config.I_ROLES.SUPERADMIN},
                    {deny: 'VIEW_CHANNEL', id: message.guild.id},
                ], '');
            }
        
        } else if(reaction.emoji.name == "🖊️"){
            if(message.channel.isStarted) return;
            if(user != message.channel.staffTestResp) return;
            
            message.channel.correctedQuestionsArray = [];

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
            if(user != message.channel.staffTestResp) return;
            if(!message.channel.correctedQuestionsArray) return;
            if(message.channel.correctedQuestionsArray.includes(message.embeds[0].title.replace("Question N° ", ""))) return;

            if(!message.channel.finalScore) message.channel.finalScore = 1;
            else message.channel.finalScore = message.channel.finalScore + 1;
            if(!message.channel.correctedQuestion) message.channel.correctedQuestion = 1;
            else message.channel.correctedQuestion = message.channel.correctedQuestion + 1;
            
            message.channel.correctedQuestionsArray[Number(message.embeds[0].title.replace("Question N° ", ""))] = message.embeds[0].title.replace("Question N° ", "");

            if(message.channel.correctedQuestion == message.channel.testTotalQuestions){
                let testResult = `${bot.botEmojis.GLOBAL.YES} Reçu(e)`;
                if(message.channel.finalScore < message.channel.testTotalQuestions/2){
                    testResult = `${bot.botEmojis.GLOBAL.NO} Non reçu(e)`;
                }

                var correctionEndEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.ALLOW)
                    .setDescription(`Notation finale: **${message.channel.finalScore}/${message.channel.testTotalQuestions}**
                    ${bot.botEmojis.GLOBAL.BULLET} **Resultat:** ${testResult}`);

                let endMsg = await message.channel.send(correctionEndEmbed);

                if(message.channel.finalScore < message.channel.testTotalQuestions/2) return;

                message.channel.overwritePermissions([
                    {allow: 'SEND_MESSAGES', id: message.channel.isTested},
                    {allow: 'SEND_MESSAGES', id: bot.config.I_ROLES.SUPERADMIN},
                    {allow: 'SEND_MESSAGES', id: bot.config.I_ROLES.ADMIN},
                    {deny: 'ADD_REACTIONS', id: message.channel.isTested},
                    {deny: 'ADD_REACTIONS', id: bot.config.I_ROLES.ADMIN},
                    {deny: 'ADD_REACTIONS', id: bot.config.I_ROLES.SUPERADMIN},
                    {allow: 'VIEW_CHANNEL', id: message.channel.isTested},
                    {allow: 'VIEW_CHANNEL', id: bot.config.I_ROLES.ADMIN},
                    {allow: 'VIEW_CHANNEL', id: bot.config.I_ROLES.SUPERADMIN},
                    {deny: 'VIEW_CHANNEL', id: message.guild.id},
                ], '');

                var adminCallEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.BASE)
                    .setTitle(`Choix Formateur`)
                    .setDescription(`Cliquez sur 🔐 pour prendre ce joueur en formation.`);

                message.channel.send(`<@&${bot.config.I_ROLES.ADMIN}>`);
                let adminCallMsg = await message.channel.send(adminCallEmbed);
                adminCallMsg.react("🔐");
            }

            message.reactions.removeAll();
        } else if(reaction.emoji == bot.botEmojis.GLOBAL.NO){
            if(message.channel.isStarted) return;
            if(user != message.channel.staffTestResp) return;
            if(!message.channel.correctedQuestionsArray) return;
            if(message.channel.correctedQuestionsArray.includes(message.embeds[0].title.replace("Question N° ", ""))) return;

            if(!message.channel.finalScore) message.channel.finalScore = 0;
            if(!message.channel.correctedQuestion) message.channel.correctedQuestion = 1;
            else message.channel.correctedQuestion = message.channel.correctedQuestion + 1;

            message.channel.correctedQuestionsArray[Number(message.embeds[0].title.replace("Question N° ", ""))] = message.embeds[0].title.replace("Question N° ", "");

            if(message.channel.correctedQuestion == message.channel.testTotalQuestions){
                let testResult = `${bot.botEmojis.GLOBAL.YES} Reçu(e)`;
                if(message.channel.finalScore < message.channel.testTotalQuestions/2){
                    testResult = `${bot.botEmojis.GLOBAL.NO} Non reçu(e)`;
                }

                var correctionEndEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.ALLOW)
                    .setDescription(`Notation finale: **${message.channel.finalScore}/${message.channel.testTotalQuestions}**
                    ${bot.botEmojis.GLOBAL.BULLET} **Resultat:** ${testResult}`);

                let endMsg = await message.channel.send(correctionEndEmbed);

                if(message.channel.finalScore < message.channel.testTotalQuestions/2) return;

                message.channel.overwritePermissions([
                    {allow: 'SEND_MESSAGES', id: message.channel.isTested},
                    {allow: 'SEND_MESSAGES', id: bot.config.I_ROLES.SUPERADMIN},
                    {allow: 'SEND_MESSAGES', id: bot.config.I_ROLES.ADMIN},
                    {deny: 'ADD_REACTIONS', id: message.channel.isTested},
                    {deny: 'ADD_REACTIONS', id: bot.config.I_ROLES.ADMIN},
                    {deny: 'ADD_REACTIONS', id: bot.config.I_ROLES.SUPERADMIN},
                    {allow: 'VIEW_CHANNEL', id: message.channel.isTested},
                    {allow: 'VIEW_CHANNEL', id: bot.config.I_ROLES.ADMIN},
                    {allow: 'VIEW_CHANNEL', id: bot.config.I_ROLES.SUPERADMIN},
                    {deny: 'VIEW_CHANNEL', id: message.guild.id},
                ], '');

                message.guild.members.cache.find(m => m.user.id == message.channel.isTested.id).roles.add(bot.config.I_ROLES.STAFF_DARKRP, "");
                message.guild.members.cache.find(m => m.user.id == message.channel.isTested.id).roles.add(bot.config.I_ROLES.TEST_MODERATOR, "");
                message.guild.members.cache.find(m => m.user.id == message.channel.isTested.id).roles.add(bot.config.I_ROLES.STAFF, "");

                var adminCallEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.BASE)
                    .setTitle(`Choix Formateur`)
                    .setDescription(`Cliquez sur 🔐 pour prendre ce joueur en formation.`);

                message.channel.send(`<@&${bot.config.I_ROLES.ADMIN}>`);
                let adminCallMsg = await message.channel.send(adminCallEmbed);
                adminCallMsg.react("🔐");
            }

            message.reactions.removeAll();
        } else if(reaction.emoji.name == "🔐"){ 
            if(message.channel.testIsStarted) return;
            if(!message.channel.isTested) return;
            if(!guildMember.roles.cache.find(r => r.id == bot.config.I_ROLES.ADMIN)
            && !guildMember.roles.cache.find(r => r.id == bot.config.I_ROLES.SUPERADMIN)) return;

            var adminChoiceEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.ALLOW)
                .setDescription(`<@${user.id}> est désormais le formateur de <@${message.channel.isTested.id}>`);

            message.channel.staffFormer = user;
            message.guild.members.cache.find(m => m.user.id == message.channel.isTested.id).roles.add(bot.config.I_ROLES.FORMATION, "");

            let adminChoiceMsg = await message.channel.send(adminChoiceEmbed);

            message.channel.setName(`formation-de-${message.channel.name.replace("test-staff-de-", "")}`,"");

            var formationEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.BASE)
                .setTitle("📨 Gestion de la formation")
                .setDescription(`_Reservé au formateur:_
                🔑 **Mettre fin a la formation**`);

            let formationMsg = await message.channel.send(formationEmbed);
            formationMsg.react("🔑");

            message.channel.overwritePermissions([
                {deny: 'SEND_MESSAGES', id: message.channel.isTested},
                {deny: 'SEND_MESSAGES', id: bot.config.I_ROLES.SUPERADMIN},
                {deny: 'SEND_MESSAGES', id: bot.config.I_ROLES.ADMIN},
                {deny: 'ADD_REACTIONS', id: message.channel.isTested},
                {deny: 'ADD_REACTIONS', id: bot.config.I_ROLES.ADMIN},
                {deny: 'ADD_REACTIONS', id: bot.config.I_ROLES.SUPERADMIN},
                {allow: 'VIEW_CHANNEL', id: message.channel.isTested},
                {deny: 'VIEW_CHANNEL', id: bot.config.I_ROLES.ADMIN},
                {allow: 'VIEW_CHANNEL', id: user.id},
                {allow: 'VIEW_CHANNEL', id: bot.config.I_ROLES.SUPERADMIN},
                {deny: 'VIEW_CHANNEL', id: message.guild.id},
            ], '');

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
                    ${bot.botEmojis.GLOBAL.BULLET} Pour rappel: Il faut minimum **${message.channel.testTotalQuestions/2}/${message.channel.testTotalQuestions}** pour passer dans notre équipe !
                
                    ${bot.botEmojis.GLOBAL.TEAM} _Reservé au correcteur:_
                    **Cliquez sur 🖊️ pour lancer le processus de correction !**
                    ${bot.botEmojis.GLOBAL.YES} pour une bonne réponse !
                    ${bot.botEmojis.GLOBAL.NO} pour une mauvaise réponse !`)

                let endMsg = await message.channel.send(testEndEmbed);

                endMsg.react("🖊️");

                message.channel.overwritePermissions([
                    {deny: 'SEND_MESSAGES', id: message.channel.isTested},
                    {deny: 'SEND_MESSAGES', id: bot.config.I_ROLES.SUPERADMIN},
                    {deny: 'SEND_MESSAGES', id: bot.config.I_ROLES.ADMIN},
                    {deny: 'ADD_REACTIONS', id: message.channel.isTested},
                    {deny: 'ADD_REACTIONS', id: bot.config.I_ROLES.ADMIN},
                    {deny: 'ADD_REACTIONS', id: bot.config.I_ROLES.SUPERADMIN},
                    {allow: 'VIEW_CHANNEL', id: message.channel.isTested},
                    {deny: 'VIEW_CHANNEL', id: bot.config.I_ROLES.ADMIN},
                    {allow: 'VIEW_CHANNEL', id: bot.config.I_ROLES.SUPERADMIN},
                    {deny: 'VIEW_CHANNEL', id: message.guild.id},
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
                    {allow: 'SEND_MESSAGES', id: message.channel.isTested},
                    {deny: 'SEND_MESSAGES', id: bot.config.I_ROLES.SUPERADMIN},
                    {deny: 'SEND_MESSAGES', id: bot.config.I_ROLES.ADMIN},
                    {deny: 'ADD_REACTIONS', id: message.channel.isTested},
                    {deny: 'ADD_REACTIONS', id: bot.config.I_ROLES.ADMIN},
                    {deny: 'ADD_REACTIONS', id: bot.config.I_ROLES.SUPERADMIN},
                    {allow: 'VIEW_CHANNEL', id: message.channel.isTested},
                    {deny: 'VIEW_CHANNEL', id: bot.config.I_ROLES.ADMIN},
                    {allow: 'VIEW_CHANNEL', id: bot.config.I_ROLES.SUPERADMIN},
                    {deny: 'VIEW_CHANNEL', id: message.guild.id},
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
                    {deny: 'SEND_MESSAGES', id: message.channel.isTested},
                    {deny: 'SEND_MESSAGES', id: bot.config.I_ROLES.SUPERADMIN},
                    {deny: 'SEND_MESSAGES', id: bot.config.I_ROLES.ADMIN},
                    {deny: 'ADD_REACTIONS', id: message.channel.isTested},
                    {deny: 'ADD_REACTIONS', id: bot.config.I_ROLES.ADMIN},
                    {deny: 'ADD_REACTIONS', id: bot.config.I_ROLES.SUPERADMIN},
                    {allow: 'VIEW_CHANNEL', id: message.channel.isTested},
                    {deny: 'VIEW_CHANNEL', id: bot.config.I_ROLES.ADMIN},
                    {allow: 'VIEW_CHANNEL', id: bot.config.I_ROLES.SUPERADMIN},
                    {deny: 'VIEW_CHANNEL', id: message.guild.id},
                ], '');
            }
        }
    }

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
            var logEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.BASE)
                .setDescription(`<@${user.id}> **a fermé le ticket ${message.channel.name.replace("-", " ").replace("ticket", "")}**`)
            let logMsg = await message.guild.channels.cache.find(c => c.id == bot.config.I_CHANNELS.LOGS).send(logEmbed);
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
            var logEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.BASE)
                .setDescription(`<@${user.id}> **a réouvert le ticket ${message.channel.name.replace("-", " ").replace("ticket", "")}**`)
            let logMsg = await message.guild.channels.cache.find(c => c.id == bot.config.I_CHANNELS.LOGS).send(logEmbed);
            msg.react("🔐");
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