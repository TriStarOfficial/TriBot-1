const { Message, Client, MessageEmbed } = require('discord.js');
const EmbedColors = require('../../Modules/EmbedColors');

module.exports = {
    name: 'bruh',
    description: 'Sends a changelog Message',
    category: 'Admin',
    StaffCommand: false,
    BotCommand: false,
    Developer: true,
    ModOnly: true,
    nsfw: false,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    execute: async (client, message, args, text, prefix, command) => {
        function Logs(title, version, changelog, mention) {
            const embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .addField('Changelog Title', title)
            .addField('Changelog Description', changelog)
            .addField('Version', version)
            .addField('Mention', mention)
            .setColor('BLURPLE')
            .setFooter(`Message Sent at:\n${message.createdAt}`)
        
            client.channels.cache.get("855998451794968586").send(embed)
        };
        var Ping;
        let msg = await message.channel.send(new MessageEmbed().setColor(EmbedColors.BLURPLE).setDescription('Creating Changelog...'))
        const PingOrNo = text.split(",")[0]
        if (!PingOrNo) return msg.edit({embed: new MessageEmbed().setColor('RED').setDescription('Missing Mention.').addField('Example', 'trur/false, Title, Version, Chnagelog\n`,` is use split into next argument!')});
        if (PingOrNo === "true") {
            Ping = true
        } else if (PingOrNo === "false") {
            Ping = false
        }
        if (PingOrNo !== "true" || "false") Ping = false
        const title = text.split(",")[1]
        if (!title) return msg.edit({embed: new MessageEmbed().setColor('RED').setDescription('Missing Title').addField('Example', 'Title, Version, Changelog\n`,` is use to split into next argument!')})
        const version = text.split(",")[2]
        if (!version) return msg.edit({embed: new MessageEmbed().setColor('RED').setDescription('Missing Version').addField('Example', 'Title, Version, Changelog\n`,` is use to split into next argument!')})
        const description = text.split(",")[3]
        if (!description) return msg.edit({embed: new MessageEmbed().setColor('RED').setDescription('Missing Changelog').addField('Example', 'Title, Version, Changelog\n`,` is use to split into next argument!')})
        
        let embed = new MessageEmbed()
        .setColor(EmbedColors.BLURPLE)
        .setTitle(title)
        .setFooter(`Version: ${version}`)
        .setDescription(description)
        if (Ping) {
            let ChangelogMsg = await message.channel.send('<@835277932783206441>',embed)
            msg.edit({
                embed: new MessageEmbed()
                .setColor(EmbedColors.EMBED_BACKGROUND)
                .setDescription(`Changelog has been created! [Go to Message](${ChangelogMsg.url})`)
            })
            Logs(title, version, description, Ping)
            if (message.deletable) return message.delete()
        } else {
            let ChangelogMsg = await message.channel.send(embed)
            msg.edit({
                embed: new MessageEmbed()
                .setColor(EmbedColors.EMBED_BACKGROUND)
                .setDescription(`Changelog has been created! [Go to Message](${ChangelogMsg.url})`)
            })
            Logs(title, version, description, Ping)
            if (message.deletable) return message.delete()
        }

    }
}