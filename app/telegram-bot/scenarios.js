import messages from "./messages.js";
import keyboards from "./keyboards.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

import {
  createSubscription,
  checkPayment,
} from "../services/yookassaServies.js";

import {
  createClient,
  getClient,
  updateClient,
} from "../services/supabaseService.js";
import { addVPNClient, updateVPNclient } from "../services/vpnService.js";
import { setSubscribeTime, getLeftTime } from "../helpers/getSubscribeTime.js";
import createVPNkey from "../helpers/createVPNkey.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scenarios = {
  profile: async (bot, msg) => {
    if (msg.message.message_id) {
      await bot.deleteMessage(msg.from.id, msg.message.message_id);
    }
    const [clientData] = await getClient(msg.from.id);
    await bot.sendMessage(
      msg.from.id,
      messages.profile(msg.from.id, clientData?.subscription),
      {
        ...keyboards.back(),
        parse_mode: "HTML",
      }
    );
  },
  keys: async (bot, msg, key, time) => {
    if (msg.message.message_id) {
      await bot.deleteMessage(msg.from.id, msg.message.message_id);
    }

    const [clientData] = await getClient(msg.from.id);

    await bot.sendMessage(
      msg.from.id,
      messages.keys(
        clientData?.vpn_key || key,
        getLeftTime(clientData?.left_time || time)
      ),
      {
        ...keyboards.back(),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }
    );
  },
  subscription: async (bot, msg) => {
    const [clientData] = await getClient(msg.from.id);

    if (clientData?.subscription) {
      scenarios.keys(bot, msg);
      return;
    }
    if (msg.message.message_id) {
      await bot.deleteMessage(msg.from.id, msg.message.message_id);
    }
    bot.sendPhoto(
      msg.from.id,
      fs.createReadStream(path.join(__dirname, "../../assets/price.png")),
      {
        ...keyboards.price(clientData?.subscription),
        caption: messages.subscription(clientData?.subscription),
        parse_mode: "HTML",
      }
    );
  },
  help: (bot, msg) => {
    if (msg.message.message_id) {
      bot.deleteMessage(msg.from.id, msg.message.message_id);
    }
    bot.sendMessage(msg.from.id, messages.help(), {
      ...keyboards.back(),
      parse_mode: "HTML",
    });
  },
  back: (bot, msg) => {
    if (msg?.message?.message_id) {
      bot.deleteMessage(msg.from.id, msg.message.message_id);
    }
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
  10: (bot, msg) => payment(bot, msg, 1),
  540: (bot, msg) => payment(bot, msg, 3),
  1100: (bot, msg) => payment(bot, msg, 6),
  2000: (bot, msg) => payment(bot, msg, 12),
};

async function payment(bot, msg, months) {
  try {
    const time = setSubscribeTime(months);

    const paymentLoadMessage = await bot.sendMessage(
      msg.from.id,
      "⌛ Загрузка..."
    );

    const payData = await createSubscription(+msg.data);
    const paymentLinkMessage = await bot.sendMessage(
      msg.from.id,
      `<a href="${payData.confirmation.confirmation_url}"><b>Ссылка на оплату подписки</b></a>`,
      { parse_mode: "HTML" }
    );

    const trackPayment = async (payData) => {
      return new Promise((resolve, reject) => {
        const intervalId = setInterval(async () => {
          const updatedPayData = await checkPayment(payData.id);

          if (updatedPayData.status === "succeeded") {
            if (
              paymentLoadMessage.message_id &&
              paymentLinkMessage.message_id
            ) {
              await bot.deleteMessage(
                msg.from.id,
                paymentLoadMessage.message_id
              );
              await bot.deleteMessage(
                msg.from.id,
                paymentLinkMessage.message_id
              );
            }

            await bot.sendMessage(msg.from.id, "✅ Оплата прошла успешно!");
            clearInterval(intervalId);
            resolve(updatedPayData);
          }

          if (updatedPayData.status === "canceled") {
            clearInterval(intervalId);
            if (
              paymentLoadMessage.message_id &&
              paymentLinkMessage.message_id
            ) {
              await bot.deleteMessage(
                msg.from.id,
                paymentLoadMessage.message_id
              );
              await bot.deleteMessage(
                msg.from.id,
                paymentLinkMessage.message_id
              );
            }
            await bot.sendMessage(msg.from.id, "❌ Оплата отменена");
            scenarios.start(bot, msg);
            reject(new Error("Payment was canceled"));
          }
        }, 2000);
      });
    };

    const completedPayData = await trackPayment(payData);
    const existClient = await getClient(msg.from.id);
    if (existClient.length) {
      const [client] = existClient;

      await updateVPNclient(
        client.order_id,
        String(msg.from.id),
        time,
        msg.from.id
      );
      await updateClient(msg.from.id, time);
      await bot.sendMessage(msg.from.id, "🎉 Подписка обновлена!");
      scenarios.start(bot, msg);
      return;
    }
    scenarios.keys(
      bot,
      msg,
      createVPNkey(completedPayData.id, msg.from.id),
      time
    );

    await addVPNClient(
      completedPayData.id,
      String(msg.from.id),
      time,
      msg.from.id
    );

    await createClient(
      completedPayData.payment_method.id,
      msg.from.id,
      time,
      createVPNkey(completedPayData.id, msg.from.id),
      msg.data
    );
  } catch (error) {
    bot.sendMessage(
      msg.from.id,
      "Возникла какая-то ошибка\n\n❌ Произошла ошибка при попытке оплаты\n\nПроверьте ключ, в случае проблемы напишите в тех.поддержку" +
        "\n\n\n" +
        error.message,
      error
    );
    console.error("Ошибка:", error.message);
  }
}

export default scenarios;
