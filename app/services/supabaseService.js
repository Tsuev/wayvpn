import supabase from "../plugins/supabase.js";
import getSubscribeTime from "../helpers/getSubscribeTime.js";

const createClient = async (order_id, tg_id, left_time, vpn_key) => {
  try {
    console.log(last_at);

    const { data, error } = await supabase
      .from("clients")
      .insert([
        {
          order_id,
          tg_id,
          left_time,
          vpn_key,
          subscription: true,
        },
      ])
      .select();

    if (error) throw new Error(JSON.stringify(error));

    return data;
  } catch (error) {
    console.error(error);
  }
};

export { createClient };
