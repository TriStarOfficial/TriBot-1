const { Message, Client, MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const { default: fetch } = require('node-fetch');
const RandomInt = require('../../Modules/RandomInt');

module.exports = {
    name: 'hot',
    description: 'Sends a hot nsfw Image!',
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
        var Int = RandomInt(50)
        const res = await fetch('https://www.reddit.com/r/nsfw/new.json?sort=hot').then(res => res.json());
        const Reddit = res['data']['children'][Int]['data']

        const embed = new MessageEmbed()
        .setTitle(Reddit['title'])
        .setURL(Reddit['url'])
        .setThumbnail(Reddit['thumbnail'])
        .addField('Reddit Post', `[Go to Reddit Post!](https://reddit.com${Reddit['permalink']})`, true)
        .setImage(Reddit['url'])
        .setFooter(`${Reddit['ups']} 👍 | ${Reddit['downs']} 👎 | ${Reddit['num_comments']} 💬`)
        .setColor('0x7289da')
        message.channel.send(embed)
        message.delete()
    }
}