const { MessageEmbed, Client,Message, MessageAttachment } = require('discord.js')
const fs = require('fs')

module.exports = {
    name: 'ticket-close',
    description: 'close a Ticket!',
    category: 'Tickets',
    BotCommand: false,
    StaffCommand: false,
    Developer: false,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async(client,message,args) => {

        if (message.channel.name.includes('closed')) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('The Channel is already Closed. Stupid!'))
        
        message.channel.send(new MessageEmbed().setColor('RANDOM').setDescription('This channel will be closed!')).then(m => m.delete({ timeout: 1000*5 }))

        await message.channel.setName(`${message.channel.name}-closed`)
        client.TicketTranscript.findOne({ Channel: message.channel.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                message.channel.overwritePermissions([
                    {
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL']
                    },
                    {
                        id: data.User,
                        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
                    },
                    {
                        id: '835456151184736296',
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
                    },
                    {
                        id: '842127079574732820',
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
                    }
                ])
            }
        })
        
    }
}    