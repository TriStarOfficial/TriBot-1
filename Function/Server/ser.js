const express = require('express');

const server = express();
server.all('/', (req, res)=>{
    res.send('Your bot is alive!')
})
server.all('/script', (req, res) => {
    res.send('Scripts')
})
function keepAlive(){
    server.listen(3000, ()=>{console.log("Server is Ready! ✅")});
}
module.exports = keepAlive;