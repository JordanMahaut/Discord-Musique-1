const client = require("../../Structures/index");
const { MessageEmbed } = require("discord.js");

const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
    .on('playSong', (queue, song) => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("GREEN")
    .setDescription(`🎶 | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`)]}
    ))

    .on('addSong', (queue, song) => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("GREEN")
    .setDescription(`🎶 | Ajouter ${song.name} - \`${song.formattedDuration}\` à la file d'attente par ${song.user}`)]}))


    .on('addList', (queue, playlist) => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("GREEN")
    .setDescription(`🎶 | Ajouter \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)]}))

    .on('error', (channel, e) => {
    channel.send({embeds: [new MessageEmbed()
    .setColor("RED")
    .setDescription(`⛔ | Une erreur rencontrée : ${e}`)]})
    })

    .on('empty', channel => channel.send({embeds: [new MessageEmbed()
    .setColor("RED")
    .setDescription(`Le canal vocal est vide ! Quitter le canal...`)]}
    ))

    .on('searchNoResult', (message, query) => message.channel.send({embeds: [new MessageEmbed()
    .setColor("RED")
    .setDescription(` | Aucun résultat trouvé pour \`${query}\`!`)]}
    ))

    .on('finish', queue => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("RED")
    .setDescription(`File d'attente terminée, sortie du canal.`)]}
    ))