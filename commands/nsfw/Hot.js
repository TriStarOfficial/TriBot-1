const { Message, Client, MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const RandomInt = require('../../Modules/RandomInt');
const { hot } = require('../../json/nsfw.json');
const { default: axios } = require('axios');

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
        const randomurl = hot[Math.floor(Math.random() * hot.length)].toString()
        const res = await axios.get(randomurl).then(res => res.data)
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