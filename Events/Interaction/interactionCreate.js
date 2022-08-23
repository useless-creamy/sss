const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /** 
     * 
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        if(interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if(!command) return interaction.reply({ ephemeral: true, embeds: [
                new MessageEmbed()
                .setColor("RED")
                .setDescription("⛔ An error occured. Please wait 30+ seconds to register the slash commands. If tis isn't the case, then the this command is probably deleted.  ")
            ]}) && client.commands.delete(interaction.commandName)


            if (command.permission && !interaction.member.permissions.has(command.permission)) {
                return interaction.reply({ content: `You do not have the required permission for this command: \`${interaction.commandName}\`.`, ephemeral: true })
            }
            
            command.execute(interaction, client)
        }
    }
}