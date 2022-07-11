const { MessageEmbed } = require("discord.js");
const wrongformatembed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Wrong Format!")
        .setDescription("Please do -review <@user to review> <review-score from 1 to 5>");
        const alreaedyreviewedembed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle("You already reviewd this User!")
        .setDescription("You can do -changereview to change your review of this person!");
module.exports = {
  name: "review",
  description: "this is a ping command!",
  execute(db, client, message, args) {
    (async () => {
      var usertoreviewid = args[0].replace("<@", "").replace(">", "");
      var usertoreviewtag = await client.users.cache.get(usertoreviewid).tag;
      var reviewscore=args[1]
      if(reviewscore>5||reviewscore<1||reviewscore==undefined){message.reply({ embeds: [wrongformatembed] });return;}
      if ((await db.get(`user_${usertoreviewtag}.score`)) == undefined) {
        console.log("create");
        await db.set(`user_${usertoreviewtag}`, { score:0 })
        await db.push(`user_${usertoreviewtag}.info`,  "_reviewed_0" )
        await db.push(`user_${usertoreviewtag}.info`, "_reviews_0" )
      }
      
      if(((await db.get(`user_${message.author.tag}.info`)).indexOf(usertoreviewtag)!=-1)){message.reply({ embeds: [alreaedyreviewedembed] });return;}
      await db.push(`user_${message.author.tag}.info`, `${usertoreviewtag}` ) //add user to array so Cant review twice
      var reviewmessage = (await client.users.cache.get(usertoreviewid).username) +" has been reviewed!";
      const embed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle(reviewmessage);
      message.reply({ embeds: [embed] });
    })();
  },
};
