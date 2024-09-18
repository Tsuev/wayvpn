import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(process.env.API_KEY_BOT, {
  polling: true,
});

export default bot;
