const keyboard = {
  menu: () => ({
    reply_markup: {
      inline_keyboard: [
        [{ text: "Мои ключи ○ 🔐", callback_data: "keys" }],
        [
          { text: "Купить/продилить подписку ○ 💳", callback_data: "buy" },
          { text: "Помощь ○ 🆘", callback_data: "help" },
        ],
      ],
    },
  }),
  keys: () => ({}),
};
