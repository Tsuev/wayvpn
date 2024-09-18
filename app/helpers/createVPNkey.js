import QRCode from "qrcode";

const createQRCode = async (id, group_name, username) => {
  const key = `vless://${id}@5.39.217.141:443?type=tcp&security=reality&pbk=vjf7YHt7y0TsSnXUR78dTT0hEhzhXfRjljngxzSiuWM&fp=chrome&sni=yahoo.com&sid=fb&spx=%2F&flow=xtls-rprx-vision#${group_name}-${username}`;

  try {
    const qrCode = await QRCode.toBuffer(key, { errorCorrectionLevel: "H" });
    return { qrCode, key };
  } catch (err) {
    throw new Error("Ошибка при генерации QR-кода: " + err);
  }
};

export default createQRCode;
