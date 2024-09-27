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
  price: (subscriptionState) => {
    const pricesKeyboard = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "200 руб. / 1 мес. 🥉", callback_data: 200 },
            { text: "540 руб. / 3 мес. 🥈", callback_data: 540 },
          ],
          [
            { text: "1100 руб. / 6 мес. 🥇", callback_data: 1100 },
            { text: "2000 руб. / 12 мес. 💎", callback_data: 2000 },
          ],
          [{ text: "Назад ● 🔙", callback_data: "back" }],
        ],
      },
    };
    const deleteAutopayKeyboard = {
      reply_markup: {
        inline_keyboard: [[{ text: "Назад ● 🔙", callback_data: "back" }]],
      },
    };

    return subscriptionState ? deleteAutopayKeyboard : pricesKeyboard;
  },
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
};

export default keyboard;
