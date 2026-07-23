import CryptoJS from "crypto-js";

function getSecret() {
  const secret = process.env.MYNUMBER_SECRET;

  if (!secret) {
    throw new Error("MYNUMBER_SECRET is not set");
  }

  return secret;
}

export function encryptMyNumber(
  value: string,
) {
  return CryptoJS.AES.encrypt(
    value,
    getSecret(),
  ).toString();
}

export function decryptMyNumber(
  value: string,
) {
  return CryptoJS.AES.decrypt(
    value,
    getSecret(),
  ).toString(CryptoJS.enc.Utf8);
}

export function maskMyNumber(
  value: string,
) {
  const normalized = value.replace(/\D/g, "");

  if (normalized.length < 4) {
    return "************";
  }

  return `********${normalized.slice(-4)}`;
}
