const { MessageEmbed, Client,Message } = require('discord.js');
const { inspect } = require('util')

module.exports = {
    name: 'eval',
    description: 'Just eval shit!',
    category: 'Admin',
    StaffCommand: true,
    BotCommand: false,
    Developer: false,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async(client,message,args) => {
        if (!message.member.roles.cache.has('835456151184736296' || '842707123371638825' || '389453625866321920' ||'835450582130229249'||'841607216867704832')) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Missing Roles Requirement!'));
        if (message.content.includes('token')) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Trying to steal Token Detected!').setTimestamp());
        const code = args.slice().join(" ");
        const embed = new MessageEmbed();
        
        if (!code) return message.channel.send(new MessageEmbed().setColor("RED").setDescription(`Dude Provide some arguments.`));

        try {
            let evaled = await eval(code),
                output;
            if (evaled.constructor.name === `Promise`) {
                output = `📤 Output (Promise)`;
            } else {    
                output = `📤 Output`;
            }
            if (evaled.length > 800) {
                evaled = evaled.substring(0, 800) + `...`;
            }
            embed
                .addField(`📥 Input`, `\`\`\`\n${code}\n\`\`\``)
                .addField(output, `\`\`\`js\n${evaled}\n\`\`\``)
                .setColor(client.color)
                .addField(`Status`, `Success`);
            return client.channels.cache.get('846666365863067688').send(embed);
        } catch (e) {
            embed
                .addField(`📥 Input`, `\`\`\`\n${code}\n\`\`\``)
                .addField(`📤 Output`, `\`\`\`js\n${e}\n\`\`\``)
                .addField(`Status`, `Failed`)
                .setColor(client.color);
            return client.channels.cache.get('846666365863067688').send(embed);
        }
    }
}