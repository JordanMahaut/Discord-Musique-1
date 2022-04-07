const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const { crypto_pwhash } = require('libsodium-wrappers');

module.exports = {
    name: "music",
    description: "Système musical complet",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "play",
            description: "Jouer une musique.",
            type: "SUB_COMMAND",
            options: [{ name: "query", description: "Indiquez un nom ou une URL pour la musique", type: "STRING", required: true}]
        },
        {
            name: "volume",
            description: "Changer le volume.",
            type: "SUB_COMMAND",
            options: [{ name: "percent", description: "10 = 10%", type: "NUMBER", required: true}]
        },
        {
            name: "settings",
            description: "Sélectionner dans les options.",
            type: "SUB_COMMAND",
            options: [{ name: "options", description: "Sélectionner dans les options", type: "STRING", required: true,
            choices: [
                {name: "queue", value: "queue"},
                {name: "skip", value: "skip"},
                {name: "pause", value: "pause"},
                {name: "resume", value: "resume"},
                {name: "stop", value: "stop"}
            ]}]
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;

        if(!VoiceChannel)
        return interaction.reply({content: "Vous devez être dans un canal vocal pour pouvoir utiliser les commandes musicales.", ephemeral: true});

        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
        return interaction.reply({content: `Je joue déjà de la musique dans <#${guild.me.voice.channelId}>.`, ephemeral: true});

        try {
            switch(options.getSubcommand()) {
                case "play" : {
                    client.distube.playVoiceChannel( VoiceChannel, options.getString("query"), { textChannel: channel, member: member });
                    return interaction.reply({content: "🎼 Demande reçue."});
                }
                case "volume" : {
                    const Volume = options.getNumber("percent");
                    if(Volume > 100 || Volume < 1)
                    return interaction.reply({content: "Vous devez spécifier un nombre entre 1 et 100."});

                    client.distube.setVolume(VoiceChannel, Volume);
                    return interaction.reply({content: `📶 Le volume a été réglé sur \`${Volume}%\``});
                }
                case "settings" : {
                    const queue = await client.distube.getQueue(VoiceChannel);

                    if(!queue)
                    return interaction.reply({content: "⛔ Il n'y a pas de file d'attente."});

                    switch(options.getString("options")) {
                        case "skip" :
                        await queue.skip(VoiceChannel);
                        return interaction.reply({content: "⏭️ La musique a été skip."})
                        case "stop" :
                        await queue.stop(VoiceChannel);
                        return interaction.reply({content: "⏭️ La musique a été stopper."})
                        case "pause" :
                        await queue.pause(VoiceChannel);
                        return interaction.reply({content: "⏸️ La musique est en pause."})
                        case "resume" :
                        await queue.resume(VoiceChannel);
                        return interaction.reply({content: "▶️ La musique a repris."})
                        case "queue" :
                        return interaction.reply({embeds: [new MessageEmbed()
                        .setColor("PURPLE")
                        .setDescription(`${queue.songs.map(
                            (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`
                        )]})
                    }
                    return;
                }
            }
         } catch (e) {
            const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`⛔ Alert : ${e}`)
            return interaction.reply({embeds: [errorEmbed]});
        }
    }
}