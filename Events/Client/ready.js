const { Client } = require("discord.js")



module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client 
     */
    execute(client) {
        console.log("Le client est maintenant prêt !")
        client.user.setActivity(" Coder un bot musique ", {type: "PLAYING"})
    }
}