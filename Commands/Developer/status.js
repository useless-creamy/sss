const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const  { connection } = require("mongoose");
require("../../Events/Client/Ready");

module.exports = {
    name: "status",
    description: "Uptime of the bot & database connection",
    /** 
     * 
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {

        const response = new MessageEmbed()
        .setColor("BLURPLE")
        .setDescription(`**Client**: \`🟢\` - \`${client.ws.ping}ms\`\n **Uptime:**: <t:${parseInt(client.readyTimestamp / 1000)}:R>\n
        **Database**: \`${switchTo(connection.readyState)}\``)

        interaction.reply({ embeds: [response] })
    }
}

function switchTo(val)  { 
    var status = " ";
    switch(val) {
        case 0 : return status = `🔴 DISCONNECTED`
        break;
        case 1 : return status = `🟢 CONNECTED`
        break;
        case 2 : return status = `🟡 CONNECTING`
        break;
        case 3 : return status = `🟠 DISCONNECTING`
        break;
        
    }
}