const { default: axios } = require('axios');
const { Message, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'roblox',
    description: 'Get\'s Roblox game detials',
    category: 'test',
    StaffCommand: false,
    BotCommand: false,
    Developer: false,
    ModOnly: true,
    nsfw: false,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    execute: async (client, message, args, text, prefix, command) => {
        const rbxres = await axios.get('https://games.roblox.com/v1/games/list?model.maxRows=5', {
            method: 'GET',
            headers: {
                'Accpet': 'application/json'
            }
        }).then(res => res.data);

        console.log(rbxres['games'][0])
    }
}