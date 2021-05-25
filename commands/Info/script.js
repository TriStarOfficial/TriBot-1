const { MessageEmbed, Client,Message } = require('discord.js')
const { Channel: { botCommands } } = require('../../config.json')

module.exports = {
    name: 'script',
    description: 'Sends the user the script!',
    category: 'Info',
    StaffCommand: false,
    BotCommand: true,
    Developer: false,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async(client,message,args) => {
        const embed = new MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL({dynamic: true}))
        .setDescription('```lua\n'+ "loadstring(game:HttpGet('https://raw.githubusercontent.com/TriStarOfficial/TriStarScripts/main/TriStar.lua'))()" + '```')
        .setColor('RANDOM')

        message.author.send(embed)
    }
}