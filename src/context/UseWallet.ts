import { useContext, createContext } from "react";

export interface AccountTypes {
    [key: string] : string
}

interface WalletContextType {
    mnemonics: string;
    password: string;
    currentChain: string;
    SolAccounts: AccountTypes[];
    setMnemonics: (value:string) => void;
    setPassword: (value: string) => void;
    setCurrentChain: (value: 'SOL' | 'BTC' | 'POLY' | 'ETH') => void;
    setSolAccounts: React.Dispatch<React.SetStateAction<AccountTypes[]>>;
}

export const WalletContext = createContext<WalletContextType>({
    mnemonics: "",
    password: "",
    setPassword: () => {},
    setMnemonics: () => {},
    currentChain: "",
    setCurrentChain: () => {},
    SolAccounts: [],
    setSolAccounts: () => {},
})

const useWallet = () => useContext(WalletContext);

export default useWallet;