const { Message, Client, MessageEmbed } = require('discord.js');
const { exec } = require('child_process');

module.exports = {
    name: 'update-bot',
    description: 'Update the bots and reload Everything!',
    category: 'Git',
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
        let msg = await message.channel.send(new MessageEmbed().setColor('BLURPLE').setDescription('Pulling Everying File that has been updated on Github...').setTitle('Updating Bot...'));
        exec('git pull', (error, stdout, stderr) => {
            if (error) {
                msg.edit({
                    embed: new MessageEmbed().setColor('RED').setTitle(`Error While Updating ${client.user.username}`).setDescription(`\`\`\`cmd\n${error}\n\`\`\``)
                })
                return;
            }
            msg.edit({
                embed: new MessageEmbed().setColor('GREEN').setTitle(`Successfully Updated ${client.user.username}`).setDescription(`${client.user.username} will Be Restarted!`)
            })
        })

        client.destroy()
        client.login(process.env['token']).then(() => {
            msg.edit({
                embed: new MessageEmbed().setColor('BLURPLE').setDescription(`${client.user.username} has Successfully Restarted!`)
            })
        }).catch(err => {
            if (err) return msg.edit({
                embed: new MessageEmbed().setColor('RED').setDescription(`Error While Restarting ${client.user.username}.`)
            })
        })
    }
}