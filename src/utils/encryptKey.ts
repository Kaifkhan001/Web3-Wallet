import CryptoJS from 'crypto-js';


export default async function encryptKey(text: string, password: string){
    const ciphertext = CryptoJS.AES.encrypt(text, password).toString();
    return ciphertext;
}


export async function decryptKey(ciphertext: string, password: string){
   const bytes = CryptoJS.AES.decrypt(ciphertext, password);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);

  return decrypted;
}