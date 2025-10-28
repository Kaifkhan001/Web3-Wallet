// import bip39 from 'bip39';
import { type Chain, type Wallets } from '../context/UseWallet';
import { WalletConst } from './ConstValues';
import { setItem } from './DbInteration';
import encryptKey from './encryptKey';
import { Wallet, HDNodeWallet, Mnemonic } from 'ethers';


export default async function CreatePolyAccount({ password, label, wallets, currentChain, mnemonics, setWallets }: {password: string, label?: string, wallets: Wallets, currentChain: Chain, mnemonics: string, setWallets: (value: Wallets) => void}) {
    const accountNumber = wallets[currentChain].length;

    if (!mnemonics || typeof mnemonics !== "string") {
    console.error("Invalid or missing mnemonic:", mnemonics);
    return;
    }

    // derive wallet directly using ethers
    const path = `m/44'/966'/${accountNumber}'/0/0`;

    const mnemonicObject = Mnemonic.fromPhrase(mnemonics);
    const childNode = HDNodeWallet.fromMnemonic(mnemonicObject, path);
    const wallet = new Wallet(childNode.privateKey);

    console.log("Public key of poly:- ",wallet.address);
    console.log("Private key in poly:- ",wallet.privateKey);;

    const DBdata = {
        publicKey: wallet.address,
        privateKey: encryptKey(wallet.privateKey, password),
        label: label ?? `Account${wallets[currentChain].length}`
    }

    const newWallets = {
        ...wallets,
        [currentChain]: [...wallets[currentChain], DBdata],
    }
     setWallets(newWallets);
     await setItem(WalletConst, newWallets);

    }
