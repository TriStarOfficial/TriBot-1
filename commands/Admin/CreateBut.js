const { Message, Client, MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const { TriStar } = require('../../json/script.json');

module.exports = {
    name: 'button',
    description: '',
    category: '',
    StaffCommand: false,
    BotCommand: false,
    Developer: true,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async (client, message, args, prefix) => {
        

        let btn = new MessageButton()
        .setStyle('blue')
        .setLabel('Paypal')
        .setID('PaypalButton')
        .setEmoji('❤')

        message.channel.send('Paypal', btn)
        client.on('clickButton', async button => {
            if (button.id === 'PaypalButton') {
                client.users.cache.get(button.clicker.user.id).send(TriStar)
            }
        })
    }
}