const { MessageEmbed, Message, WebhookClient } = require("discord.js");

module.exports = {
    name: "messageUpdate",
    /**
     * 
     * @param {Message} oldMessage 
     * @param {Message} newMessage 
     */
    execute(oldMessage, newMessage) {
           if(oldMessage.author.bot) return;

           if(oldMessage.content === newMessage.content) return;

           const Count = 1950;

           const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > 1950 ? " ..." : "");
           const Edited = newMessage.content.slice(0, Count) + (newMessage.content.length > 1950 ? " ..." : "");

           const log = new MessageEmbed()
           .setColor("RANDOM")
           .setDescription(`Message has been **edited** by ${newMessage.author} in ${newMessage.channel} [Jump to Message](${newMessage.url}).\n**Before**\n ${Original} \n**After**\n ${Edited}`.slice("0", "4096"))
           .setFooter(`Member Editor: ${newMessage.author.tag}  ID: ${newMessage.author.id}`)
           .setTimestamp();

           new WebhookClient({url: "https://discord.com/api/webhooks/1011373803328253952/UC-FyBQuAIfpRBPEzrhOnsCNBVUb7uMN6vt318yT9B1e9tI3jVwvNr3-sCXAdV7zzVZG"}).send({embeds: [log]}).catch((err) => console.log(err));

    }
}