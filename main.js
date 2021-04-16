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
    console.log('ZayBot is online!');
});
 
client.on('message', message =>{
    message.member.roles.cache.has
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
 
    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    } else if(command == 'arsrelease'){
        client.commands.get('arsenal').execute(message, args);
    }
});
 
client.login('ODMyNTE5MDU2ODUzOTU4NzE2.YHk9yg.WPw1P7RBg9TjEPS7pZE-bn5Z6XM');