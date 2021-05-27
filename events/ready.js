require('dotenv').config();
const { connect, mongo, model, Schema } = require('mongoose');
module.exports.run = (client) => {
    console.log(`${client.user.username} is Ready! ✅`)

    connect(process.env['mongo'], {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    }).then(console.log('Connect to Mongo Database! ✅'));

}