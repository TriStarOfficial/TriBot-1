const { Message, Client, MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const RandomInt = require('../../Modules/RandomInt');
const { default: fetch } = require('node-fetch');

module.exports = {
    name: 'reddit',
    description: 'Test',
    category: 'test',
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
        if (!args.slice(0).join(" ")) return;
        var Int = RandomInt(50)
        const Reddit = args.slice(0).join(" ");
        const Redit = await fetch(`https://reddit.com/r/${Reddit}/new.json`)
        .then(res => res.json())
        .catch(err => {
            return message.channel.send(err, { code: 'xml' });
        });
        const post = Redit['data']['children'][Int].data

        console.log(post.url)
    }
}