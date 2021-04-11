const discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const Topgg = require("@top-gg/sdk");

const client = new discord.Client();
const topgg = new Topgg.Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyNzI0NTc1MzcwOTQ5NDM4MyIsImJvdCI6dHJ1ZSwiaWF0IjoxNjE1NzE1MTQ1fQ.PxZcpW4Gm1mNy9kuScTc0J0wmT83sLnkRwaqOXGwy-E");
const config = require("./config.json");
const message = require("./events/message");
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;

client.on("ready", () =>{
    console.log(`${client.user.username} is ready`);
})

client.on("guildMemberAdd", member =>{

  
 
  const welcomeChannel = member.guild.channels.get('829733392341139477');
  const embed = new discord.MessageEmbed()
 
  .setTitle(`Welcome ${member.nickname}`);

  welcomeChannel.send(embed);
})

client.on("messageDelete", async message =>{
  if(!message.guild) return;

  const fetchedLogs = await message.guild.fetchAuditLogs({
    limit: 1,
    type: "messageDelete",
  });

  const channelDeleted = message.channel.name;

  const logChannel = client.channels.cache.find(channel => channel.name === "logs");

  const deletionLog = fetchedLogs.entries.first();

  if(!deletionLog) return console.log(`A message by ${message.author.tag} was deleted but, no relevant audit logs were found`);

  const {executor, target} = deletionLog;

  if(target.id === message.author.id) {

    const embed = new discord.MessageEmbed()
   
    .setAuthor(executor.tag, executor.displayAvatarURL({dynamic: true}))
    .setTitle(`Message deleted in #${channelDeleted}`)
    .setDescription(message.content)
    .setFooter("ID: " + message.id)
    .setColor("FF0000")
    .setTimestamp();
    
    

    logChannel.send(embed);
    return;
    
    

}
  if(executor.id === message.author.id) {
    const embed = new discord.MessageEmbed()
   
    .setAuthor(executor.tag, executor.displayAvatarURL({dynamic: true}))
    .setTitle(`Message deleted in #${channelDeleted}`)
    .setDescription(message.content)
    .setFooter("ID: " + message.id)
    .setColor("FF0000")
    .setTimestamp();
    
    

    logChannel.send(embed);
    return;
  }


})

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});


client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(config.token);