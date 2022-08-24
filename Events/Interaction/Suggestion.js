const { ButtonInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../Structures/Schemas/Suggest");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
        if(!interaction.isButton()) return;
        if(!interaction.member.permissions.has("MANAGE_ROLES"))
        return interaction.reply({ content: "You can't **Accept** or ***Decline** this Button", ephemeral: true});


        const { guildId, customId, message } = interaction;

        DB.findOne({GuildID: guildId, MessageID: message.id} , async (err, data) => {
            if(err) throw err;
            if(!data) return interaction.reply({content: "Hmmm... somehow your data didn't store in the database.", ephemeral: true});

            const Embed = message.embeds[0];
            if(!Embed) return;

            switch(customId) {
                case "Accept" : {
                    Embed.fields[2] = {name: "Status", value: "Accepted", inline: true};
                    message.edit({embeds: [Embed.setColor("GREEN")]});
                    interaction.reply({content: "Suggetion has been accepted by a Administrator", ephemeral: true})
                }
                break;
                case "Decline" : {
                    Embed.fields[2] = {name: "Status", value: "Declined", inline: true};
                    message.edit({embeds: [Embed.setColor("RED")]});
                    return interaction.reply({content: "Suggetion declined by a Administrator", ephemeral: true})
                }
                break;
            }
            

        })





    }
}