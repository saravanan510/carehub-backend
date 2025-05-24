const crypto = require("crypto");

const getKey = () => {
  let key = Buffer.from(process.env.CCA_WORKING_KEY, "utf8"); // or 'hex' if key is hex
  if (key.length > 16) {
    key = key.slice(0, 16);
  } else if (key.length < 16) {
    const padded = Buffer.alloc(16);
    key.copy(padded);
    key = padded;
  }
  return key;
};

const encrypt = (plainText) => {
  const iv = Buffer.alloc(16, 0); // 16-byte zero IV
  const key = getKey();
  const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
  let encrypted = cipher.update(plainText, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};

const decrypt = (encryptedText) => {
  const iv = Buffer.alloc(16, 0);
  const key = getKey();
  const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
  let decrypted = decipher.update(encryptedText, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

module.exports = { encrypt, decrypt };
