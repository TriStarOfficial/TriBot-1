module.exports = {
    name: 'nl2',
    description: "this is a nl2 command!",
    execute(message, args){

        if(message.member.roles.cache.has('823783446715432960')){
            const embed = {
                "title": "Ninja Legends 2 Script Release",
                "description": "```--==Farming==--\nAuto Swing\nAuto Sell\nAuto Buy Sword\nAuto Buy Crystals\nAuto Buy Ranks\nAuto Buy Skills\nAuto Buy Powers\nCollect Collectibles\nAuto Kill\nAuto Collect Chest\nUnlock Islands\n\n--==Teleports==\nTeleports\n\n--==Orbs==--\nAll Orbs Toggle\n\n--==Misc==--\nWalkspeed\nJumppower\nName hide\nToggle Popups\n\nAnd others I don't Remember```",
                "url": "",
                "color": 10325960,
                "footer": {
                  "icon_url": "https://cdn.discordapp.com/attachments/834507119775973397/834508205869891604/images.jpeg.png",
                  "text": "Cloud Development"
                },
                "thumbnail": {
                  "url": "https://cdn.discordapp.com/attachments/834507119775973397/834508205869891604/images.jpeg.png"
                },
                "image": {
                  "url": ""
                },
                "author": {
                  "name": "Script Release",
                  "url": "",
                  "icon_url": "https://cdn.discordapp.com/attachments/834507119775973397/834508205869891604/images.jpeg.png"
                },
                "fields": [
                  {
                    "name": "Dev Notes:",
                    "value": "Some features are still in BETA, report any bugs in #🐞bug-reports. Give suggestion in #💡suggestions."
                  },
                  {
                    "name": "Executor Support:",
                    "value": "```[*] Synapse X\n\n[*] Sentinel\n\n[*] KRNL\n\n[*] Protosmasher\n\n[*] Sirhurt```"
                  },
                  {
                    "name": "Questions",
                    "value": "Questions -"
                  },
                  {
                    "name": "Can This Ban Me?",
                    "value": "Mostly NO!",
                    "inline": true
                  },
                  {
                    "name": "Free Executor?",
                    "value": "KRNL",
                    "inline": true
                  }
                ]
              };
const relchannel = message.guild.channels.cache.find(channel => channel.id === '830668840949121034')
             const logchannel = message.guild.channels.cache.find(channel => channel.id === '832546560096206898')
              relchannel.send("@everyone", { embed });
              logchannel.send(`<@&${823783446715432960}> NL2 GUI Released!!`);
    }   else {
        message.channel.send('You do not have permission to run this command');
    }
}
}