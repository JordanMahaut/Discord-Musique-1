const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {

        const { user, guild } = member;

        // Créer un Webhook remove.
        const Loger = new WebhookClient({
            id: "961674772754870414",
            token: "runvY0-zhictev8kF7KqDzl1dg_ctoU2hGGEbxzt8wLCg_9NwT6zqWpI5mFQb8k5c8CG"
        });

        const Welcome = new MessageEmbed()
        .setColor("RED")
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        ${member} à leave la communauté\n
        Join : <t:${parseInt(member.joinedTimestamp / 1000)}:R>\nDernier nombre de membres: **${guild.memberCount}**`)

        Loger.send({embeds: [Welcome]})
    }
}