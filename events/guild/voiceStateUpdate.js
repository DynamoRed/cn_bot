module.exports = (bot, oldState, newState) => {
    let newUserChannel = newState.channel
    let oldUserChannel = oldState.channel

    if(newUserChannel.guild.id != "693198481086480544" && newUserChannel.guild.id != "618855620820336640"){
        return;
    }
    
    if(newUserChannel !== undefined) {
       if(newUserChannel.id == bot.config.I_CHANNELS.CREATE_CHANNEL){
           var name = newState.member.nickname ? newState.member.nickname : newState.member.user.username;
            newUserChannel.guild.createChannel(`🔊・Canal de ` + name, {
                type: 'voice',
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
                ch.setParent(newUserChannel.parent)
                newState.member.setVoiceChannel(ch)
            })
        }
    }

    if(oldUserChannel){
        if(oldUserChannel.members.size === 0 && oldUserChannel.parent.id == bot.config.I_CHANNELS.CREATE_CHANNELS_CATEGORIE && oldUserChannel.id != bot.config.I_CHANNELS.CREATE_CHANNEL){
            oldUserChannel.delete();
        }
    }
}