const { Client, MessageEmbed } = require("discord.js");
const { connection } = require("mongoose");
require("../../Events/Client/ready");

module.exports = {
    name: "status",
    description: "Affiche l'état de la connexion du client et de la base de données.",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        const Response = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`**Client**: \`🟢 En ligne\` - \`${client.ws.ping}\`\n **Uptime**: <t:${parseInt(client.readyTimestamp / 1000)}:R>\n **Database**: \`${switchTO(connection.readyState)}\``)

        interaction.reply({embeds: [Response]})
    }
}

function switchTO(val) {
    var status = " ";
    switch(val) {
        case 0 : status = `🔴 Déconnecter`
        break;
        case 1 : status = `🟢 Connecter`
        break;
        case 2 : status = `🟠 Connexion`
        break;
        case 3 : status = `🟣 Déconnexion`
        break;
    }
    return status;
}