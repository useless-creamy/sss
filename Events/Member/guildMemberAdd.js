const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member
     */
    execute(member) {

        const { user, guild } = member;

        member.roles.add("1007779335312248853");

        const Welcomer = new WebhookClient({
            id: "1011341551701598269",
            token: "oNJflN7GjknBkGdmNgiqYW585lT0mr6zNj3R1dlOTfFkqdBwdRCKH6voXNSSde8DZ2ic"
        });

        const Welcome = new MessageEmbed()
        .setColor("BLUE")
        .setAuthor("Welcome", user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        Welcome **${user.tag}** to the **${guild.name}**!\n
        Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**\nPlease get along with the rules at <#1007771609022615572>.`)
        .setFooter(`User ID: ${user.id}`)

        Welcomer.send({ embeds: [Welcome] })
    }
}
