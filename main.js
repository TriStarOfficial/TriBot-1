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