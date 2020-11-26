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

        if(reaction.emoji == bot.botEmojis.GLOBAL.YES){
            if(message.channel.isStarted) return;
            message.channel.staffTestIsOpen = true;
            message.channel.overwritePermissions([{deny: 'VIEW_CHANNEL', id: message.guild.id},
            {allow: 'VIEW_CHANNEL', id: message.channel.isTested.id},
            {allow: 'SEND_MESSAGES', id: message.channel.isTested.id},
            {allow: 'VIEW_CHANNEL', id: bot.config.I_ROLES.SUPERADMIN},], '');

            const quizQuestions = [
                {
                    "QUESTION": "Le bunnyHop est t-il autorisé sur le serveur ? si oui, dans quel cas ?"
                },
                {
                    "QUESTION": "Définissez la règle du N.L.R ?"
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
                    "QUESTION": "Definissez le Props-Climb:"
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

            let answeredQuestions = [];
            for(let i = 1; i <= 20; i++){
                let rdmNumber = Math.floor(Math.random() * (quizQuestions.length + 1));
                while(answeredQuestions.includes(rdmNumber)){
                    rdmNumber = Math.floor(Math.random() * (quizQuestions.length + 1));
                }

                let rdmQuestion = quizQuestions[rdmNumber - 1];
                answeredQuestions[i-1] = rdmNumber;

                let footerContent = `Type de réponse: `;
                let descriptionContent = `${rdmQuestion.QUESTION}`;

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
                    footerContent += `**QCM**`;
                } else {
                    footerContent += `**Réponse courte**`;
                }

                var questionEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.BASE)
                    .setTitle(`Question N°${i}`)
                    .setDescription(descriptionContent)
                    .setFooter(footerContent)

                let msg = await message.channel.send(questionEmbed);

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
                        msg.react(emojis[y]);
                        y++;
                    })
                }

                sleep(3000);
            }
        } else {
            
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

    if(message.channel.name.includes("ticket-de-")){
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