const ownsChannels = new Map();

module.exports = (bot, oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel

    if(newUserChannel.guild.id != "693198481086480544" && newUserChannel.guild.id != "618855620820336640"){
        return;
    }
  
    if(newUserChannel !== undefined) {
       if(newUserChannel.id == bot.config.I_CHANNELS.CREATE_CHANNEL){
           var name = newMember.nickname ? newMember.nickname : newMember.user.username;
            newUserChannel.guild.createChannel(`🔊・Canal de ` + name, {
                type: 'voice',
                permissionOverwrites: [
                    {
                        allow: 'KICK_MEMBERS',
                        id: newMember.id
                    }, 
                    {
                        allow: 'MANAGE_CHANNELS',
                        id: newMember.id
                    },
                    {
                        allow: 'CONNECT',
                        id: newMember.id
                    },
                    {
                        allow: 'SPEAK',
                        id: newMember.id
                    },
                    {
                        allow: 'PRIORITY_SPEAKER',
                        id: newMember.id
                    },
                    {
                        allow: 'VIEW_CHANNEL',
                        id: newMember.id
                    }
                ]
            }).then(ch => {
                ch.setParent(newUserChannel.parent)
                newMember.setVoiceChannel(ch)
                ownsChannels.set(ch.id, newMember.user.id);
            })
        }
    }

    if(oldUserChannel !== undefined){
        if(oldUserChannel.members.size === 0 && ownsChannels.get(oldUserChannel.id)){
            oldUserChannel.delete();
            ownsChannels.set(oldUserChannel.id, null);
        }
    }
}