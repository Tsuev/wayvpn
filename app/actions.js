import bot from "./bot.js";
import messages from "./messages.js";
import keyboards from "./keyboards.js";

export default {
  profile: (msg) => {
    bot.deleteMessage(msg.from.id, msg.message.message_id);
    bot.sendMessage(
      msg.from.id,
      messages.profile(msg.from.id, true),
      keyboards.back()
    );
  },
  keys: (msg) => {
    bot.deleteMessage(msg.from.id, msg.message.message_id);
    bot.sendMessage(
      msg.from.id,
      messages.keys(
        "<pre>vless://0c5d96e2-f258-4136-932d-4136-932d-4136-932d-4136-932d-4136-932d</pre>"
      ),
      {
        ...keyboards.back(),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }
    );
  },
  subscription: (msg) => {
    bot.deleteMessage(msg.from.id, msg.message.message_id);
    bot.sendMessage(msg.from.id, messages.subscription(), keyboards.back());
  },
  help: (msg) => {
    bot.deleteMessage(msg.from.id, msg.message.message_id);
    bot.sendMessage(msg.from.id, messages.help(), {
      ...keyboards.back(),
      parse_mode: "HTML",
    });
  },
  back: (msg) => {
    bot.deleteMessage(msg.from.id, msg.message.message_id);
    bot.sendPhoto(msg.from.id, "Главное меню", keyboards.menu());
  },
};
