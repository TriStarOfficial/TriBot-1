module.exports = {
    name: 'arsenal',
    description: "this is a arsenal command!",
    execute(message, args){

        if(message.member.roles.cache.has('823783446715432960')){
            const embed = {
              "title": "Arsenal Script",
              "description": "Features:```\n[*] Player\n    [+] Walspeed Mod\n    [+] Jumppower Mod\n\n[*] Aim Stuff\n    [+] Aimbot\n    [+] Silent Aim\n\n[*] Visuals\n    [+] Line ESP\n    [+] Box ESP(With Healthbars)\n    [+] Skeleton ESP\n\n[*] Gun Mods\n    [+] Infinite Ammo\n    [+] Force Aumtomatic(Works On Most Guns)\n    [+] Rapid Fire\n    [+] No spread\n    [+] No Recoil\n\n[*] Misc\n    [+] Kill All\n    [+] WallBang\n\n[*] Other Things I Forgot```",
              "url": "",
              "color": 16758784,
              "timestamp": "2021-04-18T12:00:00.000Z",
              "footer": {
                "icon_url": "https://i.imgur.com/3NeyLhO.png",
                "text": "ZayHub"
              },
              "thumbnail": {
                "url": "https://i.imgur.com/3NeyLhO.png"
              },
              "image": {
                "url": ""
              },
              "author": {
                "name": "Script Release",
                "url": "",
                "icon_url": "https://i.imgur.com/3NeyLhO.png"
              },
              "fields": [
                {
                  "name": "Dev Notes:",
                  "value": "Some features are still in BETA, report any bugs in #🐞bug-reports. Give suggestion in #💡suggestions."
                },
                {
                  "name": "Executor Support:",
                  "value": "```[*] Synapse X\n\n[*] Sentinel\n\n[*] KRNL\n\n[*] Protosmasher\n\n[*] Sirhurt\n\n[*] Shadow Cheat(Beta)\n\n[*] Viva(Beta)\n\n[*] Coco Z(Beta)```"
                }
              ]
};           
const relchannel = message.guild.channels.cache.find(channel => channel.id === '830668840949121034')
             const logchannel = message.guild.channels.cache.find(channel => channel.id === '832546560096206898')
              relchannel.send("@everyone", { embed });
              logchannel.send(`<@&{823783446715432960}> Arsenal GUI Released!!`);
    }   else {
        message.channel.send('You do not have permission to run this command');
    }
}
}