const {
    Message,
    Client,
    MessageEmbed
} = require('discord.js');
const EmbedColors = require('../../Modules/EmbedColors');
const afkSchema = require('../../schema/afkSchema');

module.exports = {
    name: 'afk',
    description: 'Set\'s user into afk Mode.',
    category: '',
    StaffCommand: false,
    BotCommand: false,
    Developer: false,
    ModOnly: false,
    nsfw: false,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    execute: async (client, message, args, text, prefix, command) => {
        let reason = args.join(" ");
        if (!reason) reason = "No Reason Given"
        let UserAFK = await afkSchema.findOne({
            UserID: message.author.id
        });
        if (!UserAFK) {
            UserAFK = await new afkSchema({
                UserID: message.author.id,
                Reason: reason,
                Time: message.createdAt
            });
            await UserAFK.save()
            message.channel.send(new MessageEmbed()
            .setColor(EmbedColors.EMBED_BACKGROUND)
            .setDescription('You have been set to AFK Mode!')
            .addField('Reason', reason)
            )
        } else return message.channel.send(new MessageEmbed().setColor(EmbedColors.BLURPLE).setDescription('You are already AFK'))
    }
}