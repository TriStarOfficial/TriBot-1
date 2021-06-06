const { default: axios } = require('axios');
const { Message, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'blowjob',
    description: 'Sends a blowjob image!',
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
        const res = await axios.get('https://www.nekos.life/api/v2/img/blowjob').then(res => res.data);

        const embed = new MessageEmbed()
        .setTitle('Blowjob')
        .setImage(res.url)
        .setColor("BLURPLE")
        .setFooter('Requested At: ' + message.createdAt)
        .setURL(res.url)
        message.channel.send(embed)
    }
}