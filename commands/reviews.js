const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'reviews',
    description: "this is a ping command!",
    execute(db,client,message, args){(async () => {
        if(args[0]==undefined){return;}
        
        var averagereviews;
        var usertogetid = args[0].replace("<@", "").replace(">", "");
        var usertogettag = await client.users.cache.get(usertogetid).tag;
        if(await db.get(`user_${usertogettag}.score`)!="0")
        {
        averagereviews= await db.get(`user_${usertogettag}.score`)/await db.get(`user_${usertogettag}.reviews`)
        const respembed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle(`The user ${usertogettag} has an average rating of ${averagereviews}/5`)
        .setDescription(`The user ${usertogettag} has been reviewed ${await db.get(`user_${usertogettag}.reviews`)} times.`);
      message.reply({ embeds: [respembed] });
        }
        else
        {
            const resundefuserpembed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle(`The user ${usertogettag} has not any reviews yet!`)
        .setDescription(`You could review the user ${usertogettag} if you want.`);
      message.reply({ embeds: [resundefuserpembed] });
        }


    })();
    }
}