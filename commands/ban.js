const discord = require('discord.js');

exports.run = (client, message, args) => {

const me = message.author

if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(':no_entry: **You are lacking the permission:** `BAN_MEMBERS`');
if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('I don\'t have the right permissionsss idiot.')

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

if(!args[0]) return message.channel.send(':question: **Please specify a user that you want to ban**, I will handle the rest.');

if(!member) return message.channel.send('**LMFAO**, you want to ban a ghost? :ghost:');
if(!member.bannable) return message.channel.send(':no_entry: **This user can\'t be banned.** It is either because they are a mod/admin, or their highest role is higher than mine');

if(member.id === message.author.id) return message.channel.send('Why would you want to ban yourself? Are you okay?');



if(args === undefined) args = 'Unspecified';

member.ban()
    const banembed = new discord.MessageEmbed()
    .setTitle('Member Banned')
    .setColor('#30D5C8')
    .setThumbnail(member.user.displayAvatarURL())
    .addField('User Banned', member)
    .addField('Banned by', message.author)
    .addField('Reason', args)
    .setFooter('Time of Ban', client.user.displayAvatarURL())
    .setTimestamp()

    message.channel.send(banembed);

    const sendBanEmbed = new discord.MessageEmbed()
    .setTitle("You've been banned from " + member.guild.name)
    .setDescription("**Reason:** " + args + "\n**Moderator:** <@!" + me + ">`" + me.tag + "`")
    .setColor("RED")
    .setTimestamp()
    member.send(sendBanEmbed);
}