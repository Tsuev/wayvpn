import {
  addClient,
  getClients,
  getClient,
  updateClient,
} from "../plugins/x-ui.js";

const addVPNClient = async (id, username, time, tgId) => {
  const response = await addClient(id, username, time, tgId);
  return response;
};

const getVPNclients = async () => {
  const clients = await getClients();
  return clients;
};

const getVPNclient = async (id) => {
  const client = await getClient(id);
  return client;
};

const updateVPNclient = async (id, username, expiryTime, tgId) => {
  const response = await updateClient(id, username, expiryTime, tgId);
  return response;
};

export { addVPNClient, getVPNclients, getVPNclient, updateVPNclient };
