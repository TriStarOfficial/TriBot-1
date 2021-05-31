const express = require('express');
const path = require('path')

const server = express();
server.all('/', (req, res)=>{
    res.send('Your bot is alive!')
})
server.all('/script', (req, res) => {
    res.sendFile(path.join(__dirname), './Web/script.html')
})
function keepAlive(){
    server.listen(3000, ()=>{console.log("Server is Ready! ✅")});
}
module.exports = keepAlive;