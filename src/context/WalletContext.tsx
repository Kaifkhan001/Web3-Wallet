import { useState } from "react";
import {  type CurrentChainValueType, type  globalValueType, WalletContext } from "./UseWallet";
import type { Chain } from "./UseWallet";
import type { Wallets } from "./UseWallet";



export const WalletProvider = ({ children }: { children : React.ReactNode}) => {
    const [mnemonics, setMnemonics] = useState("");
    const [password, setPassword] = useState('');
    const [currentChain, setCurrentChain] = useState<Chain>('SOL');
    const [currentChainValue, setCurrentChainValue] = useState<CurrentChainValueType>({
        coinBalance: 0,
        UsdPrice: 0
    });
    const [wallets, setWallets] = useState<Wallets>({
    SOL: [],
    ETH: [],
    BTC: [],
    POLY: []
    });
    const [currentAccountIndex, setCurrentAccountIndex] = useState(0);
    const [globalValue, setGlobalValue] = useState<globalValueType>({
        SOL: 0,
        BTC: 0,
        ETH: 0,
        POLY: 0
    });

    return <WalletContext.Provider value={{ mnemonics, setMnemonics, password, setPassword, currentChain, setCurrentChain, wallets, setWallets, currentAccountIndex, setCurrentAccountIndex, currentChainValue, setCurrentChainValue, globalValue, setGlobalValue }}>
        {children}
    </WalletContext.Provider>
}
