// const curVer = fs.readFileSync("curVer.json");
// console.log(curVer);

// async function getVer() {
//     let response = await axios.get("http://setup.roblox.com/version")
//     let ver = response.data;
//     return ver;
// }
// const mainJs = require('curVer.json');
// var version1 = mainJs.version
// setInterval(async function() {
//     let verValue = await getVer();
//     if (curVer.version != verValue) {
//         fs.readFile("./curVer.json", 'utf8', function (err,data) {
//   if (err) {
//     return console.log(err);
//   }
//   var result = data.replace(version1, `${verValue}`);

//   fs.writeFile("./curVer.json", result, 'utf8', function (err) {
//      if (err) return console.log(err);
//   });
// });
//         const embed = {
//             "title": "Roblox Update",
//             "description": `Roblox Has Updated!\nWait For Your Executor To Update! :slight_smile:\n\`\`\`[+] ${verValue}\`\`\``,
//             "url": "https://roblox.com/home",
//             "color": 13181474,
//             "footer": {
//                 "icon_url": "https://i.imgur.com/RWUUXA2.png",
//                 "text": "Please do not make tickets about this!"
//             },
//             "author": {
//                 "name": "Roblox Update Notifier"
//             }
//         };
//         client.channels.cache.get('837392652722110505').send("lol", { embed });
//     }
// }, 300000);
