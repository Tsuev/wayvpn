import price from "../constants/price.js";

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
            {
              text: `${price.bronze} руб. / 1 мес. 🥉`,
              callback_data: price.bronze,
            },
          ],
          [
            {
              text: `${price.silver} руб. / 3 мес. 🥈`,
              callback_data: price.silver,
            },
          ],
          [
            {
              text: `${price.gold} руб. / 6 мес. 🥇`,
              callback_data: price.gold,
            },
          ],
          [
            {
              text: `${price.diamond} руб. / 12 мес. 💎`,
              callback_data: price.diamond,
            },
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
