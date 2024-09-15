import bot from "../plugins/telegram-bot.js";
import events from "./events.js";

const startBot = () => events(bot);

export default startBot;
