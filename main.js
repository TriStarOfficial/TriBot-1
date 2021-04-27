const Discord = require('discord.js');
const client = new Discord.Client();
 
const prefix = '-';
const fs = require('fs');
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}
 
 
client.once('ready', () => {
    console.log('TriBot is online!')
    client.user.setStatus('online');
});

// Created by Ferris on v3rmillion <3

// Settings
var settings = {
    webhook_url: "https://discord.com/api/webhooks/832309047688298567/VIbM2osljXfUkdqzXDHiRW_q6yqblnGOf-x77DuzkhRJmAQ2VJ36MMUmTUSDPc87Migv", // The webhook URL
    message: {
        username: "RobloxUpdateNotifier", // The webhook username
        avatar: "", // The webhook profile picture
        content: "A new Roblox verision is out!", // The message content
        is_embed: true, // Is the message an embed
        embeds: []
    }
 };
 
 // The code, thoroughly commented for vermie users.
 var version = ""; // A variable used to store the current version (for comparing)
 
 var request = new XMLHttpRequest(); // Initialize a new XML Http Request
 request.addEventListener("load", compareVersions); // Hook the callback function
 request.open("GET", "http://setup.roblox.com/version"); // Open the stream as a GET request to the API
 request.send(); // Send the request.
 
 function compareVersions() { // The callback function
    if (this.responseText != version) { // Compare the stored version to the one recieved by the Request
        // The response from the request differs from our stored version!
        var hook = new XMLHttpRequest(); // Initialize a new XML Http Request
        hook.open("POST", settings.webhook_url); // Open the stream as a POST request to the webhook URL
        hook.setRequestHeader("Content-Type", "application/json"); // Set the content type to application/json
 
        var hookData; // Intialize a new variable in-scope of the send function
 
        if (settings.message.is_embed) {
            // Build data with embed
            hookData = {
                username: settings.message.username,
                avatar_url: settings.message.avatar,
                embeds: settings.message.embeds
            };
            // If contnet is not empty, add content to hookData
            if (settings.message.content != "") hookData.content = settings.message.content;
        } else {
            // Build data without embed
            hookData = {
                username: settings.message.username,
                avatar_url: settings.message.avatar,
                content: settings.message.content
            };
        }
 
        hook.send(JSON.stringify(hookData)); // Send the request.
    }
 }
 
//COmmands Variable
client.on('message', message =>{
    message.member.roles.cache.has
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
 
    //Commands
    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    } else if(command == 'madrelease'){
        client.commands.get('arsenal').execute(message, args);
    }   else if(command == 'nl2release'){
        client.commands.get('nl2').execute(message, args);
    } 
});
 
client.login('ODM2NDk5NDcwNzk4NTUzMTQ5.YIe41w.sXFAx0e8KhSvrX52Cd-2lnd5WR0');