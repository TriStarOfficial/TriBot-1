const { Message, Client, MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');

module.exports = {
    name: 'ban',
    description: 'Bans a Member!',
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
        if (!target) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Please Mention a user or a user id!').addField('Usage: ' , '```ini\n' + ' [x] -ban [mention | userid | Username - Required] (reason - Not Required)' +'\n```'));
        if (!target.bannable) return message.channel.send(new MessageEmbed().setTitle('User Not Banable!').setColor('RED').setDescription(`${target} is not banable. May due to user role is higher than ${client.user}.`))
        if (target.id === message.author.id) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('You can\'t ban yourself! Dumb ass!'))
        const reason = args.slice(1).join(" ") || "Unspecified";
        var d = new Date,
            dformat = [d.getMonth() + 1,
            d.getDate(),
            d.getFullYear()].join('/') + ' ' +
                [d.getHours(),
                d.getMinutes(),
                d.getSeconds()].join(':');

        const BanEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('Member Banned!')
        .addField('Member Banned: ', target)
        .addField('Banned By: ', message.author)
        .addField('Reason: ', reason)
        .addField('Banned At: ', dformat)
        const AuthorBannedEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('You\'re Banned From '+ message.guild.name)
        .addField('Reason: ', reason)
        .addField('Banned By: ', message.author)
        .addField('Appeal: ', 'nil')

        target.send(AuthorBannedEmbed).catch(e => message.channel.send(new MessageEmbed().setColor('RED').setTitle('Coudn\'t DM Target!').setDescription('Coudn\'t DM Target! the message. highly Due to Target DM is Closed!').addField('Error', e)));
        target.ban({ reason: reason });
        message.channel.send(BanEmbed);
    }
}