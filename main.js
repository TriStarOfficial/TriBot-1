const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client();
const prefix = '-';
const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

const curVer = fs.readFileSync("curVer.json");
console.log(curVer);

async function getVer() {
    let response = await axios.get("http://setup.roblox.com/version")
    let ver = response.data;
    return ver;
}
const mainJs = require('curVer.json');
var version1 = mainJs.version
setInterval(async function() {
    let verValue = await getVer();
    if (curVer.version != verValue) {
        fs.readFile("./curVer.json", 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(version1, `${verValue}`);

  fs.writeFile("./curVer.json", result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});
        const embed = {
            "title": "Roblox Update",
            "description": `Roblox Has Updated!\nWait For Your Executor To Update! :slight_smile:\n\`\`\`[+] ${verValue}\`\`\``,
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
        client.channels.cache.get('837392652722110505').send("lol", { embed });
    }
}, 300000);



client.on('ready', () => {
    console.log('TriBot is online!');
    client.user.setStatus('online');
});

//COmmands Variable
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    //Commands
    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if (command == 'madrelease') {
        client.commands.get('arsenal').execute(message, args);
    } else if (command == 'nl2release') {
        client.commands.get('nl2').execute(message, args);
    }
});

client.login('ODM2NDk5NDcwNzk4NTUzMTQ5.YIe41w.sXFAx0e8KhSvrX52Cd-2lnd5WR0');
