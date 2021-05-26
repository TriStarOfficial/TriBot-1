const { MessageEmbed, Client,Message } = require('discord.js')
const { Channel: { botCommands } } = require('../../config.json')

module.exports = {
    name: 'bug',
    description: 'Reports a bug that is in the script!',
    category: 'Reports',
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
        if (!report) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Please Secify a Bug!'));

        const embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
        .setDescription(report)
        .setTitle('Bug Reported By '+ message.author.tag)
        .addField('Status (Fixing)', 'Bug is currently in Fixing Status!')
        .setColor('ORANGE')

        message.channel.send(new MessageEmbed().setDescription('Your Bug report has been sent!').setColor('RANDOM')).then(m => m.delete({ timeout: 5000 }))
        client.channels.cache.get('837091940520296478').send(embed).then(m => m.react('⚠'))
    }
}