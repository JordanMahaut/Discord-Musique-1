const {
  MessageEmbed,
  Message,
  WebhookClient,
  NewsChannel,
} = require("discord.js");

module.exports = {
  name: "messageUpdate",
  /**
   * @param {Message} oldMessage
   * @param {Message} newMessage
   */
  execute(oldMessage, newMessage) {
    if (oldMessage.author.bot) return;

    if (oldMessage.content === newMessage.content) return;

    const Count = 1950;

    const Original =
      oldMessage.content.slice(0, Count) +
      (oldMessage.content.length > 1950 ? " ..." : "");
    const Edited =
      newMessage.content.slice(0, Count) +
      (newMessage.content.length > 1950 ? " ..." : "");

    const log = new MessageEmbed().setColor("#36393f").setDescription(
      `📘 Un [message](${newMessage.url}) de ${newMessage.author} **a été modifié** dans ${newMessage.channel}.\n
        **Original**:\n ${Original} \n**Modifié**:\n ${Edited}`.slice(
        "0",
        "4096"
      )
    );

    new WebhookClient({
      url: "https://discord.com/api/webhooks/959181948444614800/pVnIy8FIUFvCwMjfLHoklYClmjxHTzNmVvSX-2MYpd7q2S2Eem2gbDsxPtrPPXUBWx_B",
    })
      .send({ embeds: [log] })
      .catch((err) => console.log(err));
  },
};
