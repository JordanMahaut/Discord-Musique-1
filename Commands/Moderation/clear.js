const { CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: "clear",
    description: "Supprime un nombre spécifié de messages d'un canal ou d'une cible.",
    permission: "MANAGE_MESSAGES",
    options: [
        {
            name: "amount",
            description: "Sélectionnez la quantité de messages à supprimer d'un canal ou d'une cible.",
            type: "NUMBER",
            required: true
        },
        {
            name: "target",
            description: "Sélectionnez une cible pour effacer ses messages",
            type: "USER",
            required: "false"
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { channel, options } = interaction;

        const Amount = options.getNumber("amount");
        const Target = options.getMember("target");

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
        .setColor("LUMINOUS_VIVID_PINK");

        if(Target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if(m.author.id === Target.id && Amount > i) {
                    filtered.push(m);
                    i++;
                }
            })

            await channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription(`🌪 Effacé ${messages.size} messages de ${Target}.`);
                interaction.reply({embeds: [Response]});
            })
        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                Response.setDescription(`🌪 Effacé ${messages.size} messages du channel.`);
                interaction.reply({embeds: [Response]});
            })
        }
    }
}