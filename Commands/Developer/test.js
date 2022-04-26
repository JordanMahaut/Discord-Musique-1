module.exports = {
    name: "test",
    description: "Affiche l'état de la connexion du client et de la base de données.",
    permission: "ADMINISTRATOR",
    async execute(interaction, client) {
        await interaction.reply({ content: "Bonjour !"});
    },
};