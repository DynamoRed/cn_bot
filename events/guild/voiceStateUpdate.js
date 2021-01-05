module.exports = (bot, oldState, newState) => {
    if(newState.channelID != undefined) {
       if(newState.channelID == bot.config.I_CHANNELS.CREATE_CHANNEL){
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
                    }
                ]
            }).then(ch => {
                newState.member.voice.setChannel(ch)
            })
        }
    }

    if(oldState.channelID != undefined){
        if(oldState.channel.members.size === 0 && oldState.channel.parent.id == bot.config.I_CHANNELS.CREATE_CHANNELS_CATEGORIE && oldState.channelID != bot.config.I_CHANNELS.CREATE_CHANNEL){
            oldState.channel.delete();
        }
    }
}