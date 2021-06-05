const { MessageEmbed, Client,Message } = require('discord.js')
const { Channel: { botCommands } } = require('../../config.json')

module.exports = {
    name: 'suggestion-decline',
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
    execute: async(client,message,args, prefix) => {
        const MessageID = args[0];
        const FixedQuery = args.slice(1).join(" ") || "No Message Given!";
        
        if (!MessageID) return message.channel.send(new MessageEmbed().setDescription('Missing Message ID!').setColor('RED'));

        try {
        
            const BugReportChannel = message.guild.channels.cache.get('837033902824226917')
            const BugReportedEmbed = await BugReportChannel.messages.fetch(MessageID);
            const Data = BugReportedEmbed.embeds[0]
            const FixedEmbed = new MessageEmbed()
            .setAuthor(Data.author.name, Data.author.iconURL)
            .setDescription(Data.description)
            .setColor('RED')
            .addFields(Data.fields[0])
            .addField(`Status (Declined) By ${message.author.tag}`, FixedQuery)
            
            BugReportedEmbed.edit(FixedEmbed);
            BugReportedEmbed.reactions.removeAll();
            const user = await client.users.cache.find((u) => u.tag === Data.author.name);
            const embed = new MessageEmbed()
            .setColor('RED')
            .setTitle('Suggestion Declined')
            .setDescription('We are sorry to inform you but your suggestion was Declined!' + ` [Message](https://discord.com/channels/835445611322802186/837033902824226917/${MessageID})`)
            .addField('Declined by', message.author.tag, true)
            .addField('Message Content', Data.description)
            user.send(embed).catch(err => { if (err) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('User DM is Closed!')).then(m => m.delete({ timeout: 1000 *10 })) })

        } catch (err) {
            message.channel.send(new MessageEmbed()
            .setColor('RED')
            .setDescription('That suggestion doesn\'t exist!')
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