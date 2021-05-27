const axios = require('axios')
const { OldVersion,CurrentVersion } = require('./curVer.json');
const fs = require('fs');
const { MessageEmbed } = require('discord.js');

module.exports = (client) => {
    async function GetAppVersion() {
        let res = await axios.get("http://setup.roblox.com/version")
        let ver = res.data;
        return ver;
    }

    setInterval(async () => {
        const Ver = await GetAppVersion();
        if (OldVersion !== Ver) {
            fs.readFileSync('./curVer.json', 'utf8', async function(err,data) {
                if (err) return console.log(err);
                if (data) {
                    var res = data.replace(OldVersion, CurrentVersion).replace(CurrentVersion, Ver);
                    var ResStringed = JSON.stringify(res)
                }
                await fs.writeFileSync('./curVersion.json', ResStringed, 'utf8', function(err) {
                    return console.error(err) 
                });
            });
            const Embed = new MessageEmbed()
            .setTitle('Roblox Updated! /Test')
            .setDescription('Roblox has Updated! Please wait for your executor be Updated to the latest Version!')
            .addField('Old Version', `\`\`\`[x] ${OldVersion}\`\`\``)
            .addField('Current Version', `\`\`\`[x] ${Ver}\`\`\``)
            .setFooter('Pronhub.com', 'https://i.imgur.com/RWUUXA2.png')
            .setAuthor('Update','https://i.imgur.com/RWUUXA2.png')

            client.channels.cache.get('837392652722110505').send(Embed)
        }
    }, 5000);
}