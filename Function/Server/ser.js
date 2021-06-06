const express = require('express');
const path = require('path')

const server = express();
server.all('/', (req, res)=>{
    res.sendFile(path.join(__dirname, "html/card.html"))
})
server.all('/discord', (req, res) => {
    res.redirect('https://discord.gg/MkBuu8Xpk3')
})
function keepAlive(){
    server.listen(3000, ()=>{console.log("Server is Ready! | ✅")});
}
module.exports = keepAlive;