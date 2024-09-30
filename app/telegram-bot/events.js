import scenarios from "./scenarios.js";
import cron from "node-cron";
import { resetExpiredLeftTimeAndSubscription } from "../services/supabaseService.js";

function events(bot) {
  try {
    bot.on("polling_error", (error) => scenarios.error(bot, error));

    bot.onText("/start", (msg) => scenarios.start(bot, msg));

    bot.on("callback_query", async (msg) => scenarios[msg.data](bot, msg));

    cron.schedule("*/5 * * * * *", async () => {
      await resetExpiredLeftTimeAndSubscription(async (clients) => {
        clients.forEach(async (client) => {
          if (client.subscription) {
            await bot.sendMessage(client.tg_id, "🥺 Время подписки истекло...");
          }
        });
      });
    });
  } catch (error) {
    scenarios.error(bot, error);
  }
}

export default events;
