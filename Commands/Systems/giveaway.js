const { CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "giveaway",
  description: "Un système giveaway complet.",
  permission: "ADMINISTRATOR",
  options: [
    {
      name: "start",
      description: "Start a giveaway",
      type: "SUB_COMMAND",
      options: [
        {
          name: "duration",
          description: "Indiquez une durée pour ce giveaway (1m, 1h, 1d).",
          type: "STRING",
          required: true,
        },
        {
          name: "winners",
          description: "Sélectionnez le nombre de gagnants pour ce giveaway.",
          type: "INTEGER",
          required: true,
        },
        {
          name: "prize",
          description: "Indiquez le nom du prix",
          type: "STRING",
          required: true,
        },
        {
          name: "channel",
          description: "Sélectionnez un channel pour envoyer le giveaway.",
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
        },
      ],
    },
    {
      name: "actions",
      description: "Options de giveaways.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "options",
          description: "Selectionnez une option.",
          type: "STRING",
          required: true,
          choices: [
            {
              name: "end",
              value: "end",
            },
            {
              name: "pause",
              value: "pause",
            },
            {
              name: "unpause",
              value: "unpause",
            },
            {
              name: "reroll",
              value: "reroll",
            },
            {
              name: "delete",
              value: "delete",
            },
          ],
        },
        {
          name: "message-id",
          description: "Fournissez l'identifiant du message du giveaway.",
          type: "STRING",
          required: true,
        },
      ],
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    const { options } = interaction;

    const Sub = options.getSubcommand();

    const errorEmbed = new MessageEmbed();

    const successEmbed = new MessageEmbed();

    switch (Sub) {
      case "start":
        {
          const gchannel = options.getChannel("channel") || interaction.channel;
          const duration = options.getString("duration");
          const winnerCount = options.getInteger("winners");
          const prize = options.getString("prize");

          client.giveawaysManager
            .start(gchannel, {
              duration: ms(duration),
              winnerCount,
              prize,
              messages : {
                giveaway: "🎉 **GIVEAWAY STARTED** 🎉",
                giveawayEnded: "🎊 **GIVEAWAY STARTED** 🎊",
                inviteToParticipate: "Veuillez réagir avec 🎉 pour participer !",
                noWinner: "Aucune gagnant, personne n'a participé au giveaway !",
                drawing: "Temps restant : {timestamp}",
                winMessage:
                  "Toutes nos félicitations {winners} ! Tu as gagné le giveaway ! \nPrix : **{this.prize}** !",
              },
            })
            .then(async () => {
              successEmbed.setDescription(
                "Giveaway a été démarrer avec succès."
              );
              return interaction.reply({ embeds: [successEmbed], ephemerall: true });
            })
            .catch((err) => {
              errorEmbed.setDescription(`Une erreur est survenue\n\`${err}\``);
              return interaction.reply({ embeds: [errorEmbed], ephemerall: true });
            });
        }
        break;

      case "actions":
        {
          const choice = options.getString("options");
          const messageId = options.getString("message-id");

          const giveaway =
            client.giveawaysManager.giveaways.find(
              (g) =>
                g.guildId === interaction.guildId &&
                g.prize === interaction.options.getString("query")
            ) ||
            client.giveawaysManager.giveaways.find(
              (g) =>
                g.guildId === interaction.guildId &&
                g.messageId === messageId);

          if (!giveaway) {
              errorEmbed.setDescription(`Impossible de trouver le giveaway avec l'identifiant du message : ${messageId} dans cette guilde`);
              return interaction.reply({embeds:  [errorEmbed], ephemerall: true});
          }

          switch(choice) {
            case "end":
              {
                client.giveawaysManager.end(messageId).then(() => {
                    successEmbed.setDescription("Le giveaway est terminé.");
                    return interaction.reply({embeds: [successEmbed], ephemeral: true})
                }).catch((err) => {
                    interaction.channel.send(`Une erreur s'est produite, veuillez vérifier et réessayer.\n\`${err}\``);
                    return interaction.reply({embeds:  [errorEmbed], ephemerall: true});
                });
              }
              break;
            case "pause":
              {
                client.giveawaysManager.pause(messageId).then(() => {
                    successEmbed.setDescription("Le giveaway est en pause.");
                    return interaction.reply({embeds: [successEmbed], ephemeral: true})
                }).catch((err) => {
                    interaction.channel.send(`Une erreur s'est produite, veuillez vérifier et réessayer.\n\`${err}\``);
                    return interaction.reply({embeds:  [errorEmbed], ephemerall: true});
                });
              }
              break;
            case "unpause":
              {
                client.giveawaysManager.unpause(messageId).then(() => {
                    successEmbed.setDescription("Le giveaway a repris.");
                    return interaction.reply({embeds: [successEmbed], ephemeral: true})
                }).catch((err) => {
                    interaction.channel.send(`Une erreur s'est produite, veuillez vérifier et réessayer.\n\`${err}\``);
                    return interaction.reply({embeds:  [errorEmbed], ephemerall: true});
                });
              }
              break;
            case "reroll":
              {
                client.giveawaysManager.reroll(messageId).then(() => {
                    successEmbed.setDescription("Le giveaway est relancé.");
                    return interaction.reply({embeds: [successEmbed], ephemeral: true})
                }).catch((err) => {
                    interaction.channel.send(`Une erreur s'est produite, veuillez vérifier et réessayer.\n\`${err}\``);
                    return interaction.reply({embeds:  [errorEmbed], ephemerall: true});
                });
              }
              break;
            case "delete":
              {
                client.giveawaysManager.delete(messageId).then(() => {
                    successEmbed.setDescription("Le giveaway est supprimé.");
                    return interaction.reply({embeds: [successEmbed], ephemeral: true})
                }).catch((err) => {
                    interaction.channel.send(`Une erreur s'est produite, veuillez vérifier et réessayer.\n\`${err}\``);
                    return interaction.reply({embeds:  [errorEmbed], ephemerall: true});
                });
              }
              break;
          }
        }
        break;

      default: {
        console.log("Error in giveaway command.");
      }
    }
  },
};
