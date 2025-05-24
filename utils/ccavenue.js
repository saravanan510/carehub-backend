const crypto = require("crypto");
const qs = require("qs");

const workingKey = "25CFD50721B99CDC8A7D5B9130C53F7E";

function encryptRequest(data) {
  const iv = Buffer.from([
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
    0x0c, 0x0d, 0x0e, 0x0f,
  ]);
  const cipher = crypto.createCipheriv(
    "aes-128-cbc",
    Buffer.from(workingKey, "utf-8"),
    iv
  );
  let encrypted = cipher.update(data, "utf-8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
}

function decryptResponse(encryptedData) {
  const iv = Buffer.from([
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
    0x0c, 0x0d, 0x0e, 0x0f,
  ]);
  const decipher = crypto.createDecipheriv(
    "aes-128-cbc",
    Buffer.from(workingKey, "utf-8"),
    iv
  );
  let decrypted = decipher.update(encryptedData, "base64", "utf-8");
  decrypted += decipher.final("utf-8");
  return qs.parse(decrypted);
}

module.exports = { encryptRequest, decryptResponse };
