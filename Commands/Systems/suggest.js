const { CommandInteraction, MessageEmbed, GuildMember } = require("discord.js");

module.exports = {
    name: "suggest",
    description: "Create a suggestion",
    options: [
        {
            name: "name",
            description: "Type any suggestion",
            type: "STRING",
            required: true,
        },
        {
            name: "suggestion",
            description: "Any suggestion",
            type: "STRING",
            required: true,
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {GuildMember} member
     */
    async execute(interaction, member) {

      const { options } = interaction;
      const { user } = member; 

      const name = options.getString("name");
      const funcstinality = options.getString("suggestion");

      const Suggestionembed = new MessageEmbed()
      .setColor("BLURPLE")
      .setDescription(`${interaction.member} has suggested a suggestion.`)
      .addField("Name", `${name}`, true)
      .addField("Suggestion", `${funcstinality}`,  true)
      .setFooter(user.avatarURL({dynamic: true, size: 512}))
      const message = await interaction.reply({ embeds: [Suggestionembed], fetchReply: true})
      message.react("<:3557greentick:1009273113449607299>")
      message.react("<:5598redcross:1009273112535236708>")

    } 
}