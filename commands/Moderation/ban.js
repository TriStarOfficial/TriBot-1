const {
    Message,
    Client,
    MessageEmbed,
    MessageCollector
} = require('discord.js');
const {
    MessageButton
} = require('discord-buttons');

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
        if (!target) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Please Mention a user or a user id!').addField('Usage: ', '```ini\n' + ' [x] -ban [mention | userid | Username - Required] (reason - Not Required)' + '\n```'));
        if (!target.bannable) return message.channel.send(new MessageEmbed().setTitle('User Not Banable!').setColor('RED').setDescription(`${target} is not banable. May due to user role is higher than ${client.user}.`))
        if (target.id === message.author.id) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Nigger you can\'t ban yourself. <:bruhlmao:843232413413015553>'))
        const reason = args.slice(1).join(" ") || "Unspecified";
        var d = new Date,
            dformat = [d.getMonth() + 1,
                d.getDate(),
                d.getFullYear()
            ].join('/') + ' ' + [d.getHours(),
                d.getMinutes(),
                d.getSeconds()
            ].join(':');

        //============================================\\
        const BanConfirm = new MessageEmbed()
            .setColor('BLURPLE')
            .setTitle('Ban Selection')
            .setDescription('Click on the button to ban the user!')
        const BanEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('Member Banned!')
            .addField('Member Banned: ', target)
            .addField('Banned By: ', message.author)
            .addField('Reason: ', reason)
            .addField('Banned At: ', dformat)
        const AuthorBannedEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('You\'re Banned From ' + message.guild.name)
            .addField('Reason: ', reason)
            .addField('Banned By: ', message.author)
            .addField('Appeal: ', 'nil')
        //============================================\\

        function BanLogs(id) {
            const Embed = new MessageEmbed()
            .setColor('BLURPLE')
            .setTitle('User Banned!')
            .addField('Banned By:', `
            > Name: ${message.author.tag} | ${message.author}
            > ID: ${message.author.id}
            > Highest Role: ${message.member.roles.highest}
            `)
            .addField('User Banned:', `
            > Name: ${target.user.tag} | ${target}
            > ID: ${target.user.id}
            > Highest Role: ${target.roles.highest}
            > Banned At: ${dformat}
            > Reason:\n${reason}
            `)

            client.channels.cache.get(id).send(Embed)
        }
        
        //=================== Button ==================\\
        const OneDayButton = new MessageButton()
            .setID('OneDayMessage')
            .setLabel('Delete last 24H Messages')
            .setStyle('red')
        const SevenDayButton = new MessageButton()
            .setID('SevenDayMessage')
            .setLabel('Delete last 7D Messages')
            .setStyle('red')
        const CustomDayButton = new MessageButton()
            .setID('CustomDay')
            .setLabel('Set Custom Day!')
            .setStyle('red')
        const NoMessageDelete = new MessageButton()
            .setID('NoMessageDelete')
            .setLabel('Don\'t Delete Any Messages')
            .setStyle('red')

        const BanConfirmMessage = await message.channel.send({
            embed: BanConfirm,
            buttons: [OneDayButton, SevenDayButton, CustomDayButton, NoMessageDelete]
        });
        //=================== Button ==================\\

        client.on('clickButton', async (button) => {
            await button.defer()
            if (button.clicker.user.id !== message.author.id) return;
            switch (button.id) {
                case "OneDayMessage":
                    target.send(AuthorBannedEmbed).catch(e => message.channel.send(new MessageEmbed().setColor('RED').setTitle('Coudn\'t DM Target!').setDescription('Coudn\'t DM Target! the message. highly Due to Target DM is Closed!').addField('Error', e)));
                    target.ban({
                        reason: reason,
                        days: 1
                    })
                    await BanConfirmMessage.edit({
                        component: null,
                        embed: BanEmbed
                    }).then(m => m.delete({ timeout: 1000*5 }))
                    BanLogs("846666365863067688")
                    break;
                case "SevenDayMessage":
                    target.send(AuthorBannedEmbed).catch(e => message.channel.send(new MessageEmbed().setColor('RED').setTitle('Coudn\'t DM Target!').setDescription('Coudn\'t DM Target! the message. highly Due to Target DM is Closed!').addField('Error', e)));
                    target.ban({
                        reason: reason,
                        days: 7
                    })
                    await BanConfirmMessage.edit({
                        component: null,
                        embed: BanEmbed
                    }).then(m => m.delete({ timeout: 1000*5 }))
                    BanLogs("846666365863067688")
                    break;
                case "CustomDay":
                    BanConfirmMessage.edit({
                        component: null,
                        embed: new MessageEmbed().setColor('BLURPLE').setDescription('Please type in a number! [⏲ 1 Minutes ]'),
                    })
                    const Filter = m => m.author.id === message.author.id
                    const Collector = new MessageCollector(message.channel, Filter, {
                        max: 1,
                        time: 1000 * 60
                    });

                    Collector.on('collect', m => {
                        return m
                    });

                    Collector.on('end', async collected => {
                        collected.forEach(async(value) => {
                            if (typeof value.content !== "number") value.content = 7
                            target.send(AuthorBannedEmbed).catch(e => message.channel.send(new MessageEmbed().setColor('RED').setTitle('Coudn\'t DM Target!').setDescription('Coudn\'t DM Target! the message. highly Due to Target DM is Closed!').addField('Error', e)));
                            target.ban({
                                reason: reason,
                                days: value.content
                            })
                            await BanConfirmMessage.edit({
                                component: null,
                                embed: BanEmbed
                            }).then(m => m.delete({ timeout: 1000*5 }))
                            BanLogs("846666365863067688")
                        })
                    })
                    break;
                case "NoMessageDelete":
                    target.send(AuthorBannedEmbed).catch(e => message.channel.send(new MessageEmbed().setColor('RED').setTitle('Coudn\'t DM Target!').setDescription('Coudn\'t DM Target! the message. highly Due to Target DM is Closed!').addField('Error', e)));
                    target.ban({
                        reason: reason,
                    })
                    await BanConfirmMessage.edit({
                        component: null,
                        embed: BanEmbed
                    }).then(m => m.delete({ timeout: 1000*5 }))
                    BanLogs("846666365863067688")
                break

            }
        })

    }
}