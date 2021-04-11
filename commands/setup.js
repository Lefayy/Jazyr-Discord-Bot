const discord = require("discord.js");
 
module.exports.run = async (client, message, args) => {
 
    var verifyEmbed = new discord.MessageEmbed()
    .setTitle("**Verify**")
    .setDescription("Hier de regels \n\ \n\ Reageer met .... om de regels te accepteren.")
 
    message.channel.send(verifyEmbed).then(embedMessage => {
        embedMessage.react('✅');
    });
 
        client.on("messageReactionAdd", async (reaction, member) => {
 
            if (reaction.emoji.name === '✅') {
 
            message.member.roles.remove('827124722495127553');
            message.member.roles.add('827124723599147008');
 
            }
 
        })
};
 