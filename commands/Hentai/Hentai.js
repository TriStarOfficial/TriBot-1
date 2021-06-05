const { Message, Client, MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const CurrentArgs = [
    "game",
]

module.exports = {
    name: 'hentai',
    description: 'For kanye cause he\'s Ass',
    category: 'Hentai',
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
    execute: async (client, message, args, text, prefix, command) => {
        var count;
        const ErrorEmbed = new MessageEmbed()
        ErrorEmbed.setTitle('Missing Argument')
        for (count = 0; count < CurrentArgs.length; count++) {
            ErrorEmbed.addField(CurrentArgs[count], "nil", true)
        }
        ErrorEmbed.setColor('RED')
        if (!args.slice(0).join(" ")) return message.channel.send(ErrorEmbed) 
        switch (args.slice(0).join(" ").toLowerCase()) {
            case "game":
                message.channel.send('<@722647978577363026> Send more game white nigba!')
            break;
        }
    }
}