const { Message, Client, MessageEmbed } = require('discord.js');
const embedcolors = require('../../Modules/EmbedColors');

module.exports = {
    name: 'banned-user',
    description: 'Get\'s all the banned User!',
    category: 'Info',
    aliases: ["banned-list"],
    StaffCommand: false,
    BotCommand: false,
    Developer: false,
    ModOnly: true,
    nsfw: false,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    execute: async (client, message, args, text, prefix, command) => {
        var i = 0;
        const FetchBannedUser = await message.guild.fetchBans();
        const BannedMap = FetchBannedUser.map((user) => `${i++}). **${user.user.tag} | ${user.user.id} | Reason: ${user.reason}**\n`);

        if (BannedMap > 2048) BannedMap.splice(0, 2047);

        let Embed = new MessageEmbed()
        .setColor(embedcolors.BLURPLE)
        .setDescription(BannedMap)
        message.channel.send(Embed)
    }
}