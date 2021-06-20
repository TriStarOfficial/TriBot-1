const glob = require('glob')

function ReloadCommand(client, message) {
    client.commands.sweep(() => true);
    glob(`${__dirname}/../**/*.js`, async (err, filepath) => {
        if (err) return message.channel.send(err, { code: 'ini' })
        FilePath.forEach((file) => {
            delete require.cache[require.resolve(file)];

            const pull = require(file);

            if (pull.name) {
                client.commands.set(pull.name, pull);
            };

            if (pull.aliases && Array.isArray(pull.aliases)) {
                pull.aliases.forEach((alias) => {
                    client.aliases.set(alias, pull.name)
                })
            }
        })
        const embed = new MessageEmbed()
        .setColor('BLURPLE')
        .setTitle('Reloaded All The Command!')
        message.channel.send(embed)
    })
}

module.exports = ReloadCommand;