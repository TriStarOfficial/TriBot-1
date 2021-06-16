const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client({ partials: ['REACTION', 'MESSAGE', 'USER']});
const fs = require('fs');
const keepAlive = require('./Function/Server/ser.js');
require('dotenv').config();
const { connect, mongo, model, Schema } = require('mongoose');
const GetVer3 = require('./Function/Roblox/GetVer3');
const afkSchema = require('./schema/afkSchema.js');
require('discord-buttons')(client);
client.embed = require('./Function/Embeds/EmbedHandler')
client.snipes = new Map();
const EmbedColors = require('./Modules/EmbedColors')
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
});
client.on('message', async msg => {
    if (await afkSchema.findOne({ UserID: msg.author.id })) {
        let AfkProfile = await afkSchema.findOne({ UserID: msg.author.id });
        if (AfkProfile.MessagesLeft == 0) {
            await afkSchema.findOneAndDelete({ UserID: msg.author.id })
            msg.channel.send(new Discord.MessageEmbed()
            .setColor(EmbedColors.EMBED_BACKGROUND)
            .setDescription('AFK has been disabled!')
            ).then(m1 => m1.delete({ timeout: 5000 }))
        } else {
            await afkSchema.findOneAndUpdate({ UserID: msg.author.id }, { MessagesLeft: AfkProfile.MessagesLeft - 1 });
            msg.channel.send(new Discord.MessageEmbed()
            .setColor(EmbedColors.EMBED_BACKGROUND)
            .setDescription(`You are able to send \`${AfkProfile.MessagesLeft}\` Messages Left, Until AFK Mode is Disabled! `)
            ).then(m => m.delete({ timeout: 5000 }))
        }
    }

    if (msg.mentions.members.first()) {
        await msg.mentions.members.forEach(async member => {
            let AfkProfile = await afkSchema.findOne({ UserID: member.user.id });
            if (AfkProfile) msg.channel.send(new Discord.MessageEmbed()
            .setColor(EmbedColors.EMBED_BACKGROUND)
            .setDescription(`${member.user.tag} is Currently in AFK Mode!`)
            .addField('Reason: ', AfkProfile.Reason)
            ).then(m3 => m3.delete({ timeout: 5000 }))
        })
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