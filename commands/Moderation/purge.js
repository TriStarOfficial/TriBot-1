const { Message, Client, MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');

module.exports = {
    name: 'purge',
    description: 'Pruges/Clear the current Channel!',
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
        const BulkValue = args.slice(0).join(" ");
        if (!BulkValue) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Missing Number Arguments!').addField('Usage: ', `\`\`\`ini\n  [x] -purge [Value] \n\`\`\``));
        if (typeof BulkValue !== "number") return message.channel.send(new MessageEmbed().setDescription('Nigger Number only').setColor('RED'))
        
        if (BulkValue < 2) return message.channel.send(new MessageEmbed().setColor('RED').setTitle('Low Number').setDescription('Number Argument must be over `1`'));
        if (BulkValue > 100) return message.channel.send(new MessageEmbed().setColor('RED').setTitle('Overlimited Number').setDescription('Number Argument must be less than `100`. Due too discord Limitation'));
        
        message.channel.bulkDelete(BulkValue)
        message.delete();
    }
}