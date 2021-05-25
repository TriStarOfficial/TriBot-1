const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client();
const fs = require('fs');
const { prefix, token, Channel: {StaffCommands, botCommands} } = require('./config.json')
const keepAlive = require('./ser.js')

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
client.on('ready', () => {
    console.log(`${client.user.username} is Ready! ✅`)
});
client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if (command.StaffCommand && message.channel.id !== StaffCommands) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`You Idiot use this command in <#${StaffCommands}>`))
    if (command.BotCommand && message.channel.id !== botCommands) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`Bruh use this command in <#${botCommands}>`))
    if (command.Developer && !message.member.roles.cache.has('842707123371638825')) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`Missing Required Role <@&842707123371638825>`))
    if (command) command.execute(client, message, args, prefix)
})

keepAlive();
client.login(process.env['token']);