const createVPNkey = (id, tg_id) => {
  return `vless://${id}@${process.env.VPN_CONNECT_URL}?type=tcp&security=reality&pbk=vjf7YHt7y0TsSnXUR78dTT0hEhzhXfRjljngxzSiuWM&fp=chrome&sni=yahoo.com&sid=fb&spx=%2F&flow=xtls-rprx-vision#WAYVPN-${tg_id}`;
};

export default createVPNkey;
