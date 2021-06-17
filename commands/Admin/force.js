const { Message, Client, MessageEmbed } = require('discord.js');
const colors = require('../../Modules/EmbedColors');
const Type = [
    "shutdown",
    "restart"
]

module.exports = {
    name: 'force',
    description: 'Force shit.',
    category: 'Admin',
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
        var i = 0;
        const TypeMapped = Type.map((m) => `${i++}). ${m}\n`)
        if(!args[0]) return message.channel.send(new MessageEmbed()
        .setColor(colors.EMBED_BACKGROUND)
        .setDescription(TypeMapped)
        )

        switch(args[0].toLowerCase()) {
            case "shutdown":
                process.exit(1)
            break;
            case "restart":
                let msg = await message.channel.send(new MessageEmbed().setColor(colors.BLURPLE).setDescription(`${client.user.username} Restarting...`))
                client.destroy()
                client.login(process.env['token'])
            break;
        }
    }
}