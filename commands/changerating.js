const { MessageEmbed } = require('discord.js');
const wrongformatembed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Wrong Format!")
        .setDescription("Please do -review <@user to review> <review-score from 1 to 5>");
module.exports = {
    name: 'changerating',
    description: "this is a ping command!",
    execute(db,client,message, args){(async () => {
        var usertogetid = args[0].replace("<@", "").replace(">", "");
        var usertogettag = await client.users.cache.get(usertogetid).tag;
        var newScore= args[1]
        if(newScore>5||newScore<1||newScore==undefined){message.reply({ embeds: [wrongformatembed] });return;}
        var reviewedusers=await db.get(`user_${message.author.tag}.reviewedusers`) 
        var oldratingscore=(await db.get(`user_${message.author.tag}.reviewedusers`)).toString().split("_").pop()
        await db.add(`user_${usertogettag}.score`,- parseFloat(oldratingscore))
        await db.add(`user_${usertogettag}.score`,newScore)
       await db.pull(`user_${message.author.tag}.reviewedusers`,`${reviewedusers.find(str => str.startsWith(usertogettag))}`)
        console.log(reviewedusers.find(str => str.startsWith(usertogettag)))
        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("YOu changed the Review"+"of "+usertogettag)
        message.reply({ embeds: [embed] })


    })();
    }
}