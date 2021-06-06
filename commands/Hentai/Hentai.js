const {
    Message,
    Client,
    MessageEmbed
} = require('discord.js');
const {
    MessageButton
} = require('discord-buttons');
const {
    default: axios
} = require('axios');
const CurrentArgs = [
    "game",
]
const RandomInt = require('../../Modules/RandomInt')

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
        var Int = RandomInt(50)
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
                const rbxres = await axios.get('https://games.roblox.com/v1/games/list?model.maxRows=50', {
                    method: 'GET',
                    headers: {
                        'Accpet': 'application/json'
                    }
                }).then(res => res.data);
                const GameData = rbxres['games'][Int]

                const GameEmbed = new MessageEmbed()
                    .setTitle(GameData.name)
                    .setColor('BLURPLE')
                    .setDescription(GameData.gameDescription)
                    .addFields([{
                        name: 'Creator Data',
                        value: `Creator Name: ${GameData.creatorName}\nCreator ID: ${GameData.creatorId}`,
                        inline: true
                    }])
                    .setURL(`https://roblox.com/games/${GameData.placeId}`)
                    .setFooter('Auto Generated Via Roblox API!')
                message.channel.send('<@722647978577363026> send more game white nigga', { embed: GameEmbed })
            break;

            
        }
    }
}