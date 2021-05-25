const { MessageEmbed, Client,Message } = require('discord.js')
const { Channel: { botCommands } } = require('../../config.json')

module.exports = {
    name: 'suggestion-accepted',
    description: 'Null!',
    category: 'Suggest',
    StaffCommand: true,
    BotCommand: false,
    Developer: true,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async(client,message,args) => {
        const MessageID = args[0];
        const FixedQuery = args.slice(1).join(" ");
        
        if (!MessageID) return message.channel.send(new MessageEmbed().setDescription('Missing Message ID!').setColor('RED'));
        if (!FixedQuery) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Missing Fixed Message!'))

        try {
        
            const BugReportChannel = message.guild.channels.cache.get('837033902824226917')
            const BugReportedEmbed = await BugReportChannel.messages.fetch(MessageID);
            const Data = BugReportedEmbed.embeds[0]
            const FixedEmbed = new MessageEmbed()
            .setAuthor(Data.author.name, Data.author.iconURL)
            .setDescription(Data.description)
            .setColor('GREEN')
            .addField(`Status (Accepted) By: ${message.author.tag}`, FixedQuery)
            
            BugReportedEmbed.edit(FixedEmbed);
            BugReportedEmbed.reactions.removeAll();
        } catch (err) {
            message.channel.send(new MessageEmbed()
            .setColor('RED')
            .setDescription('That suggestion doesn\'t exists!')
            .setTimestamp()
            )
            client.channels.cache.get('846666365863067688').send(new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
            .setColor('RED')
            .setDescription(err)
            .setTimestamp()
            )
        }
    }
} 