import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(process.env.MODE === "test" ? process.env.TEST_API_KEY_BOT : process.env.API_KEY_BOT, {
  polling: true,
});

export default bot;
