import messages from "./messages.js";
import keyboards from "./keyboards.js";
import { fileURLToPath } from "url";
import path, { parse } from "path";
import fs from "fs";

import {
  createSubscription,
  checkPayment,
} from "../services/yookassaServies.js";
import { createClient } from "../services/supabaseService.js";
import { addVPNClient } from "../services/vpnService.js";
import getSubscribeTime from "../helpers/getSubscribeTime.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  profile: (bot, msg) => {
    bot.deleteMessage(msg.from.id, msg.message.message_id);
    bot.sendMessage(
      msg.from.id,
      messages.profile(msg.from.id, true),
      keyboards.back()
    );
  },
  keys: (bot, msg) => {
    bot.deleteMessage(msg.from.id, msg.message.message_id);
    bot.sendMessage(
      msg.from.id,
      messages.keys(
        "<pre>vless://0c5d96e2-f258-4136-932d-4136-932d-4136-932d-4136-932d-4136-932d</pre>"
      ),
      {
        ...keyboards.back(),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }
    );
  },
  subscription: (bot, msg) => {
    bot.deleteMessage(msg.from.id, msg.message.message_id);
    bot.sendPhoto(
      msg.from.id,
      fs.createReadStream(path.join(__dirname, "../../assets/price.png")),
      {
        ...keyboards.price(),
        caption: messages.subscription(),
        parse_mode: "HTML",
      }
    );
  },
  help: (bot, msg) => {
    bot.deleteMessage(msg.from.id, msg.message.message_id);
    bot.sendMessage(msg.from.id, messages.help(), {
      ...keyboards.back(),
      parse_mode: "HTML",
    });
  },
  back: (bot, msg) => {
    bot.deleteMessage(msg.from.id, msg.message.message_id);
    bot.sendPhoto(
      msg.from.id,
      fs.createReadStream(path.join(__dirname, "../../assets/ad.jpg")),
      keyboards.menu()
    );
  },
  start: (bot, msg) => {
    bot.setMyCommands([{ command: "start", description: "Главное меню" }]);
    bot.sendPhoto(
      msg.from.id,
      fs.createReadStream(path.join(__dirname, "../../assets/ad.jpg")),
      keyboards.menu()
    );
  },
  error: (bot, msg) => {
    bot.sendMessage(process.env.ADMIN_ID, msg);
  },
  200: async (bot, msg) => {
    const time = getSubscribeTime(1);

    try {
      // await bot.deleteMessage(msg.from.id, msg.message.message_id);
      await bot.sendMessage(msg.from.id, "⌛ Загрузка...");

      const payData = await createSubscription(+msg.data);
      await bot.sendMessage(
        msg.from.id,
        `<a href="${payData.confirmation.confirmation_url}"><b>Оплатить подписку</b></a>`,
        { parse_mode: "HTML" }
      );

      const trackPayment = async (payData) => {
        return new Promise((resolve, reject) => {
          const intervalId = setInterval(async () => {
            const updatedPayData = await checkPayment(payData.id);

            if (updatedPayData.status === "succeeded") {
              bot.sendMessage(msg.from.id, "✅ Оплата прошла успешно!");
              bot.sendPhoto(
                msg.from.id,
                fs.createReadStream(
                  path.join(__dirname, "../../assets/ad.jpg")
                ),
                keyboards.menu()
              );
              clearInterval(intervalId);
              resolve(updatedPayData);
            }

            if (updatedPayData.status === "canceled") {
              clearInterval(intervalId);
              bot.sendMessage(msg.from.id, "❌ Оплата отменена");
              bot.sendPhoto(
                msg.from.id,
                fs.createReadStream(
                  path.join(__dirname, "../../assets/ad.jpg")
                ),
                keyboards.menu()
              );
              reject(new Error("Payment was canceled"));
            }
          }, 2000);
        });
      };

      const completedPayData = await trackPayment(payData);

      await addVPNClient(
        completedPayData.id,
        String(msg.from.id),
        time,
        msg.from.id
      );
      await createClient(completedPayData.payment_method.id, msg.from.id, time);
    } catch (error) {
      bot.sendMessage(
        msg.from.id,
        "Возникла какая-то ошибка\n\n❌ Оплата отменена"
      );
      console.error("Ошибка:", error.message);
    }
  },
  540: (bot, msg) => {
    bot.sendMessage(msg.from.id, "Тест");
  },
  1100: (bot, msg) => {
    bot.sendMessage(msg.from.id, "Тест");
  },
  2000: (bot, msg) => {
    bot.sendMessage(msg.from.id, "Тест");
  },
};
