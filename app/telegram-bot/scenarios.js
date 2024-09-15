import messages from "./messages.js";
import keyboards from "./keyboards.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  profile: (bot, msg) => {
    bot.deleteMessage(msg.from.id, msg.message.message_id);
    bot.sendMessage(
      msg.from.id,
      messages.profile(msg.from.id, true),
      keyboards.back()
    );
  },
  keys: (bot, msg) => {
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
  subscription: (bot, msg) => {
    bot.deleteMessage(msg.from.id, msg.message.message_id);
    bot.sendMessage(msg.from.id, messages.subscription(), keyboards.back());
  },
  help: (bot, msg) => {
    bot.deleteMessage(msg.from.id, msg.message.message_id);
    bot.sendMessage(msg.from.id, messages.help(), {
      ...keyboards.back(),
      parse_mode: "HTML",
    });
  },
  back: (bot, msg) => {
    bot.deleteMessage(msg.from.id, msg.message.message_id);
    bot.sendPhoto(
      msg.from.id,
      fs.createReadStream(path.join(__dirname, "../../assets/ad.jpg")),
      keyboards.menu()
    );
  },
  start: (bot, msg) => {
    bot.setMyCommands([{ command: "start", description: "Главное меню" }]);
    bot.sendPhoto(
      msg.chat.id,
      fs.createReadStream(path.join(__dirname, "../../assets/ad.jpg")),
      keyboards.menu()
    );
  },
  error: (bot, msg) => {
    bot.sendMessage(process.env.ADMIN_ID, msg);
  },
};
