const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client();
const prefix = '-';
const fs = require('fs');

client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}

const curVer = fs.readFileSync("curVer.json");
console.log(curVer)

async function  getVer() {
    let response = await axios.get("http://setup.roblox.com/version")
    let ver = response.data
    return ver;
}

setInterval(async function() {

    let verValue = await getVer();
    if (curVer.version != verValue) {
        curVer.version = verValue
        const relchannel = client.guilds.cache.find(channel => channel.id === '836620017944231997')
        const embed = {
            "title": "Roblox Update",
            "description": "Roblox Has Updated! \nWait For Your Executor To Update! :slight_smile:```\n[+]" `${verValue}```,
            "url": "https://roblox.com/home",
            "color": 13181474,
            "footer": {
              "icon_url": "https://i.imgur.com/RWUUXA2.png",
              "text": "Please do not make tickets about this!"
            },
            "author": {
              "name": "Roblox Update Notifier"
            }
          };
          relchannel.send("@everyone", { embed });
        }
}, 300 * 1000); // 300 * 1000 milsec 



client.on('ready', () => {
    console.log('TriBot is online!')
    client.user.setStatus('online');
});
 
//COmmands Variable
client.on('message', message =>{
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
 
client.login('ODM2NDk5NDcwNzk4NTUzMTQ5.YIe41w.sXFAx0e8KhSvrX52Cd-2lnd5WR0')