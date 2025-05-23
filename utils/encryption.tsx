import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_SECRET || 'default_secret';

export const encryptData = (data: any): string => {
  const jsonData = JSON.stringify(data);
  return CryptoJS.AES.encrypt(jsonData, SECRET_KEY).toString();
};

export const decryptData = (cipherText: string): any => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedText);
};
