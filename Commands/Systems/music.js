const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "music",
    description: "music system",
    permission: "SEND_MESSAGES",
    options: [
        {
            name: "play",
            description: "Plays any song",
            type: "SUB_COMMAND",
            options: [{ name: "query", description: "Type any name of a song or url.", type: "STRING", required: true}]
        },
        {
            name: "volume",
            description: "Change the volume",
            type: "SUB_COMMAND",
            options: [{ name: "percent", description: "1-100", type: "NUMBER", required: true}]
        },
        {
            name: "options",
            description: "Select an setting",
            type: "SUB_COMMAND",
            options: [{ name: "options", description: "Select an option.", type: "STRING", required: true,
            choices: [
                { name: "queue", value: "queue"},
                { name: "skip", value: "skip"},
                { name: "pause", value: "pause"},
                { name: "resume", value: "resume"},
                { name: "stop", value: "stop"},
            ]
        }]}
    ],
    /** 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;

        if(!VoiceChannel)
        return interaction.reply({content: "You must be in a voice channel to use music commands.", ephemeral: true});

        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
        return interaction.reply({content: `**:x: Hey! you are probably in a differnet voice channel as me. Join <#${guild.me.voice.channelId}>**.`, ephemeral: true});

        try {
            switch(options.getSubcommand()) {
                case "play" : {
                    client.distube.playVoiceChannel( VoiceChannel, options.getString("query"), { textChannel: channel, member: member });
                    return interaction.reply({content: `**🔊 Song started in <#${guild.me.voice.channelId}>**.`});
                }
                case "volume" : {
                    const Volume = options.getNumber("percent");
                    if(Volume > 100 || Volume < 1)
                    return interaction.reply({content: "**:x: Hey, quick question. Can you please specify a number between 1 - 100. **"});

                    client.distube.setVolume(VoiceChannel, Volume);
                    return interaction.reply({content: `**🎚️ Volume set to **\`${Volume}%\``});
                }
                case "options" : {
                    const queue = await client.distube.getQueue(VoiceChannel)

                    if(!queue)
                    return 

                    switch(options.getString("options")) {
                        case "skip" : 
                           await queue.skip(VoiceChannel) 
                                return interaction.reply({content: "**⏭️ Song has been skipped.**"})
                         case "stop" : 
                            await queue.stop(VoiceChannel) 
                                return interaction.reply({content: "**⏭️ Every song has been stopped.**"})
                         case "pause" : 
                             await queue.pause(VoiceChannel) 
                                return interaction.reply({content: "**⏸️ Songs has been paused.**"})
                         case "resume" : 
                             await queue.resume(VoiceChannel) 
                                return interaction.reply({content: "**▶️ Songs has been resumed**"})
                         case "queue" : 
                         return interaction.reply({ embeds: [new MessageEmbed()
                        .setColor("BLURPLE")
                        .setDescription(`${queue.songs.map(
                            (song, id) => `\n**${id + 1}**. ${song.name} = \`${song.formattedDuration}\``)}`
                            )]});                                               
                    }
                    return;

                }
            }
        } catch (e) {
            const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`⛔ Error occured: ${e}`)
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
        }
    }
}