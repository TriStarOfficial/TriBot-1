const { Message, Client, MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'uinfo',
    description: 'Get\'s User Info',
    category: 'Info',
    aliases: ['userinfo'],
    StaffCommand: false,
    BotCommand: true,
    Developer: false,
    ModOnly: false,
    nsfw: false,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    execute: async (client, message, args, text, prefix, command) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if (!user) return;

        const InfoEmbed = new MessageEmbed()
        InfoEmbed.setColor('BLURPLE')
        InfoEmbed.setDescription(`
        ** Account Info **
        > Name: ${user.user.tag}
        > ID: ${user.user.id}
        > Avatar: [Click here](${user.user.avatarURL({ dynamic: true })})
        > Created At: ${user.user.createdAt}
        > Account Age: ${moment(user.user.createdAt).fromNow()}

        ** Presense Info **
        > Status: ${user.presence.status.toUpperCase()}
        

        ** Server Member Info **
        > Nickname: ${user.nickname ? user.nickname : "None"}
        > Joined At: ${user.joinedAt}
        
        ** Roles **
        > ${user.roles.cache.map(r => r).slice(0, -1).join(", ")}
        `)

        message.channel.send(InfoEmbed)
    }
}