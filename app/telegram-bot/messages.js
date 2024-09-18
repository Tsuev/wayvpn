const messages = {
  profile: (id, subscriptionState) => {
    return `🆔 ○ Пользователь: ${id}\n\n💳 Подписка: ${
      subscriptionState ? "активна" : "неактивна"
    }`;
  },
  keys: (key) => {
    return key
      ? `🔐 Ваш ключ:\n\n${key}\n\nСкопируйте и вставьте в приложение\n\n📱<a href='https://apps.apple.com/us/app/streisand/id6450534064'>IOS</a>\n\n📱<a href='https://play.google.com/store/apps/details?id=app.hiddify.com&hl=en_US'>Android</a>`
      : "🔐 У вас нет приобретенных ключей для активации(";
  },
  help: () => {
    return `Пожалуйста, напишите сообщение в чат поддержки\n\n<a href='https://t.me/WAYVPNTECH'>Техподдержка</a>`;
  },
  subscription: (subscriptionState) => {
    return `🔁 Выберите длительность подписки\n\n🚀 <b>Самый популярный выбор 1100 рублей/мес.</b>`;
  },
};

export default messages;
