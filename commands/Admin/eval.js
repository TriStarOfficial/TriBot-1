const { MessageEmbed, Client,Message } = require('discord.js')

module.exports = {
    name: 'eval',
    description: 'Just eval shit!',
    category: 'Admin',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async(client,message,args) => {
        if (message.content.includes('token')) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Trying to steal Token Detected!').setTimestamp());
        
    }
}