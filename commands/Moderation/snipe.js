const { Message, Client, MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const moment = require('moment');
const EmbedColors = require('../../Modules/EmbedColors');

module.exports = {
    name: 'snipes',
    description: 'Snipes Last Deleted Message!',
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
        const snipes = client.snipes.get(message.channel.id);
        if(!snipes) return message.channel.send(new MessageEmbed().setColor(EmbedColors.OG_BLURPLE).setDescription('There is no message deleted in this Channel!'));

        const snipe = +args[0] - 1 || 0;
        const target = snipes[snipe];
        if (!target) return message.channel.send(new MessageEmbed().setColor(EmbedColors.OG_BLURPLE).setDescription(`There is only ${snipes.length} Messages!`));

        const { msg, time, image } = target;
        message.channel.send(
            new MessageEmbed()
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
            .setColor(EmbedColors.BLURPLE)    
            .setImage(image)
            .setDescription(msg.content)
            .setFooter(`${moment(time).fromNow()} | ${snipe + 1}/${snipes.length}`)
        )

    }
}