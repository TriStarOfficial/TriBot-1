const { Client } = require('discord.js');
const { connect, mongo, model, Schema } = require('mongoose');
require('dotenv').config();

const activitylist = [
    "Cloud Development Dying",
    "TriStar Hub"
]

/**
 * 
 * @param {Client} client 
 */

module.exports.run = (client) => {
    console.log(`${client.user.username} is Ready! ✅`);

    connect(process.env['mongo'], {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    }).then(console.log('Connect to Mongo Database! ✅'));

    
    setInterval(() => {
        const status = activitylist[Math.floor(Math.random() * activitylist.length)]
        client.user.setActivity(status, { type: 'WATCHING' })
    }, 2*1000)

}