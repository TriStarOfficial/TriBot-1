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
    console.log('ZayBot is online!')
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
    } else if(command == 'arsrelease'){
        client.commands.get('arsenal').execute(message, args);
    }   else if(command == 'shutdown'){
        if(message.member.roles.cache.has('823777643551129611')){
            const logchannel = message.guild.channels.cache.find(channel => channel.id === '832546560096206898');
            logchannel.send(`<@${'710904756138147882'}> Shutting Down...`);
            client.destroy()
            
    }   else {
        message.channel.send('You do not have permission to run this command');
    }
    }
});
 
client.login('ODMyNTE5MDU2ODUzOTU4NzE2.YHk9yg.WPw1P7RBg9TjEPS7pZE-bn5Z6XM');