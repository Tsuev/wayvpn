import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import { config } from "dotenv";

config({ path: "../../.env" });

const secretKey = process.env.TEST_YOOKASSA_API_KEY;
const shopId = process.env.TEST_YOOKASSA_SHOP_ID;
const url = process.env.YOOKASSA_URL;
const return_url = "https://t.me/wayvpn95_bot";

const yooKassa = async (value) => {
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
};

export default yooKassa;
