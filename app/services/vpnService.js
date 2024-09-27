import { addClient, getClients, getClient } from "../plugins/x-ui.js";

const addVPNClient = async (id, username, time, tgId) => {
  const response = await addClient(id, username, time, tgId);
  return response;
};

const getVPNclients = async () => {
  await getClients();
};

const getVPNclient = async (id) => {
  const client = await getClient(id);
  return client;
};

export { addVPNClient, getVPNclients, getVPNclient };
