const { CommandInteraction, Client } = require("discord.js");

module.exports = {
    name: "clonevent",
    description: "Event clone",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "event",
            description: "Guild Member Event",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "guildMemberAdd",
                    value: "guildMemberAdd"
                },
                {
                    name: "guildMemberRemove",
                    value: "guildMemberRemove"
                }
            ]
        }
    ], 
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        const choices = interaction.options.getString("member");

        switch(choices) {
            case "guildMemberAdd" : {
                client.emit("guildMemberAdd", interaction.member);
                interaction.reply({content: "Cloned the event, this means the event has started and will be shown.", ephemeral: true})
            }
            break;
            case "guildMemberRemove" : {
                client.emit("guildMemberRemove", interaction.member);
                interaction.reply({content: "Cloned the event, this means the event has started and will be shown.", ephemeral: true})
        }
        break;
      }
   }
}