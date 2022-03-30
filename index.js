const { Client, Collection } = require("discord.js");
const { Token } = require("./config.json");
const client = new Client({intents: 32767});
const { promisify } = require('util');
const { glob } = require("glob");
const PG = promisify(glob);


client.commands = new Collection(); // 

require("./Handlers/Events")(client);
require("./Handlers/Commands")(client);


client.login(Token).then(() => {
    console.log("Client connecté en tant que " + client.user.tag)
}).catch((err) => {
    console.log(err)
});