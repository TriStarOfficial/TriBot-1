//https://nekobot.xyz/api/image?type=boobs

const { Message, Client, MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const { default: axios } = require('axios');

module.exports = {
    name: 'boob',
    description: 'Send Boobs',
    category: 'nsfw',
    StaffCommand: false,
    BotCommand: false,
    Developer: false,
    ModOnly: false,
    nsfw: true,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async (client, message, args, text, prefix, command) => {
        const res = await axios.get('https://nekobot.xyz/api/image?type=boobs')
        const embed = new MessageEmbed()
        .setColor('BLURPLE')
        .setImage(res.data.message)
        .setTimestamp()
        .setTitle('Boobs')
        .setURL(`${res.data.message}`)
        message.channel.send(embed)
    }
}