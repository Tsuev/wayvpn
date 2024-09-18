import { addClient } from "../plugins/x-ui.js";

const addVPNClient = async (id, username, time, tgId) => {
  const response = await addClient(id, username, time, tgId);
  return response;
};

const getVPNclient = async (id) => {};

export { addVPNClient };
