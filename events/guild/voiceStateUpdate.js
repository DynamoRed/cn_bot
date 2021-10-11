module.exports = (bot, oldState, newState) => {
    if(newState.channelID != undefined) {
       if(newState.channelID == "701635852228624491"){
           var name = newState.member.nickname ? newState.member.nickname : newState.member.user.username;
            newState.channel.guild.channels.create(`🔊・Canal de ` + name, {
                type: 'voice',
                parent: newState.channel.parent,
                permissionOverwrites: [
                    {
                        allow: 'KICK_MEMBERS',
                        id: newState.member.id
                    }, 
                    {
                        allow: 'MANAGE_CHANNELS',
                        id: newState.member.id
                    },
                    {
                        allow: 'CONNECT',
                        id: newState.member.id
                    },
                    {
                        allow: 'SPEAK',
                        id: newState.member.id
                    },
                    {
                        allow: 'PRIORITY_SPEAKER',
                        id: newState.member.id
                    },
                    {
                        allow: 'VIEW_CHANNEL',
                        id: newState.member.id
                    },
                    {
                        deny: 'CONNECT',
                        id: "701635848164081685"
                    },
                    {
                        allow: 'CONNECT',
                        id: "761144115752206356"
                    }
                ]
            }).then(ch => {
                newState.member.voice.setChannel(ch)
            })
        }
    }

    if(oldState.channelID != undefined){
        if(oldState.channel.members.size === 0 && oldState.channel.parent.id == "701635852228624490" && oldState.channelID != "701635852228624491" && oldState.channelID != "701635852719095962" && oldState.channelID != "701635852723290113" && oldState.channelID != "701635853168017449"){
            oldState.channel.delete();
        }
    }
}