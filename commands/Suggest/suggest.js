const {
    Message,
    Client,
    MessageEmbed,
    MessageCollector,
} = require('discord.js');
const {
    MessageButton
} = require('discord-buttons');


module.exports = {
    name: 'suggest',
    description: 'Suggest a Game/Feature',
    category: 'Suggest',
    usage: '-suggest [Info], [GameId]',
    example: '-suggest Gun Mods, 286090429',
    StaffCommand: false,
    BotCommand: true,
    Developer: false,
    ModOnly: false,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args
     */
    execute: async (client, message, args, text, prefix, command) => {
        const SuggestionInfo = text.split(',')[0]
        if (!SuggestionInfo) return client.embed.error('Missing Argument', 'Missing Suggestion Info', message, [{name: 'Usage', value: command.usage}, { name: 'Example', value: command.example }])
        const SuggestionID = text.split(',')[1].replace(" ", '')
        if (!SuggestionID) return client.embed.error('Missing Argument', 'Missing Game ID!', message, [{name: 'Usage', value: command.usage}, { name: 'Example', value: command.example }])
        if (isNaN(SuggestionID)) return client.embed.error('Wrong Usage | Game ID', "Game id must be a number!", message)
        const game = `https://roblox.com/games/${SuggestionID}`

        const embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
        .setTitle('Suggest By ' + message.author.tag)
        .setDescription(SuggestionInfo)
        .addField('Game', game)
        .addField('Status: (Decision Pending)', "Currently not Decided!")
        .setColor('ORANGE')
        client.channels.cache.get('837033902824226917').send(embed).then(m => {
            m.react('⬆')
            m.react('⬇')
        })

    }
}