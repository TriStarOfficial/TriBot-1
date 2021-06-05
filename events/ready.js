const { Client } = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();

const activitylist = [
    "Cloud Development Die",
    "TriStar Hub"
]

/**
 * 
 * @param {Client} client 
 */

module.exports.run = (client) => {
    console.log(`${client.user.username} is Ready! | ✅`);

    mongoose.connect(process.env['mongo'], {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    }).then(console.log(`Connect to Mongo Database! | ✅`)).catch(err => console.log(`Connecting to Database Error! | ❎\n${err}`));
    
    setInterval(() => {
        const status = activitylist[Math.floor(Math.random() * activitylist.length)]
        client.user.setActivity(status, { type: 'WATCHING' })
    }, 2*1000)

}