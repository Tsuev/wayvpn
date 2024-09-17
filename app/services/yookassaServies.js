import { v4 as uuidv4 } from "uuid"; // Для генерации уникального идентификатора
import yooKassa from "../plugins/yookassa.js";

const createSubscription = async (value) => {
  try {
    const response = await yooKassa.createPayment(100, uuidv4());

    const intervalId = setInterval(async () => {
      const payment = await yooKassa.checkPayment(response.id);
      if (payment.status === "succeeded") clearInterval(intervalId);
    }, 1000);

    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export { createSubscription };
