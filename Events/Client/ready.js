const { Client } = require("discord.js");
const mongosse = require("mongoose");
const { Database } = require("../../Structures/config.json");

module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client 
     */
    execute(client) {
        console.log("Le client est maintenant prêt !")
        client.user.setActivity(" Coder un bot musique ", {type: "PLAYING"})

        if(!Database) return;
        mongosse.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Le client est maintenant connecté à la base de donnée !")
        }).catch(() => {
            console.log(err)
        })
    }
}