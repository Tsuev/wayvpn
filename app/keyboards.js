const keyboard = {
  menu: () => ({
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Профиль ● 🥷", callback_data: "profile" },
          { text: "Мой ключ ● 🔐", callback_data: "keys" },
        ],
        [
          { text: "Подписка ● 💳", callback_data: "subscription" },
          { text: "Помощь ● 🆘", callback_data: "help" },
        ],
      ],
    },
  }),
  back: () => ({
    reply_markup: {
      inline_keyboard: [[{ text: "Назад ● 🔙", callback_data: "back" }]],
    },
  }),
  subscription: () => ({
    reply_markup: {
      inline_keyboard: [[{ text: "Назад ● 🔙", callback_data: "back" }]],
    },
  }),
  expample: () => ({}),
};

export default keyboard;
