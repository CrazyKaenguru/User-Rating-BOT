const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    execute(db,client,message, args){
        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("PONG!")
        message.reply({ embeds: [embed] })
    }
}