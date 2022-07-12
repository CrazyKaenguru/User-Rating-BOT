const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'changerating',
    description: "this is a ping command!",
    execute(db,client,message, args){(async () => {
        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("YOu changed the Review!")
        message.reply({ embeds: [embed] })
        var usertogetid = args[0].replace("<@", "").replace(">", "");
        var usertogettag = await client.users.cache.get(usertogetid).tag;
        var newScore= args[1]
        var reviewedusers=await db.get(`user_${message.author.tag}.reviewedusers`) 
        console.log((await db.get(`user_${message.author.tag}.reviewedusers`)).split("_"))
        await db.pull(`user_${message.author.tag}.reviewedusers`,`${reviewedusers.find(str => str.startsWith(usertogettag))}`)
        console.log(reviewedusers.find(str => str.startsWith(usertogettag)))


    })();
    }
}