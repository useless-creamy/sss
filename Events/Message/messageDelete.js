const { MessageEmbed, Message, WebhookClient } = require("discord.js");

module.exports = {
    name: "messageDelete",
    /** 
     * @param {Message} message 
     */
    execute(message) {
     if(message.author.bot) return;


     const Log = new MessageEmbed()
     .setColor("BLURPLE")
     .setDescription(`**Message has been deleted by ${message.author}**\n[Jump to deleted message](${message.url}).\n
     **Deleted Message**\n ${message.content ? message.content : "None"}`.slice(0, 4096))
     .setFooter(`ID: ${message.author.id}`)
     .setTimestamp()

     new WebhookClient({url: "https://discord.com/api/webhooks/1011373803328253952/UC-FyBQuAIfpRBPEzrhOnsCNBVUb7uMN6vt318yT9B1e9tI3jVwvNr3-sCXAdV7zzVZG"}).send({embeds: [Log]}).catch((err) => { console.log(err)})

     

 }
}

