import { Keypair } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import bs58 from 'bs58';


export default function CreateSolAccount(mnemonics: string, accountNumber: number){
    const seed = mnemonicToSeedSync(mnemonics);
    const path = `m/44'/501'/${accountNumber}'/0'`; 
    const { key } = derivePath(path, seed.toString('hex'));
    console.log("Key:- ", key);
    const seed32 = key.slice(0,32);
    const kp = Keypair.fromSeed(seed32);
    const publicKey = kp.publicKey.toBase58();
    const secretKeyBase58 = bs58.encode(Buffer.from(kp.secretKey));
    const secretKeyHex = seed32.toString("hex");

    return { publicKey, secretKeyBase58, secretKeyHex };
}