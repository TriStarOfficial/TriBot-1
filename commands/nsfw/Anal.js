const { default: axios } = require('axios');
const { Message, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'anal',
    description: 'Sends an Anal Image!',
    category: 'nsfw',
    StaffCommand: false,
    BotCommand: false,
    Developer: false,
    ModOnly: false,
    nsfw: true,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    execute: async (client, message, args, text, prefix, command) => {
        const res = await axios.get('https://www.nekos.life/api/v2/img/anal').then(res => res.data);

        const embed = new MessageEmbed()
        .setColor('BLURPLE')
        .setImage(res.url)
        .setTitle('Anal')
        .setURL(res.url)
        .setFooter('Requested At: ' + message.createdAt)
        message.channel.send(embed)
    }
}