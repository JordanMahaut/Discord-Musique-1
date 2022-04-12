const { ButtonInteraction } = require("discord.js");
const { execute } = require("../../Commands/Systems/music");
const DB = require('../../Structures/Schemas/SuggestDB');

module.exports = {
    name: "interactionCreate",

    /**
     * @param {ButtonInteraction} interaction 
     */

    async execute(interaction) {
        if(!interaction.isButton()) return;
        if(!interaction.member.permissions.has("ADMINISTRATOR"))
        return interaction.reply({content: "Vous ne pouvez pas utiliser ce bouton.", ephemeral: true});

        const { guildId, customId, message } = interaction;

        DB.findOne({GuildID: guildId, MessageID: message.id}, async(err, data) => {
            if(err) throw err;
            if(!data) return interaction.reply({content: "Aucune donnée n'a été trouvée dans la base de données.", ephemeral: true});

            const Embed = message.embeds[0];
            if(!Embed) return;

            switch(customId) {
                case "suggest-accept": {
                    Embed.fields[2] = {name: "Status :", value: "Accepter", inline: true};
                    message.edit({embeds: [Embed.setColor("GREEN")]});
                    interaction.reply({content: "Suggestion accepter", ephemeral: true})
                }
                break;
                case "suggest-decline": {
                    Embed.fields[2] = {name: "Status :", value: "Refuser", inline: true};
                    message.edit({embeds: [Embed.setColor("RED")]});
                    interaction.reply({content: "Suggestion refuser", ephemeral: true})
                }
                break;
            }
        })
    }
}