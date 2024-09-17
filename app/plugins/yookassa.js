import fetch from "node-fetch";
import { config } from "dotenv";
import { v4 as uuidv4 } from "uuid";

config({ path: "../../.env" });

const secretKey = process.env.TEST_YOOKASSA_API_KEY;
const shopId = process.env.TEST_YOOKASSA_SHOP_ID;
const url = process.env.YOOKASSA_URL;
const return_url = process.env.BOT_URL;

const yooKassa = {
  createPayment: async (value, uuidv4) => {
    const paymentData = {
      amount: {
        value,
        currency: "RUB",
      },
      capture: true,
      confirmation: {
        type: "redirect",
        return_url,
      },
      description: "Оплата подписки",
      metadata: {
        order_id: uuidv4,
      },
      save_payment_method: true,
    };

    const headers = {
      "Content-Type": "application/json",
      "Idempotence-Key": uuidv4,
      Authorization:
        "Basic " + Buffer.from(`${shopId}:${secretKey}`).toString("base64"),
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(paymentData),
      });

      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  },
  checkPayment: async (payment_id) => {
    const headers = {
      Authorization:
        "Basic " + Buffer.from(`${shopId}:${secretKey}`).toString("base64"),
    };

    try {
      const response = await fetch(`${url}/${payment_id}`, {
        method: "GET",
        headers,
      });

      const paymentData = await response.json();

      return paymentData;
    } catch (error) {
      console.log("Error:", error);
    }
  },
};

(async () => {
  try {
    const response = await yooKassa.createPayment(100, uuidv4());
    const intervalId = setInterval(async () => {
      const payment = await yooKassa.checkPayment(response.id);
      if (payment.status === "succeeded") {
        console.log(payment);
        clearInterval(intervalId);
      }
    }, 1000);

    console.log(response);
  } catch (error) {
    console.error(error);
  }
})();

export default yooKassa;
