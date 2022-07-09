const Discord = require("discord.js");
const prefix = '-';
require('dotenv').config();
const fs = require("fs")
const { QuickDB } = require('quick.db');
const db = new QuickDB();

const client = new Discord.Client({
    allowedMentions: {
      parse: ['users', 'roles'],
      repliedUser: true,
    },
    intents: [
      "GUILDS",
      "GUILD_MESSAGES",
      "GUILD_PRESENCES",
      "GUILD_MEMBERS",
      "GUILD_MESSAGE_REACTIONS",
      "DIRECT_MESSAGES",
      "DIRECT_MESSAGE_TYPING",
      "DIRECT_MESSAGE_REACTIONS",
    ], 
    partials: ["CHANNEL"],
  })
  client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}

  client.on("ready", () => {
    console.log("Bot is online!");
    client.user.setActivity(`-help for help`, {
      type: "WATCHING",
    });
  })

  client.on("messageCreate", message => {(async () => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLocaleLowerCase();
    
    if(await db.get(`user_${message.author.tag}.score`)==undefined)
    {
      console.log("create")
        await db.set(`user_${message.author.tag}`, { score:0 })
            
    }
    if(command=="ping")
       {
      client.commands.get("ping").execute(db,client,message,args);
       }
       if(command=="review")
       {
      client.commands.get("review").execute(db,client,message,args);
       }
       
    })();
  })
  client.login(process.env.token);