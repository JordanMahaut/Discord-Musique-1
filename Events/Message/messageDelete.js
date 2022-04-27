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
      url: "https://discord.com/api/webhooks/961673720785682442/173GmCjW__LhU5VWXZpzXzymWyIZc30Ek6rCS34Zo0W-dvchfKqBZj60NAqeX2Hw0uhZ",
    })
      .send({ embeds: [Log] })
      .catch((err) => {
        console.log(err);
      });
  },
};
