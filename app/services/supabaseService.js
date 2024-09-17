import supabase from "../plugins/supabase.js";

const createClient = async (order_id, tg_id, last_at) => {
  try {
    const { data, error } = await supabase
      .from("clients")
      .insert([
        {
          order_id,
          tg_id,
          last_at,
          subscription: true,
        },
      ])
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error);
  }
};

export { createClient };
