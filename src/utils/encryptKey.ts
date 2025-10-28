import CryptoJS from 'crypto-js';


export default function encryptKey(text: string, password: string){
    const ciphertext = CryptoJS.AES.encrypt(text, password).toString();
    return ciphertext;
}


export function decryptKey(ciphertext: string, password: string){
  console.log("Data coming:- ", ciphertext, password);
   const bytes = CryptoJS.AES.decrypt(ciphertext, password);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  console.log("Decrpyt in function:- ", decrypted);

  return decrypted;
}