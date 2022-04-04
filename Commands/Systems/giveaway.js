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
                    required: true
                },
                {
                    name: "winners",
                    description: "Sélectionnez le nombre de gagnants pour ce giveaway.",
                    type: "INTEGER",
                    required: true
                },
                {
                    name: "prize",
                    description: "Indiquez le nom du prix",
                    type: "STRING",
                    required: true
                },
                {
                    name: "channel",
                    description: "Sélectionnez un channel pour envoyer le giveaway.",
                    type: "CHANNEL",
                    channelTypes: ["GUILD_TEXT"]
                }
            ]
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
                            value: "end"
                        },
                        {
                            name: "pause",
                            value: "pause"
                        },
                        {
                            name: "unpause",
                            value: "unpause"
                        },
                        {
                            name: "reroll",
                            value: "reroll"
                        },
                        {
                            name: "delete",
                            value: "delete"
                        },
                    ]
                }
            ]
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        const { options } = interaction;

        const Sub = options.getSubcommand();
        
        const errorEmbed = new MessageEmbed()
        .setColor("RED");

        const successEmbed = new MessageEmbed()
        .setcolor("GREEN");

        switch(Sub) {
            case "start" : {

            }
            break;

            case "actions" : {
                const choices = options.getString("options");
                
                switch(choices){

                }
            }
            break;
        }
    }
}