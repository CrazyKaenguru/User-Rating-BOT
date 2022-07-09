const { MessageEmbed } = require("discord.js");
const wrongformatembed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Wrong Format!")
        .setDescription("Please do -review <@user to review> <review-score from 1 to 5>");
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
        await db.set(`user_${usertoreviewtag}`, { score: 0 });
      }


      var reviewmessage = (await client.users.cache.get(usertoreviewid).username) +" has been reviewed!";
      const embed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle(reviewmessage);
      message.reply({ embeds: [embed] });
    })();
  },
};
