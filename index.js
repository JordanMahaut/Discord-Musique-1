const { Client } = require("discord.js");
const client = new Client({intents: 32767});
const { Token } = require("./config.json");

client.once("ready", () => {
  console.log("Je suis connecté !");
  client.user.setActivity("Bonjour !", {type: "WATCHING"})
})

client.login(Token)