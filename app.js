import bot from "./app/bot.js";

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Определяем inline-клавиатуру
  const inlineKeyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Кнопка 1", callback_data: "button1" },
          { text: "Кнопка 2", callback_data: "button2" },
        ],
        [{ text: "Кнопка 3", callback_data: "button3" }],
      ],
    },
  };

  // Отправляем сообщение с inline-клавиатурой
  bot.sendMessage(chatId, "Выберите одну из опций:", inlineKeyboard);
});

bot.on("callback_query", (callbackQuery) => {
  const msg = callbackQuery.message;
  const data = callbackQuery.data;

  if (data === "button1") {
    bot.sendMessage(msg.chat.id, "Вы нажали на Кнопку 1");
  } else if (data === "button2") {
    bot.sendMessage(msg.chat.id, "Вы нажали на Кнопку 2");
  } else if (data === "button3") {
    bot.sendMessage(msg.chat.id, "Вы нажали на Кнопку 3");
  }

  // Ответ на callback, чтобы убрать "крутилку" на кнопке
  bot.answerCallbackQuery(callbackQuery.id);
});
