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
            id: "958484623145435136",
            token: "I-Ztddw4vAR4fIizSt_F4LMd0XFYXDwryQ5j1sqTcTCTrnXRH6EqBkSteP5FGU9ZVr8_"
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