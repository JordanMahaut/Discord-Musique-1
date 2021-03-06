const {
  MessageEmbed,
  Message,
  WebhookClient,
  NewsChannel,
} = require("discord.js");

module.exports = {
  name: "messageDelete",
  /**
   *
   * @param {Message} message
   */
  execute(message) {
    if (message.author.bot) return;

    const Log = new MessageEmbed().setColor("#36393f").setDescription(
      `📕 Un [message](${message.url}) de ${
        message.author.tag
      } a été **supprimer**.\n
        **Message supprimé:**\n ${
          message.content ? message.content : "None"
        }`.slice(0, 4000)
    );

    if (message.attachments.size >= 1) {
      Log.addField(
        `Attachments:`,
        `${message.attachments.map((a) => a.url)}`,
        true
      );
    }

    new WebhookClient({
      url: "https://discord.com/api/webhooks/959207329386082334/t8jE7xpJRMUR2H8TROC3ITKXMZfC1y1oHkl4BsvT_ip2Dn3LfkGvd7MXXkT0OkkovJvr",
    })
      .send({ embeds: [Log] })
      .catch((err) => {
        console.log(err);
      });
  },
};
