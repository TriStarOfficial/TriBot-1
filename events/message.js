const { prefix, Channel: { StaffCommands, botCommands } } = require('../config.json');
const Discord = require('discord.js');

module.exports.run  = async(client,message) => {
    try {
        if (message.author.bot) return;
    
        if (!message.content.startsWith(prefix)) return;

        if (!message.guild) return;

        if(!message.member) message.member = await message.guild.fetchMember(message);

        const args = message.content.slice(prefix.length).trim().split(/ +/g);

        const cmd = args.shift().toLowerCase();

        const text = args.join(" ")

        if (cmd.length == 0) return;

        let command = client.commands.get(cmd)

        if(!command) command = client.commands.get(client.aliases.get(cmd));

        if (command.StaffCommand && message.channel.id !== StaffCommands) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`You Idiot use this command in <#${StaffCommands}>`))

        if (command.BotCommand && message.channel.id !== botCommands) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`Bruh use this command in <#${botCommands}>`))
        
        if (command.Developer && !message.member.roles.cache.has('842707123371638825')) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`Missing Required Role <@&842707123371638825>`))

        if (command.ModOnly && !message.member.roles.cache.has('835456151184736296' || '842127079574732820')) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('Missing Required Roles!'))

        if (command) command.execute(client, message, args, text, prefix, command)
    } catch (err) {
        if (err) return message.channel.send(new Discord.MessageEmbed().setDescription(`\`${message.content}\` is not a valid Command! Please use **${prefix}help** to see all the commands!`).setColor('RED')).then(m => m.delete({ timeout: 1000*10 }))
    }
}