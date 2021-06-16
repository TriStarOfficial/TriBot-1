const { Message, Client, MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const { default: axios } = require('axios');

module.exports = {
    name: 'axios',
    description: 's',
    category: 's',
    StaffCommand: false,
    BotCommand: false,
    Developer: true,
    ModOnly: false,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async (client, message, args, text, prefix, command) => {
        const Meth = args[1]
        const res = await axios.get(args[0], {
            method: Meth,
        })

        console.log(res.data)
    }
}