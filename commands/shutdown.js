module.exports = {
    name: 'shutdown',
    description: "this is a shutdown command!",
    execute(message, args){

        if(message.member.roles.cache.has('823777643551129611')){
              logchannel.send(`<@${'710904756138147882'}> Shutting Down...`);
    }   else {
        message.channel.send('You do not have permission to run this command');
    }
}
}