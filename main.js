const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client({ partials: ['REACTION', 'MESSAGE', 'USER'] });
const fs = require('fs');
const { prefix, Channel: {StaffCommands, botCommands} } = require('./config.json');
const keepAlive = require('./ser.js');
require('dotenv').config();
const { connect, mongo, model, Schema } = require('mongoose');
const GetVer3 = require('./GetVer3');

//SCHEMA
client.TicketTranscript = model('transcript', 
    new Schema({
        Channel: String,
        Content: Array,
        User: String
    })
)
client.RobloxVersion = model('roblox',
    new Schema({
        ID: Number,
        CurrentVersion: String,
        OldVersion: String
    })
)

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);

});
client.on('ready', () => {
    console.log(`${client.user.username} is Ready! ✅`)

    connect(process.env['mongo'], {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    }).then(console.log('Connect to Mongo Database! ✅'));


});
client.on('message', async message => {
    try {
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
    } catch (err) {
        if (err) return message.channel.send(new Discord.MessageEmbed().setDescription(`\`${message.content}\` is not a valid Command! Please use **${prefix}help** to see all the commands!`).setColor('RED')).then(m => m.delete({ timeout: 1000*10 }))
    }
})

client.on('message', async message => {
    if (message.channel.parentID !== '837728403876610078') return;
    client.TicketTranscript.findOne({ Channel: message.channel.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            data.Content.push(`${message.author.tag}: ${message.content}`)
        } else {
            data = new client.TicketTranscript({ Channel: message.channel.id, Content:`${message.author.tag}: ${message.content}`, User: message.author.id })
        }
        await data.save()
            .catch(err => console.log(err))
    })
})

GetVer3(client);
keepAlive();
client.login(process.env['token']);