import { v4 as uuidv4 } from "uuid";
import yooKassa from "../plugins/yookassa.js";

const createSubscription = async (value) => {
  try {
    const response = await yooKassa.createPayment(value, uuidv4());
    return response;
  } catch (error) {
    console.error(error);
  }
};

const checkPayment = async (payment_id) => {
  try {
    const response = await yooKassa.checkPayment(payment_id);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export { createSubscription, checkPayment };
