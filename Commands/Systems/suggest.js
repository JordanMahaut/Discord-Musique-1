const { CommandInteraction, MessageEmbed, Message } = require('discord.js');
const { execute } = require('../Developer/emitt');

module.exports = {
    name: "suggest",
    description: "Création d'une suggestion dans un sujet orginisé",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "type",
            description: "Select the type.",
            required: true,
            type: "STRING",
            choices: [
                {
                    name: "Ajout de Commande",
                    value: "Ajout de Commande"
                },
                {
                    name: "Ajout de channel",
                    value: "Ajout de channel"
                },
            ]
        },
        {
            name: "name",
            description: "Donnez un nom à votre suggestion.",
            type: "STRING",
            required: "true"
        },
        {
            name: "functionality",
            description: "Décrivez la fonctionnalité de cette suggestion.",
            type: "STRING",
            required: "true"
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction) {
        const { options } = interaction;

        const type = options.getString("type");
        const name = options.getString("name");
        const funcs = options.getString("functionality");

        const Response = new MessageEmbed()
        .setColor("AQUA")
        .setDescription(`${interaction.member} a proposé une ${type}.`)
        .addField("Nom", `${name}`, true)
        .addField("Fonctionnalité", `${funcs}`, true)
        const message = await interaction.reply({embeds: [Response], fetchReply: true})
        message.react("✅")
        message.react("❌")
    }
}