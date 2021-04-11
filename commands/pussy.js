const Topgg = require("@top-gg/sdk");


const topgg = new Topgg.Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyNzI0NTc1MzcwOTQ5NDM4MyIsImJvdCI6dHJ1ZSwiaWF0IjoxNjE1NzE1MTQ1fQ.PxZcpW4Gm1mNy9kuScTc0J0wmT83sLnkRwaqOXGwy-E");

const Discord = require('discord.js');
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();
const talkedRecently = new Set();

exports.run = async (client, message, args) => {

           // the user can type the command ... your command code goes here :)
           if(!message.channel.nsfw) {
            message.channel.send(":no_entry: **You have to mark this channel as NSFW** to see some you know what I mean :D");
            
            return;
        }
        const image = await nsfw.anal();
        const embed = new Discord.MessageEmbed()
        .setTitle(`Pussy Image`)
        .setColor("GREEN")
        .setImage(image);
        message.channel.send(embed);
        message.channel.send("You voted me")

        // Adds the user to the set so that they can't talk for a minute

    }

