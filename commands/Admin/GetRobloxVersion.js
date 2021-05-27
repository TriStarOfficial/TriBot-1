const axios = require('axios');
const { Message, Client,MessageEmbed } = require('discord.js');
const { version } = require('../../curVer.json');
const fs = require('fs')

module.exports = {
    name: 'rbx-version',
    description: null,
    category: 'Admin',
    StaffCommand: false,
    BotCommand: false,
    Developer: true,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async(client,message,args) => {
        const WebsiteVersion = axios.default.get('http://setup.roblox.com/version');

        const CurrentEmbed = new MessageEmbed()
        .setTitle('Current Roblox Version')
        .addField('Current Version in JSON.', version)
        .addField('Current Version in Application.', WebsiteVersion)

        message.channel.send(CurrentEmbed)
    }
}
