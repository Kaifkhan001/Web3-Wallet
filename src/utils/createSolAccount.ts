import { Keypair } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import bs58 from 'bs58';
import { type Chain, type Wallets } from "../context/UseWallet";
import encryptKey from "./encryptKey";
import { setItem } from "./DbInteration";
import { WalletConst } from "./ConstValues";


export default async function CreateSolAccount({ password, label, wallets, currentChain, mnemonics, setWallets }: {password: string, label?: string, wallets: Wallets, currentChain: Chain, mnemonics: string, setWallets: React.Dispatch<React.SetStateAction<Wallets>>}){
    const accountNumber = wallets[currentChain].length;

      //creating required keys
    const seed = mnemonicToSeedSync(mnemonics);
    const path = `m/44'/501'/${accountNumber}'/0'`; 
    const { key } = derivePath(path, seed.toString('hex'));
    console.log("Key:- ", key);
    const seed32 = key.slice(0,32);
    const kp = Keypair.fromSeed(seed32);
    const publicKey = kp.publicKey.toBase58();
    const secretKeyBase58 = bs58.encode(Buffer.from(kp.secretKey));
    // const secretKeyHex = seed32.toString("hex");

    // Storing the values on the db and global state
    const DBdata = {
    publicKey,
    privateKey: encryptKey(secretKeyBase58,password),
    label: label ?? `Account${wallets[currentChain].length}`
    }
    console.log("DBdata:- ", DBdata);
    // const newWallets = {
    // ...wallets,
    // [currentChain]: [...wallets[currentChain], DBdata],
    // }
    setWallets((prev: Wallets): Wallets => {
    const newWallets: Wallets = {
      ...prev,
      [currentChain]: [...prev[currentChain], DBdata],
    };
    setItem(WalletConst, newWallets);
    return newWallets;
    });
}