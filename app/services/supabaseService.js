import supabase from "../plugins/supabase.js";

const createClient = async (order_id, tg_id, left_time, vpn_key, tarif) => {
  try {
    const { data, error } = await supabase
      .from("clients")
      .insert([
        {
          tg_id,
          tarif,
          vpn_key,
          order_id,
          left_time,
        },
      ])
      .select();

    if (error) throw new Error(JSON.stringify(error));

    return data;
  } catch (error) {
    console.error(error);
  }
};

const getClient = async (tg_id) => {
  try {
    const { data, error } = await supabase
      .from("clients")
      .select()
      .eq("tg_id", tg_id);

    if (error) throw new Error(error);

    return data;
  } catch (error) {
    console.error(error);
  }
};

const resetExpiredLeftTimeAndSubscription = async (usersNotification) => {
  const currentTime = Date.now();

  const { data, error } = await supabase
    .from("clients")
    .select()
    .lt("left_time", currentTime);

  if (data && data.length > 0) {
    await usersNotification(data);
  }

  await supabase
    .from("clients")
    .update({
      left_time: 0,
      subscription: false,
    })
    .lt("left_time", currentTime);

  if (error) {
    console.error("Ошибка при обновлении записей:", error);
    return;
  }
};

export { createClient, getClient, resetExpiredLeftTimeAndSubscription };
