const { MessageEmbed } = require("discord.js");

module.exports.error = (title, ErrorMessage, message, feilds, color) => {
    color = color || "RED"
    title = title || "Error Found!"
    feilds = feilds || [{ name: 'Success', value: "False"}]

    const ErrorEmbed = new MessageEmbed()
    .setTitle(title)
    .setDescription(ErrorMessage)
    .setColor(color)
    .addFields(feilds)
    .setTimestamp()
    return message.channel.send(ErrorEmbed)
}

module.exports.success = (title, SuccessMessage, message, feilds, color) => {
    color = color || "GREEN"
    title = title || "Successfull"
    feilds = feilds || [{ name: 'Success', value: 'True' }]
    
    const SuccessMessageEmbed = new MessageEmbed()
    .setColor(color)
    .setTitle(title)
    .setDescription(SuccessMessage) 
    .setTimestamp()
    .addFields(feilds)
    return message.channel.send(SuccessMessageEmbed)
}

module.exports.embed = (title, EmbedMessage, message, feilds, color) => {
    color = color || "RANDOM"
    feilds = feilds || [{ name: "Status", value: "True" }]

    const embed = new MessageEmbed()
    .setColor(color)
    .setDescription(EmbedMessage)
    .setTitle(title)
    .setTimestamp()
    .addFields(feilds)
    return message.channel.send(embed)
}