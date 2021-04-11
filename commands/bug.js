const discord = require('discord.js');

exports.run = (client, message, args) => {
    
    const owner = client.users.cache.get('454299566452375572');






    

    if(!args.length) {
        return message.channel.send(":no_entry: Please elaborate the bug you found.");
    }

    const reportEmbed = new discord.MessageEmbed()
    .setTitle("**BUG REPORT**")
    .setColor("#ff0000")
    .addField('Author', message.author.toString(), true)
    .addField('Guild', message.guild.name, true)
    .addField('Bug Report', args)
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp()

    try {
    owner.send(reportEmbed).then(value => {
        message.channel.send("✅ `Bug` has been sent to the developer of Yazockx");
        return;
    });
    

    } catch(err) {
        return console.error();
    }

};