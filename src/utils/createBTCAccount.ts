import * as ecc from "@bitcoin-js/tiny-secp256k1-asmjs";
import { BIP32Factory } from "bip32";
import { mnemonicToSeedSync } from "bip39";
import * as bitcoin from "bitcoinjs-lib";
import encryptKey from "./encryptKey";
import { type Chain, type Wallets } from "../context/UseWallet";
import { setItem } from "./DbInteration";
import { WalletConst } from "./ConstValues";

const bip32 = BIP32Factory(ecc);


export default async function CreateBTCAccount({ password, label, wallets, currentChain, mnemonics, setWallets }: {password: string, label?: string, wallets: Wallets, currentChain: Chain, mnemonics: string, setWallets: (value: Wallets) => void}){
    // Extracting needed things
    // const { wallets, currentChain, mnemonics, setWallets } = useWallet();
    const accountNumber = wallets[currentChain].length;
        // Convert seed into mnemonics
    const seed = mnemonicToSeedSync(mnemonics);

    const root = bip32.fromSeed(seed, bitcoin.networks.bitcoin);

    //creating the path and all
    const path = `m/44'/0'/${accountNumber}'/0/0`;
    const child = root.derivePath(path);


    //creating addresses
    const { address } = bitcoin.payments.p2pkh({
        pubkey: child.publicKey,
        network: bitcoin.networks.bitcoin
    });

    //extracting the private key
    const privateKeyWIF = child.toWIF();

    console.log("Public key:- ", address);
    console.log("Private key:- ", privateKeyWIF);

    const DBdata = {
        publicKey: address,
        privateKey: encryptKey(privateKeyWIF, password),
        label: label ?? `Account${accountNumber}`
    }

    const newWallet = {
        ...wallets,
        [currentChain] : [...wallets[currentChain], DBdata]
    };

    setWallets(newWallet);
    await setItem(WalletConst, newWallet);

    console.log("BTC wallet:- ", DBdata);

} 