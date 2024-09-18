import { URLSearchParams } from "url";

const urlencoded = new URLSearchParams();
const [username, password] = process.env.AUTH_DATA.split(":");

urlencoded.append("username", username);
urlencoded.append("password", password);

const URL = process.env.VPN_URL;

const login = async () => {
  try {
    const response = await fetch(`${URL}/wayvpn/login`, {
      body: urlencoded,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const authCookie = response.headers
      .get("set-cookie")
      .split("HttpOnly, ")[1];

    return authCookie;
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
};

const addClient = async (id, username, expiryTime, tgId) => {
  try {
    const cookies = await login();

    const data = new FormData();
    data.append("id", 1);
    data.append(
      "settings",
      JSON.stringify({
        clients: [
          {
            id,
            alterId: 0,
            email: username,
            limitIp: 2,
            totalGB: 0,
            expiryTime,
            enable: true,
            tgId,
            subId: "",
            flow: "xtls-rprx-vision",
          },
        ],
      })
    );

    const response = await fetch(`${URL}/wayvpn/panel/inbound/addClient`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Cookie: cookies,
      },
      redirect: "follow",
      body: data,
    });

    const resParse = await response.json();

    return resParse;
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
};

addClient("erg34g3bgre3be", "egerg0", 1729262471201, 335435);

export { addClient };
