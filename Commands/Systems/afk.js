const { CommandInteraction, MessageEmbed,} = require("discord.js");
const DB = require("../../Structures/Schemas/AFKSystem");

module.exports = {
    name: "afk",
    description: "AFK system.",
    options: [
        {
            name: "set",
            type: "SUB_COMMAND",
            description:"Set your AFK Status",
            options: [
                {
                    name: "status",
                    description: "Set your Status to whatever",
                    type: "STRING",
                    required: true
                }
            ]
        },
        {
            name: "remove",
            type: "SUB_COMMAND",
            description:"Exit the AFK status",
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { guild, options, user, createdTimestamp } = interaction;
        
      const Embed = new MessageEmbed()
      .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true}));

      const afkStatus = options.getString("status");

      try {

       switch(options.getSubcommand()) {
        case "set" : {
         await DB.findOneAndUpdate( 
          {GuildID: guild.id,  UserID: user.id},
         {Status: afkStatus, Time: parseInt(createdTimestamp / 1000)},
         {new: true, upsert: true}
         )

            Embed.setColor("GREEN").setDescription(`You AFK Status has been updated: **${afkStatus}**`);

            return interaction.reply({embeds: [Embed] })


        }
        case "remove" : {
           await DB.deleteOne({GuildID: guild.id, UserID: user.id});

           Embed.setColor("RED").setDescription("Your AFK status has been removed.");
           return interaction.reply({ embeds: [Embed] })
        }
    }


      } catch (err) {
        console.log(err)
      }

    }
}