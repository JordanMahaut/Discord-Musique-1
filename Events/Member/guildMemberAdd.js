const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {

        const { user, guild } = member;

        // ID du role Joueur.
        member.roles.add("513532333815627807");

        // Créer un Webhook sur le discord.
        const Welcomer = new WebhookClient({
            id: "961674369271218176",
            token: "vM56ucrbfQNnqGEYBag2TmREBH38dd12MZ09x9pgQc6nmr_VLgtsJGk6N8z7GFNXZwE7"
        });

        const Welcome = new MessageEmbed()
        .setColor("AQUA")
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        Bievenue ${member} sur **${guild.name}** !\n
        Compte créé : <t:${parseInt(user.createdTimestamp / 1000)}:R>\nDernier nombre de membres: **${guild.memberCount}**`)

        Welcomer.send({embeds: [Welcome]})
    }
}