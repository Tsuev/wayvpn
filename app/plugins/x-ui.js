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

const getClients = async () => {
  try {
    const cookies = await login();

    const response = await fetch(`${URL}/wayvpn/panel/api/inbounds/get/1`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie: cookies,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const resParse = await response.json();
    const { clients } = JSON.parse(resParse.obj.settings);

    return clients;
  } catch (error) {
    console.error("Error fetching client:", error);
  }
};

const getClient = async (id) => {
  try {
    const clients = await getClients();
    const client = clients.find((client) => client.id === id);

    return client;
  } catch (error) {
    console.error("Error fetching client:", error);
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

const updateClient = async (id, username, expiryTime, tgId) => {
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
            flow: "xtls-rprx-vision",
            email: username,
            limitIp: 2,
            totalGB: 0,
            expiryTime,
            enable: true,
            tgId,
            subId: "",
            reset: 0,
          },
        ],
      })
    );

    const response = await fetch(
      `${URL}/wayvpn/panel/inbound/updateClient/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Cookie: cookies,
        },
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const resJson = await response.json();

    return resJson;
  } catch (error) {
    console.log(error);
  }
};

updateClient(
  "2e8ca251-000f-5000-a000-1fad8c5df865",
  "344486749",
  1757417139312,
  344486749
);

export { addClient, getClients, getClient, updateClient };
