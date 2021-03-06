const { ContextMenuInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "userinfo",
  type: "USER",
  permission: "ADMINISTRATOR",
  /**
   *
   * @param {ContextMenuInteraction} interaction
   */
  async execute(interaction) {
    const target = await interaction.guild.members.fetch(interaction.targetId);

    const Response = new MessageEmbed()
      .setColor("AQUA")
      .setThumbnail(target.user.avatarURL({ dynamic: true, size: 512 }))
      .addField("ID", `${target.user.id}`, true)
      .addField(
        "Roles",
        `${
          target.roles.cache
            .map((r) => r)
            .join(" ")
            .replace("@everyone", "") || "None"
        }`
      )
      .addField(
        "Membre depuis",
        `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`,
        true
      )
      .addField(
        "Client discord",
        `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`,
        true
      );

    interaction.reply({ embeds: [Response], ephemeral: true });
  },
};
