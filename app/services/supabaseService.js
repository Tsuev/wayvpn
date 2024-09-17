import supabase from "../plugins/supabase.js";

const createClient = async () => {
  try {
    const { data, error } = await supabase
      .from("clients")
      .insert([
        {
          order_id: 123,
          tg_id: 456,
          subscription: true,
          last_at: new Date(), // Timestamp
        },
      ])
      .select();
  } catch (error) {
    console.error(error);
  }
};
