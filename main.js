const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client({ partials: ['REACTION', 'MESSAGE', 'USER']});
const fs = require('fs');
const keepAlive = require('./Function/Server/ser.js');
require('dotenv').config();
const { connect, mongo, model, Schema } = require('mongoose');
const GetVer3 = require('./Function/Roblox/GetVer3');
require('discord-buttons')(client);
client.embed = require('./Function/Embeds/EmbedHandler')
client.snipes = new Map();
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
client.on('message', async message => {
    if (message.content.includes('streancommunuty.ru')) {
        message.delete()
        function DMMessage(id) {
            const Embed = new Discord.MessageEmbed()
            .setColor('BLURPLE')
            .setDescription(`You're not allowed to say that word! <:peperules:853618792583266304>`)

            client.users.cache.get(id).send(Embed).catch(err => {
                if (err) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('Unable to DM User!')).then(m => m.delete({ timeout: 1000*5 }))
            })
        }
        DMMessage(message.author.id)

        
        
        // function BanLogs(id) {
        //     const Embed = new Discord.MessageEmbed()
        //     .setColor('BLURPLE')
        //     .setTitle('Auto Ban!')
        //     .setDescription('Fake Steam Trade URL was Detected by TriBot!')
        //     .addField('User Info', `
        //     > Name & ID: ${message.author} | ${message.author.tag} | ${message.author.id}
        //     > Joined At: ${message.member.joinedAt}
        //     > Created At: ${message.author.createdAt}
        //     `)
        //     client.channels.cache.get(id).send(Embed)
        // }

        // BanLogs("846666365863067688")
    }
})
client.on('messageDelete', async(msg) => {
    client.snipes.set(msg.channel.id, {
        content: msg.content,
        author: msg.author,
        date: msg.createdAt
    })
})

GetVer3(client);
keepAlive();

client.login(process.env['token'])