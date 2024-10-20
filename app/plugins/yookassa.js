import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";

const secretKey = process.env.MODE === "test" ? process.env.TEST_YOOKASSA_API_KEY : process.env.YOOKASSA_API_KEY;
const shopId = process.env.MODE === "test" ? process.env.TEST_YOOKASSA_SHOP_ID : process.env.YOOKASSA_SHOP_ID;
const url = process.env.YOOKASSA_URL;
const return_url = process.env.BOT_URL;

const yooKassa = {
  createPayment: async (value) => {
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
      receipt: {
        customer: {
          email: "tsuevjudoka@gmail.com",
        },
        items: [
          {
            description: "Оплата подписки",
            quantity: 1,
            vat_code: 1,
            amount: {
              value,
              currency: "RUB",
            },
          },
        ],
      },
      description: "Оплата подписки",
      metadata: {
        order_id: uuidv4(),
      },
    };

    const headers = {
      "Content-Type": "application/json",
      "Idempotence-Key": uuidv4(),
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
      console.error("Error:", error);
    }
  },
};

export default yooKassa;
