const Discord = require('discord.js');
module.exports = {
    name: "advertup",
    description: "Rapeller aux gens de se verifier",
    category: "dynamo",
    timeout: 0,
    enabled: true,
    restrictions: [""],
    aliases: ["adup"],
    run: async (bot, message, args, botEmojis) => {
        if(message.author.id != bot.config.OWNER_ID){
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(config.COLORS.DENY)
                .setFooter(`Message auto-supprimé dans 5 secondes`)
                .setDescription(`<@${message.author.id}> **vous n'avez pas la permission de faire ca**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 5 * 1000)
            return;
        }

        bot.db.query(`SELECT user_id FROM verification_codes WHERE active='1'`, async function(err, results){
            if (err) throw err;
            if(results){
                results.forEach(r => {
                    let gMember = message.guild.members.cache.get(r.user_id);
                    
                    if(!gMember) return;

                    const rand=()=>Math.random(0).toString(36).substr(2);
                    const token=(length)=>(rand()+rand()+rand()+rand()).substr(0,length);

                    let generatedCode = token(7);

                    bot.db.query(`UPDATE verification_codes SET active='0' WHERE user_id='${gMember.user.id}'`, async function(err, results){
                        if (err) throw err;
                    })

                    bot.db.query(`INSERT INTO verification_codes(code, user_id, active) VALUES ('${generatedCode}', '${gMember.user.id}', '1')`, async function(err, results){
                        if (err) throw err;
                    })

                    let reMemberCodeEmbed1 = new Discord.MessageEmbed() 
                        .setColor(bot.config.COLORS.BASE)
                        .setTitle(`⏰ Relance de la verification`)
                        .setDescription(`Bonjour,

                        Il semblerait que vous soyez présent sur notre discord depuis un certain temps
                        Cependant nous avons remarqué que vous **n'aviez pas verifié votre compte**.
                        
                        Pour votre sécurité, nous avons **regenerer** votre **lien de verification**, ce dernier devrait vous être envoyé dans les quelques secondes a venir 😉`);
                    gMember.send(reMemberCodeEmbed1);

                    let reMemberCodeEmbed2 = new Discord.MessageEmbed() 
                        .setColor(bot.config.COLORS.BASE)
                        .setTitle(`🔗 Votre nouveau lien de verification:`)
                        .setDescription(`[Cliquez ici pour acceder a votre lien](https://auth.conoda-roleplay.fr/verify/discord?c=${generatedCode})
                        _Pour plus d'informations, rendez-vous dans le channel <#${"815036677655101481"}> _`);
                    gMember.send(reMemberCodeEmbed2);

                    message.author.send(`Reverification envoyée a <@${r.user_id}>`);
                })
            }
        })
    }
}