const { Message, Client, MessageEmbed } = require('discord.js');
const EmbedColors = require('../../Modules/EmbedColors');

module.exports = {
    name: 'bruh',
    description: '',
    category: '',
    StaffCommand: false,
    BotCommand: false,
    Developer: false,
    Hidden: true,
    ModOnly: true,
    nsfw: false,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    execute: async (client, message, args, text, prefix, command) => {
        let msg = await message.channel.send(new MessageEmbed().setColor(EmbedColors.BLURPLE).setDescription('Creating Changelog...'))
        const title = text.split(",")[0]
        if (!title) return msg.edit({embed: new MessageEmbed().setColor('RED').setDescription('Missing Title').addField('Example', 'Title, Version, Changelog\n`,` is use to split into next argument!')})
        const version = text.split(",")[1]
        if (!version) return msg.edit({embed: new MessageEmbed().setColor('RED').setDescription('Missing Version').addField('Example', 'Title, Version, Changelog\n`,` is use to split into next argument!')})
        const description = text.split(",")[2]
        if (!description) return msg.edit({embed: new MessageEmbed().setColor('RED').setDescription('Missing Changelog').addField('Example', 'Title, Version, Changelog\n`,` is use to split into next argument!')})
        
        let embed = new MessageEmbed()
        .setColor(EmbedColors.BLURPLE)
        .setTitle(title)
        .setFooter(`Version: ${version}`)
        .setDescription(description)
        let ChangelogMsg = await message.channel.send(embed)
        msg.edit({
            embed: new MessageEmbed()
            .setColor(EmbedColors.EMBED_BACKGROUND)
            .setDescription(`Changelog has been created! [Go to Message](${ChangelogMsg.url})`)
        })
        if (message.deletable) return message.delete()
    }
}