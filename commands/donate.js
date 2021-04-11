const discord = require('discord.js');

exports.run = (client, message, args) => {
    
    const embed = new discord.MessageEmbed()
    .setTitle("Click here to vote!")
    .setColor("74E4CB")
    .setURL("https://top.gg/bot/727245753709494383/vote")


    message.channel.send(embed); 
    return;

};