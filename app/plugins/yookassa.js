import YooKassa from "yookassa";
import { config } from "dotenv";

config();

const yooKassa = new YooKassa({
  shopId: process.env.TEST_YOOKASSA_SHOP_ID,
  secretKey: process.env.TEST_YOOKASSA_API_KEY,
});

export default yooKassa;
