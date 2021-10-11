const Discord = require('discord.js');
const DiscordButtons = require('discord-buttons');

module.exports = {
    name: "test",
    description: "Test Bot",
    category: "dynamo",
    timeout: 0,
    enabled: true,
    restrictions: [""],
    aliases: ["update"],
    run: async (bot, message, args, botEmojis) => {
        if(message.author.id != bot.config.OWNER_ID){
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.DENY)
                .setFooter(`Message auto-supprimé dans 5 secondes`)
                .setDescription(`<@${message.author.id}> **vous n'avez pas la permission de faire ca**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 5 * 1000)
            return;
        }

        console.log("Testing...");
        var replyEmbed = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.ALLOW)
            .setFooter(`Message auto-supprimé dans 5 secondes`)
            .setDescription(`**Testing...**`)

        /*let linkButton = new DiscordButtons.MessageButton()
            .setLabel("Test des buttons link")
            .setStyle("url")
            .setURL("https://www.google.com")
        let emojiButton = new DiscordButtons.MessageButton()
            .setLabel("Test des buttons emojis")
            .setStyle("grey")
            .setEmoji("🍕")
            .setID("emoji_button")
        let primaryDangerButton = new DiscordButtons.MessageButton()
            .setLabel("Test des buttons danger")
            .setStyle("red")
            .setID("danger_button")
        let primarySuccessButton = new DiscordButtons.MessageButton()
            .setLabel("Test des buttons success")
            .setStyle("green")
            .setID("success_button")
        let primaryButton = new DiscordButtons.MessageButton()
            .setLabel("Test des buttons primary")
            .setStyle("blurple")
            .setID("primary_button")
        let secondaryButton = new DiscordButtons.MessageButton()
            .setLabel("Test des buttons secondary")
            .setStyle("grey")
            .setID("secondary_button");

        let row = new DiscordButtons.MessageActionRow()
            .addComponent(linkButton)
            .addComponent(emojiButton);

        let row2 = new DiscordButtons.MessageActionRow()
            .addComponent(primaryDangerButton)
            .addComponent(primarySuccessButton)
            .addComponent(primaryButton)
            .addComponent(secondaryButton);*/

        let discordButton = new DiscordButtons.MessageButton()
            .setLabel("Discord")
            .setID('darkrp_server_discord_b_vhPOjM')
            .setEmoji('855184280274862090')
            .setStyle('blurple')

        message.channel.send('Test', {
            component: discordButton,
            embed: replyEmbed
        });
    }
}