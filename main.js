const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client({ partials: ['REACTION', 'MESSAGE', 'USER']});
const fs = require('fs');
const keepAlive = require('./Function/Server/ser.js');
require('dotenv').config();
const { connect, mongo, model, Schema } = require('mongoose');
const GetVer3 = require('./Function/Roblox/GetVer3');
require('discord-buttons')(client);
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
["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);

});
client.on('message', async message => {
    if (message.channel.parentID !== '837728403876610078') return;
    client.TicketTranscript.findOne({ Channel: message.channel.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            data.Content.push(`${message.author.tag}: ${message.content}`)
        } else {
            data = new client.TicketTranscript({ Channel: message.channel.id, Content:`${message.author.tag}`, User: message.channel.topic})
        }
        await data.save().catch(err => console.log(err))
    })
})
GetVer3(client);
keepAlive();
client.login(process.env['token']);