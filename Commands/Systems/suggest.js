const {
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton
} = require("discord.js");
const DB = require("../../Structures/Schemas/SuggestDB");
const { permission, execute } = require("./music");

module.exports = {
  name: "suggest",
  description: "Suggestion.",
  permission: "ADMINISTRATOR",
  options: [
    {
      name: "type",
      description: "Sélectionnez une option.",
      type: "STRING",
      required: true,
      choices: [
            {name: "Ajout de commande", value: "Ajout de commande"},
            {name: "Ajout de channel", value: "Ajout de channel"},
            {name: "Giveaway", value: "Giveaway"},
            {name: "Autres", value: "Autres"}
      ]
    },
    {
        name: "suggestion",
        description: "Décrivez votre suggestion.",
        type: "STRING",
        required: true
    }
  ],
    /**
     * @param {CommandInteraction} interaction 
    */
    async execute(interaction) {
        const { options, guildId, member, user } = interaction;

        const Type = options.getString("type");
        const Suggestion = options.getString("suggestion");

        const Embed = new MessageEmbed()
        .setColor("NAVY")
        .setAuthor({
            name: user.tag,
            iconURL: user.displayAvatarURL({dynamic: true})
        })
        .addFields(
            {name: "Suggestion", value: Suggestion, inline: false},
            {name: "Type", value: Type, inline: true},
            {name: "Status", value: "Pending", inline: true}
        )
        .setTimestamp()

        const Buttons = new MessageActionRow();
        Buttons.addComponents(
            new MessageButton().setCustomId("suggest-accept").setLabel("✅ Accepter").setStyle("PRIMARY"),
            new MessageButton().setCustomId("suggest-decline").setLabel("⛔ Refuser").setStyle("SECONDARY")
        )

        try {

            const M = await interaction.reply({embeds: [Embed], components: [Buttons], fetchReply: true});

            await DB.create({GuildId: guildId, MessageID: M.id, Details: [
                {
                    MemberID: member.id,
                    Type: Type,
                    Suggestion: Suggestion
                }
            ]})
            
        } catch (err) {
            console.log(err);
        }
  }
}
