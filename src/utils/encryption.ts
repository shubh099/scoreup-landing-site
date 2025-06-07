
import CryptoJS from 'crypto-js';

// Note: In Lovable, there are no .env files. You'll need to replace these with your actual values
// or implement a way for users to input them in the frontend
const ORIGINAL_KEY = "your-encryption-key-here"; // Replace with your actual key
const AES_IV = "your-aes-iv-here"; // Replace with your actual IV

const padKeyTo256Bits = (key: string) => {
  const paddedKey = key.padEnd(32, key);
  return paddedKey.slice(0, 32);
};

const expandKeyTo256Bits = (key: string) => {
  const paddedKey = key.repeat(8);
  return paddedKey.slice(0, 32);
};

export const encryptData = (data: any) => {
  try {
    const expandedKey = padKeyTo256Bits(ORIGINAL_KEY);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJS.enc.Utf8.parse(expandedKey), {
      iv: CryptoJS.enc.Utf8.parse(AES_IV),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
    return encrypted;
  } catch (error) {
    console.error('Error encrypting data:', error);
    return null;
  }
};

export const decryptData = (encryptedData: string) => {
  try {
    const expandedKey = expandKeyTo256Bits(ORIGINAL_KEY);
    const decrypted = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Utf8.parse(expandedKey), {
      iv: CryptoJS.enc.Utf8.parse(AES_IV),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error('Error decrypting data:', error);
    return null;
  }
};
