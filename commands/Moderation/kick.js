const { Message, Client, MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');

module.exports = {
    name: 'kick',
    description: 'Kicks a Member!',
    category: 'Moderation',
    StaffCommand: false,
    BotCommand: false,
    Developer: false,
    ModOnly: true,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async (client, message, args, prefix) => {
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
        if (!target) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Please Mention a user or a user id!').addField('Usage: ' , '```ini\n' + ' [x] -kick [mention | userid | Username - Required] (reason - Not Required)' +'\n```'));
        if (!target.kickable) return message.channel.send(new MessageEmbed().setTitle('User Not Kickable!').setColor('RED').setDescription(`${target} is not kickable. May due to user role is higher than ${client.user}.`))
        const reason = args.slice(1).join(" ") || "Unspecified";
        var d = new Date,
            dformat = [d.getMonth() + 1,
            d.getDate(),
            d.getFullYear()].join('/') + ' ' +
                [d.getHours(),
                d.getMinutes(),
                d.getSeconds()].join(':');

        const KickEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('Member Kicked!')
        .addField('Member Kicked: ', target)
        .addField('Kicked By: ', message.author)
        .addField('Reason: ', reason)
        .addField('Kicked At: ', dformat)
        const AuthorKickedEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('You\'re Kicked From '+ message.guild.name)
        .addField('Reason: ', reason)
        .addField('Kicked By: ', message.author)

        target.send(AuthorKickedEmbed).catch(e => message.channel.send(new MessageEmbed().setColor('RED').setTitle('Coudn\'t DM Target!').setDescription('Coudn\'t DM Target! the message. highly Due to Target DM is Closed!').addField('Error', e)));
        target.kick({ reason: reason });
        message.channel.send(KickEmbed);
    }
}