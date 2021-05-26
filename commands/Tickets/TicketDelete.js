const { MessageEmbed, Client,Message, MessageAttachment } = require('discord.js')
const fs = require('fs')

module.exports = {
    name: 'ticket-close',
    description: 'Close a Ticket!',
    category: 'Tickets',
    StaffCommand: false,
    BotCommand: false,
    Developer: false,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async(client,message,args) => {
        if (!message.member.roles.cache.has('835456151184736296'|| '842127079574732820')) return message.channel.send(new MessageEmbed().setDescription('Missing Required Role!').setColor('RED'));
        if (message.channel.parentID !== '837728403876610078') return message.channel.send(new MessageEmbed().setColor('RED').setDescription('This Command is only useable with Ticket Category!')).then(m => m.delete({ timeout: 5000 }));
        const TranscriptChannel = message.guild.channels.cache.get('846666365863067688')
        message.channel.send(new MessageEmbed().setColor("RANDOM").setDescription('Ticket Closing in 5 Seconds...').setTitle('TriStar Ticket'))
        setTimeout(() => {
            message.channel.delete().then(async ch => {
                client.TicketTranscript.findOne({ Channel: ch.id }, async(err,data) => {
                    if (err) throw err;
                    if (data){
                        fs.writeFileSync(`../${ch.id}.txt`, data.Content.join("\n\n"))
                        TranscriptChannel.send(new MessageEmbed()
                        .attachFiles(new MessageAttachment(fs.createReadStream(`../${ch.id}.txt`)))
                        .setColor('RANDOM')
                        .setTitle(`${message.guild.members.cache.get(ch.name).user.tag} Ticket!`)
                        )
                        await client.TicketTranscript.findOneAndDelete({ Channel: ch.id })
                    }
                })
            })
        }, 5000);
    }
}