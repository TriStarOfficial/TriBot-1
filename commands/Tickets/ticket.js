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
        const chan = message.guild.channels.cache.find(ch => ch.name === `ticket-${message.author.username}`)
        if (chan) return message.channel.send(new MessageEmbed().setColor('RED').setDescription(`You already have a ticket opned! <#${chan.id}>`)).then(m => m.delete({ timeout: 5000 }));
        const text = args.join(" ");
        const Executor = text.split(',')[0]
        
        if (!Executor) return message.channel.send(
            new MessageEmbed()
            .setColor('RED')
            .setDescription('Missing Argument **Executor Name**')
            .addField('Usage:', '-ticket [Executor name]', true)
            .addField('Example:', '-ticket Krnl.')
            ).then(m => m.delete({ timeout: 5000 }))
            
            await message.delete()
            message.guild.channels.create(`ticket-${message.author.username}`, {
                type: 'text',
                parent: '837728403876610078',
                topic: message.author.id,
                permissionOverwrites: [
                    {
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL']
                },
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
                },
                {
                    id: '835456151184736296',
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
                },
                {
                    id: '842127079574732820',
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
                }
            ]
        }).then(async ch => {
            message.reply(new MessageEmbed().setColor('GREEN').setDescription(`You have created a ticket! Click <#${ch.id}> to view your Ticket!`)).then(m => m.delete({ timeout: 1000*10 }))
            ch.send(`<@${message.author.id}> Welcome!`, new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('TriStar Tickets')
            .setDescription('Please Inform the support team about your Issues with the script!\nUse **-ticket-close** to close the Ticket!')
            .addField("Executor", Executor, true)
            )
            ch.send('<@&842127079574732820> <@&835456151184736296>').then(m => m.delete())
        })
    }
}