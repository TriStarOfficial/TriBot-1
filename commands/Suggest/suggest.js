const { MessageEmbed, Client,Message } = require('discord.js')
const { Channel: { botCommands } } = require('../../config.json')

module.exports = {
    name: 'suggest',
    description: 'Suggests a feature or a game!',
    category: 'Suggest',
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
        const report = args.slice().join(" ");
        if (!report) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Please Secify a Suggestion!'));

        const embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
        .setDescription(report)
        .setTitle('Suggestion By '+ message.author.tag)
        .addField('Status (Decision Pending)', 'Status Currently Not Decided!')
        .setColor('ORANGE')

        message.channel.send(new MessageEmbed().setDescription('Your Suggestion has been sent!').setColor('RANDOM')).then(m => m.delete({ timeout: 5000 }))
        client.channels.cache.get('837033902824226917').send(embed).then(msg => {
            msg.react('⬆')
            msg.react('⬇')
        })
    }
}