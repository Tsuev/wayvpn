import supabase from "../plugins/supabase.js";

const createClient = async (order_id, tg_id, last_at, vpn_key) => {
  try {
    const { data, error } = await supabase
      .from("clients")
      .insert([
        {
          order_id,
          tg_id,
          last_at,
          subscription: true,
          vpn_key,
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
