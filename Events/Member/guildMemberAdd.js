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
    member.roles.add("958156279518482452");

    // Créer un Webhook sur le discord.
    const Welcomer = new WebhookClient({
      id: "958477028422729758",
      token:
        "sUYFRTOxS58bdfboTYO0C3vsodvGT_GQwljqpieValuc8xvN355mQRhyjxA8ZzKGOHJd",
    });

    const Welcome = new MessageEmbed()
      .setColor("AQUA")
      .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
      .setDescription(`
        Bievenue ${member} sur **${guild.name}** !\n
        Compte créé : <t:${parseInt(
          user.createdTimestamp / 1000
        )}:R>\nDernier nombre de membres: **${guild.memberCount}**`);

    Welcomer.send({ embeds: [Welcome] });
  },
};
