import { useState } from "react";
import {  WalletContext } from "./UseWallet";



export const WalletProvider = ({ children }: { children : React.ReactNode}) => {
    const [mnemonics, setMnemonics] = useState("");
    const [password, setPassword] = useState('');
    const [currentChain, setCurrentChain] = useState('SOL');
    const [SolAccounts, setSolAccounts] = useState([]);
    return <WalletContext.Provider value={{ mnemonics, setMnemonics, password, setPassword, currentChain, setCurrentChain, SolAccounts, setSolAccounts }}>
        {children}
    </WalletContext.Provider>
}
