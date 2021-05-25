const { MessageEmbed, Client,Message } = require('discord.js')

module.exports = {
    name: 'script',
    description: 'Sends the user the script!',
    category: 'Info',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async(client,message,args) => {
        const embed = new MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL({dynamic: true}))
        .setDescription('```lua\n'+ "print('get a life')" + '```')
        .setColor('RANDOM')

        message.channel.send(embed)
    }
}