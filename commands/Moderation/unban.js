const { Message, Client, MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');

module.exports = {
    name: 'unban',
    description: 'Unbans a Member!',
    category: 'Moderation',
    StaffCommand: true,
    BotCommand: false,
    Developer: false,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async (client, message, args, prefix) => {
        let ToUnban = await client.users.fetch(args[0]);
        let Reason = args.slice(1).join(" ") || "Unspecified"

        var d = new Date,
        dformat = [d.getMonth() + 1,
        d.getDate(),
        d.getFullYear()].join('/') + ' ' +
            [d.getHours(),
            d.getMinutes(),
            d.getSeconds()].join(':');

        if(!ToUnban) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Missing User ID').addField('Usage', '```ini\n' + '-unban [user id] (reason - not required)'))

        message.guild.members.unban(ToUnban, Reason)
        message.channel.send(new MessageEmbed()
        .setColor('GREEN')
        .setTitle(`${ToUnban.tag} is Unbanned!`)
        .addField('Unbanned By: ', `${message.author} | ${message.author.tag}`)
        .addField('Unbanned At: ', dformat)
        .addField('Reason: ', Reason)
        )
    }
}