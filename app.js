import bot from "./app/bot.js";
import keyboards from "./app/keyboards.js";
import messages from "./app/messages.js";

bot.onText(/\/start/, (msg) => {
  bot.setMyCommands([{ command: "start", description: "Главное меню" }]);
  bot.sendPhoto(msg.chat.id, "./assets/ad.jpg", keyboards.menu());
});

bot.on("callback_query", async (msg) => {
  try {
    switch (msg.data) {
      case "profile":
        bot.deleteMessage(msg.from.id, msg.message.message_id);
        bot.sendMessage(
          msg.from.id,
          messages.profile(msg.from.id, true),
          keyboards.back()
        );
        break;
      case "keys":
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
        break;
      case "subscription":
        bot.deleteMessage(msg.from.id, msg.message.message_id);
        bot.sendMessage(msg.from.id, messages.subscription(), keyboards.back());
        break;
      case "help":
        bot.deleteMessage(msg.from.id, msg.message.message_id);
        bot.sendMessage(msg.from.id, messages.help(), {
          ...keyboards.back(),
          parse_mode: "HTML",
        });
        break;
      case "back":
        bot.deleteMessage(msg.from.id, msg.message.message_id);
        bot.sendPhoto(msg.from.id, "./assets/ad.jpg", keyboards.menu());
        break;
    }
  } catch (error) {
    bot.sendMessage(msg.from.id, error);
  }
});
// {
//   id: '1479559321806171538',
//   from: {
//     id: 344486749,
//     is_bot: false,
//     first_name: 'Qari',
//     username: 'Qarimansur',
//     language_code: 'ru',
//     is_premium: true
//   },
//   message: {
//     message_id: 86,
//     from: {
//       id: 6717057446,
//       is_bot: true,
//       first_name: 'WAYVPN',
//       username: 'wayvpn95_bot'
//     },
//     chat: {
//       id: 344486749,
//       first_name: 'Qari',
//       username: 'Qarimansur',
//       type: 'private'
//     },
//     date: 1726230650,
//     photo: [ [Object], [Object], [Object], [Object], [Object] ],
//     reply_markup: { inline_keyboard: [Array] }
//   },
//   chat_instance: '-6161257785179600578',
//   data: 'keys'
// }
