const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member
     */
    execute(member) {

        const { user, guild } = member;

        member.roles.add("1007779335312248853");

        const loger = new WebhookClient({
            id: "1011341551701598269",
            token: "oNJflN7GjknBkGdmNgiqYW585lT0mr6zNj3R1dlOTfFkqdBwdRCKH6voXNSSde8DZ2ic"
        });

        const leave = new MessageEmbed()
        .setColor("DARK_ORANGE")

        .setAuthor("left", user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
         **${member}** has left this beautiful server\n
        Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`)
        .setFooter(`User ID: ${user.id}`, )

        loger.send({ embeds: [leave] }).catch((err) => {
            console.log(err)
        })
    }
}
