const { Message, Client, MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');

module.exports = {
    name: 'snipe',
    description: 'Snipes Last Deleted Message!',
    category: 'Moderation',
    StaffCommand: false,
    BotCommand: false,
    Developer: false,
    ModOnly: true,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async (client, message, args, prefix) => {
        const msg = client.snipes.get(message.channel.id);
        if (!msg) return message.channel.send(new MessageEmbed().setDescription('No Messages to snipe.').setColor('RED'));

        const SnipedEmbed = new MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setDescription(msg.content)
        .addField('Deleted At:', msg.date)
        .setColor('RANDOM')

        message.channel.send(SnipedEmbed);
    }
}