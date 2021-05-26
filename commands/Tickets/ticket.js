const { MessageEmbed, Client,Message } = require('discord.js')
module.exports = {
    name: 'ticket',
    description: 'Create a Ticket!',
    category: 'Tickets',
    StaffCommand: false,
    BotCommand: true,
    Developer: false,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async(client,message,args) => {
        message.delete()
        const chan = message.guild.channels.cache.find(ch => ch.name === message.author.id)
        if (chan) return message.channel.send(new MessageEmbed().setColor('RED').setDescription(`You already have a ticket opned! <#${chan.id}>`)).then(m => m.delete({ timeout: 5000 }));
        message.guild.channels.create(message.author.id, {
            type: 'text',
            parent: '837728403876610078',
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL']
                },
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
                }
            ]
        }).then(async ch => {
            message.reply(new MessageEmbed().setColor('GREEN').setDescription(`You have created a ticket! Click <#${ch.id}> to view your Ticket!`)).then(m => m.delete({ timeout: 1000*10 }))
            ch.send(`<@${message.author.id}> Welcome!`, new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('TriStar Tickets')
            .setDescription('Please Inform the support team about your Issues with the script!')
            )
            ch.send('<@722647978577363026>').then(m => m.delete())
        })
    }
}