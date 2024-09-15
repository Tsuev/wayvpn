import scenarios from "./scenarios.js";

function events(bot) {
  try {
    bot.on("polling_error", (error) => scenarios.error(bot, error));

    bot.onText("/start", (msg) => scenarios.start(bot, msg));

    bot.on("callback_query", async (msg) => scenarios[msg.data](bot, msg));
  } catch (error) {
    scenarios.error(bot, error);
  }
}

export default events;
