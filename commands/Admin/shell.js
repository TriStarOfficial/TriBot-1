const { Message, Client, MessageEmbed } = require('discord.js');
const process = require('child_process');
const EmbedColors = require('../../Modules/EmbedColors');
const { RED, GREEN } = require('../../Modules/EmbedColors');

module.exports = {
    name: 'shell',
    description: 'Runs Command Prompt in Discord',
    category: 'Admin',
    aliases: ['console', 'terminal','bash'],
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
        if (!args.slice(0).join(" ")) return;
        let msg = await message.channel.send(new MessageEmbed().setColor(EmbedColors.ORANGE).setDescription(`Executing... \`${args.slice(0).join(" ")}\``));
        process.exec(args.slice(0).join(" "), (error, stdout) => {
            if (error) return msg.edit({
                embed: new MessageEmbed().setColor(RED).setDescription(`There was an error Executing \`${args.slice(0).join(" ")}\``).addField('Error:', '```bash\n' + error + '\n```')
            });
            
            msg.edit({
                embed: new MessageEmbed().setColor(GREEN).setDescription(`Successfully Executed ${args.slice(0).join(" ")}`).addField('Response:', '```bash\n' + stdout + '\n```')
            })
        })
    }
}