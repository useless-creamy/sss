const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const DB = require("../../Structures/Schemas/Suggest");

module.exports = {
    name: "suggestion",
    description: "Suggestion system",
    options: [
        {
            name: "suggestion",
            description: "Type any suggestion",
            type: "STRING",
            required: true
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { options, guildId, member, user } = interaction;

        const Suggestion = options.getString("suggestion");

        const Embed = new MessageEmbed()
        .setColor("AQAU")
        .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true}))
        .addFields(
            { name: "suggestion:", value: Suggestion, inline: false},
            { name: "Status", value: " Currently Pending", inline: true}
        )
        .setTimestamp()

        const Buttons = new MessageActionRow();
        Buttons.addComponents(
            new MessageButton().setCustomId("Accept").setLabel("✅ Accept").setStyle("SUCCESS"),
            new MessageButton().setCustomId("Decline").setLabel("⛔ Decline").setStyle("SECONDARYAccept")
        ) 


        try {

            const M = interaction.reply({embeds: [Embed], components: [Buttons], fetchReply: true});

            await DB.create({GuildID: guildId, MessageID: M.id, Details: [
                {
                    MemberID: member.id,
                    Suggestion: Suggestion
                }
            ]})
        } catch (err) {
            console.log(err);
        }
    }
}
