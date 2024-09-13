import bot from "./app/bot.js";
import keyboards from "./app/keyboards.js";
import scenarios from "./app/scenarios.js";

bot.onText(/\/start/, (msg) => {
  bot.setMyCommands([{ command: "start", description: "Главное меню" }]);
  bot.sendPhoto(msg.chat.id, "./assets/ad.jpg", keyboards.menu());
});

bot.on("callback_query", async (msg) => {
  try {
    scenarios(msg);
  } catch (error) {
    bot.sendMessage(msg.from.id, error);
  }
});
