const Discord = require("discord.js");
const DiscordButtons = require('discord-buttons');

module.exports = async (bot, button) => {
    const m = button.clicker;
    const authorName =  m.nickname ? m.nickname : m.user.username;
    const message = button.message;
    if(button.id){
        switch(button.id){
            case "ask_verification_b_svS3yV":
                let welcomeEmbed2 = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.BLURPLE)
                    .setDescription(`👋 **Bienvenue sur Conoda Roleplay !**
                    
                    ${bot.botEmojis.GLOBAL.BULLET} Afin de nous assurer que vous n'êtes pas un robot, nous vous prions de **verifier votre compte**.

                    ${bot.botEmojis.GLOBAL.BULLET} Pour verifier votre compte, il vous suffit de demander un **lien de verification** grace au **bouton ci-dessous** et de vous **connecter** a votre compte ${bot.botEmojis.SOCIAL_NETWORK.STEAM} **Steam** !
                    
                    ${bot.botEmojis.GLOBAL.TEAM} ***En cas de soucis n'hesitez pas a faire un <#${"815004548723900506"}> pour contacter un administrateur.***`);
            
                let askVerificationButton = new DiscordButtons.MessageButton()
                    .setLabel("Généré")
                    .setStyle("green")
                    .setEmoji('817885645514997800')
                    .setID('ask_verification_b_svS3yV')

                button.message.edit({
                    component: askVerificationButton,
                    embed: welcomeEmbed2
                });

                setTimeout(() => {
                    let askVerificationButton = new DiscordButtons.MessageButton()
                        .setLabel(" Demander mon lien")
                        .setStyle("blurple")
                        .setEmoji('🗝️')
                        .setID('ask_verification_b_svS3yV')
    
                    button.message.edit({
                        component: askVerificationButton,
                        embed: welcomeEmbed2
                    });
                }, 2000)

                const rand=()=>Math.random(0).toString(36).substr(2);
                const token=(length)=>(rand()+rand()+rand()+rand()).substr(0,length);

                let generatedCode = token(7);

                bot.db.query(`UPDATE verification_codes SET active='0' WHERE user_id='${m.user.id}'`, async function(err, results){
                    if (err) throw err;
                })

                bot.db.query(`INSERT INTO verification_codes(code, user_id, active) VALUES ('${generatedCode}', '${m.user.id}', '1')`, async function(err, results){
                    if (err) throw err;
                })

                let verificationLinkButton = new DiscordButtons.MessageButton()
                    .setLabel(" Verifier mon compte")
                    .setStyle("url")
                    .setURL(`https://auth.conoda-roleplay.fr/verify/${generatedCode}`)
                let memberCodeEmbed = new Discord.MessageEmbed() 
                    .setColor(bot.config.COLORS.BLURPLE)
                    .setTitle(`🔗 Votre lien de verification:`)
                    .setDescription(`Le **bouton ci-dessous** vous permet d'acceder a votre lien de verification.
                    _Pour plus d'informations, rendez-vous dans le channel <#${"815036677655101481"}> _`);

                button.reply.send('', {
                    component: verificationLinkButton,
                    embed: memberCodeEmbed,
                    ephemeral: true
                });

                break;

            case 'open_support_ticket_b_j1O1De':
                if(m.isInTicket){
                    button.reply.send('Vous avez déjà un ticket en cours de résolution !', true);
                    return;
                }
                m.isInTicket = true;
                const channel = await message.guild.channels.create(`ticket-de-${authorName}`,{
                    type: 'text',
                    parent: "815687987739230290",
                    permissionOverwrites: [
                        {deny: 'VIEW_CHANNEL', id: message.guild.id},
                        {allow: 'VIEW_CHANNEL', id: m.user.id},
                        {allow: 'VIEW_CHANNEL', id: bot.config.I_ROLES.STAFF},
                    ],
                });

                channel.ticketIsClosing = false;
                channel.ticketMember = m.user;
                channel.send(`<@&${bot.config.I_ROLES.STAFF}> <@${m.user.id}>`);

                let ticketEmbed1 = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.BLURPLE)
                    .setTitle(`🎫 Ticket Support de ${authorName}`)
                    .setDescription(`${bot.botEmojis.GLOBAL.BULLET} <@${m.user.id}> un membre de notre équipe arrive pour vous aider.
                    Merci de décrire clairement et avec détails votre soucis afin que la résolution de votre problème se fasse le plus rapidement possible !`);

                let closeTicketButton = new DiscordButtons.MessageButton()
                    .setLabel(" Fermer")
                    .setStyle("red")
                    .setEmoji('🔐')
                    .setID('close_support_ticket_b_VEqKZu')

                channel.send('', {
                    component: closeTicketButton,
                    embed: ticketEmbed1
                });

                button.defer();
                break;

            case 'close_support_ticket_b_VEqKZu':
                if(!message.channel.name.startsWith("ticket-de-")) return;
                if(message.channel.ticketIsClosing) return;
                if(message.channel.ticketMember) message.channel.ticketMember.isInTicket = false;
                if(!message.guild.members.cache.find(me => me.user.id == m.user.id).roles.cache.find(r => r.id == bot.config.I_ROLES.STAFF)) {
                    button.reply.send("Vous n'avez pas la permission de faire cela !", true);
                    return;
                }

                var replyEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.RED)
                    .setDescription(`**Fermeture du ticket dans 10 secondes !**`)
                    .setFooter("Cliquez sur 🔓 pour réouvrir le ticket");

                let reopenTicketButton = new DiscordButtons.MessageButton()
                    .setLabel(" Réouvrir")
                    .setStyle("green")
                    .setEmoji('🔓')
                    .setID('reopen_support_ticket_b_l1LZnq')

                message.channel.send('', {
                    component: reopenTicketButton,
                    embed: replyEmbed
                });

                message.channel.ticketIsClosing = true;
                setTimeout(() => {
                    if(!message) return;
                    if(!message.channel) return;
                    if(!message.channel.ticketIsClosing) return;
                    message.channel.delete()
                }, 10 * 1000)

                button.defer();
                break; 

            case "reopen_support_ticket_b_l1LZnq":
                if(!message.channel.ticketIsClosing) return;
                if(message.channel.ticketMember) message.channel.ticketMember.isInTicket = false;
                if(!message.guild.members.cache.find(me => me.user.id == m.user.id).roles.cache.find(r => r.id == bot.config.I_ROLES.STAFF)) {
                    button.reply.send("Vous n'avez pas la permission de faire cela !", true);
                    return;
                }        
                
                message.channel.ticketIsClosing = false; 
                var replyEmbed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.GREEN)
                    .setDescription(`**Réouverture du ticket !**`)
                    .setFooter("Cliquez sur 🔐 pour refermer le ticket");

                let recloseTicketButton = new DiscordButtons.MessageButton()
                    .setLabel(" Fermer")
                    .setStyle("red")
                    .setEmoji('🔐')
                    .setID('close_support_ticket_b_VEqKZu')

                message.channel.send('', {
                    component: recloseTicketButton,
                    embed: replyEmbed
                });

                button.defer();
                break;

            case "darkrp_server_discord_b_vhPOjM":
                button.reply.send('https://discord.gg/wcPEjuUtfZ', true);

                let servers2Embed = new Discord.MessageEmbed()
                    .setColor(bot.config.COLORS.BLURPLE)
                    .setTitle(`:joystick: Nos plateformes de Jeu`)
                    .setDescription(`Conoda Roleplay est actuellement composé d'un unique serveur Garry's Mod: ${bot.botEmojis.GLOBAL.BLANK_BULLET}

                ${bot.botEmojis.NUMBERS._1} **Notre serveur DarkRP:**`);

                let discordButton = new DiscordButtons.MessageButton()
                    .setLabel("Copié")
                    .setID('darkrp_server_discord_b_vhPOjM')
                    .setEmoji('817885645514997800')
                    .setStyle('green')
                let workshopButton = new DiscordButtons.MessageButton()
                    .setLabel("Collection Steam")
                    .setStyle("url")
                    .setEmoji('854493775577350174')
                    .setURL(`https://steamcommunity.com/sharedfiles/filedetails/?id=2448603132`)
                let ipButton = new DiscordButtons.MessageButton()
                    .setLabel("IP")
                    .setStyle("url")
                    .setEmoji('854493775577350174')
                    .setURL(`https://conoda-roleplay.fr/api/connect/164.132.206.138:27075`)
                let mapButton = new DiscordButtons.MessageButton()
                    .setLabel("rp_conoda_alpha")
                    .setStyle("grey")
                    .setEmoji('🗺️')
                    .setID('darkrp_server_map_b_SxkzeV')

                let row = new DiscordButtons.MessageActionRow()
                    .addComponent(discordButton)
                    .addComponent(workshopButton)
                    .addComponent(ipButton)
                    .addComponent(mapButton);

                button.message.edit({
                    component: row,
                    embed: servers2Embed
                });

                setTimeout(() => {
                    let discordButton = new DiscordButtons.MessageButton()
                        .setLabel("Discord")
                        .setID('darkrp_server_discord_b_vhPOjM')
                        .setEmoji('855184280274862090')
                        .setStyle('blurple')

                    let row = new DiscordButtons.MessageActionRow()
                        .addComponent(discordButton)
                        .addComponent(workshopButton)
                        .addComponent(ipButton)
                        .addComponent(mapButton);

                    button.message.edit({
                        component: row,
                        embed: servers2Embed
                    });
                }, 2000);

                break;
                
            default:
                button.defer();
        }
    }
    
    console.log('Button clicked !');
}