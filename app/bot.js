import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";

config();

const bot = new TelegramBot(process.env.API_KEY_BOT, {
  polling: true,
});

bot.on("polling_error", (error) => console.log(error));

export default bot;
