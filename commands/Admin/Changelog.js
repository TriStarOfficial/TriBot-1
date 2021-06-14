const {
    Message,
    Client,
    MessageEmbed,
    MessageCollector
} = require('discord.js');
const EmbedColor = require('../../Modules/EmbedColors')

module.exports = {
    name: 'changelog',
    description: '',
    category: '',
    StaffCommand: false,
    BotCommand: false,
    Developer: true,
    ModOnly: false,
    nsfw: false,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    execute: async (client, message, args, text, prefix, command) => {
        let Embed = new MessageEmbed().setColor(EmbedColor.OG_BLURPLE);
        const title = message.channel.send(new MessageEmbed().setColor(EmbedColor.BLURPLE).setDescription('Set Title/Game')).then(msg_2 => {
            const titl = message.channel.createMessageCollector(t => t.author.id === message.author.id, {
                max: 1
            }).on('collect', titl => {
                msg_2.delete()
                const Ver = message.channel.send(new MessageEmbed().setColor(EmbedColor.BLURPLE).setDescription('Set Version')).then(desc_1 => {
                    const Ver_1 = message.channel.createMessageCollector(v => v.author.id === message.author.id, {
                        max: 1
                    }).on('collect', Ver_2 => {
                        desc_1.delete()
                        const Change = message.channel.send(new MessageEmbed().setColor(EmbedColor.BLURPLE).setDescription('Set Changelog Message')).then(change_1 => {
                            const ChangeCollect = message.channel.createMessageCollector(c => c.author.id === message.author.id, {
                                max: 1
                            }).on('collect', Chan => {
                                change_1.delete()
                                Embed.setTitle(titl)
                                Embed.setFooter(`Version: ${Ver_2}`)
                                Embed.setDescription(Chan)
                                client.channels.cache.get('835543050075111475').send('<@&837081915282292776>', Embed)
                            })
                        })
                    })
                })
            })
        })

    }
}