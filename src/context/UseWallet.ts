import { useContext, createContext } from "react";

export interface Account {
    publicKey: string;
    privateKey: string;
    label: string;
}


export type Chain = 'SOL' | 'BTC' | 'ETH' | 'POLY';

export type Wallets  = {
  [key in Chain]: Account[];
}

export interface CurrentChainValueType {
   coinBalance: number;
   UsdPrice: number;
}

export type globalValueType = {
    SOL: number;
    BTC: number;
    ETH: number;
    POLY: number;
}

interface WalletContextType {
    mnemonics: string;
    isPasswordOpen: boolean;
    password: string;
    currentChain: Chain;
    currentChainValue: CurrentChainValueType;
    globalValue: globalValueType;
    setMnemonics: (value:string) => void;
    setPassword: (value: string) => void;
    setCurrentChain: (value: Chain) => void;
    wallets: Wallets;
    setWallets: (value: Wallets) => void;
    currentAccountIndex: number;
    setCurrentAccountIndex: (value: number) => void;
    setCurrentChainValue: (value: CurrentChainValueType) => void;
    setGlobalValue: (value: globalValueType) => void;
    setIsPasswordOpen: (value: boolean) => void;
}

export const WalletContext = createContext<WalletContextType>({
    mnemonics: "",
    password: "",
    isPasswordOpen: false,
    setPassword: () => {},
    setMnemonics: () => {},
    currentChain: 'SOL',
    setCurrentChain: () => {},
    globalValue: {
        SOL: 0,
        BTC: 0,
        ETH: 0,
        POLY: 0
    },
    wallets: {
        SOL: [],
        BTC: [],
        ETH: [],
        POLY: []
    },
    setWallets: () => {},
    currentAccountIndex: 0,
    setCurrentAccountIndex: () => {},
    currentChainValue: {
        coinBalance: 0,
        UsdPrice: 0
    },
    setCurrentChainValue: () => {},
    setGlobalValue: () => {},
    setIsPasswordOpen: () => {}

})

const useWallet = () => useContext(WalletContext);

export default useWallet;