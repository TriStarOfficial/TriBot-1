const express = require('express');
const path = require('path')

const server = express();

server.use('/public', express.static('public'))

server.all('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/card.html"))
})
server.all('/discord', (req, res) => {
    res.redirect('https://discord.gg/MkBuu8Xpk3')
})
server.all('/status', (req, res) => {
    res.redirect('https://stats.uptimerobot.com/x86NRiJ8Dn')
})


server.use(function (req, res) {
    res.status(404).send("There is no Page Here!")
});

server.use(function (error, req, res, next) {
    res.status(505).send("Server Internal Error!")
})

function keepAlive() {
    const listener = server.listen(3000, () => {
        console.log(`Listening to port 127.0.0.1:${listener.address().port}`);
    })
}

module.exports = keepAlive;