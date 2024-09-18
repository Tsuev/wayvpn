import supabase from "../plugins/supabase.js";

const createClient = async (order_id, tg_id, last_at, vpn_key) => {
  try {
    const data = await supabase
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

    // if (error) throw error;
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

const foo = async () => {
  let data = await supabase.from("clietns").select("*");

  console.log(data);
};

// createClient("test", "test", 10000, "test");
foo();
export { createClient };
