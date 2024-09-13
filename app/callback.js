import bot from "./app/bot.js";

bot.on("callback_query", async (ctx) => {
  try {
    console.log(ctx);
  } catch (error) {
    console.log(error);
  }
});
