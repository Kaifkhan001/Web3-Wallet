import  { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import BalanceCard from './BalanceCard'
import MoneyControl from './MoneyControl'
import Tokens from './Tokens'
import PasswordGate from './PasswordBox'
import initDB, { getItem } from '../utils/DbInteration'
import { MnemonicsConst, passwordConst, WalletConst,  } from '../utils/ConstValues'
import ReloadPage from './ReloadPage'
import useWallet, { type Wallets } from '../context/UseWallet'
import CreateSolAccount from '../utils/createSolAccount'
import { toast } from 'sonner'
import CreateBTCAccount from '../utils/createBTCAccount'
import CreateEthAccount from '../utils/createEthAccount'
import CreatePolyAccount from '../utils/createPOLYAccount'

const Wallet = () => {
  const { mnemonics, wallets, currentChain, setWallets, setMnemonics } = useWallet();
  // const [IsOpen, setIsOpen] = useState(true);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(true);
  const passwordRef = useRef('');
  
  const loadWallet = async() => {
    try {
      const wall: Wallets | null = await getItem(WalletConst);
      if(!wall) return;
      setWallets(wall);
      setError(false);
    } catch (error) {
      setError(true);
      console.log("Error loading wallets data", error);
      toast.error("Error loading wallet data");
      return;
    }
  }
  useEffect(() => {
   (async() => {
    initDB();
   loadWallet();
   passwordRef.current = await getItem(passwordConst) as string;
   const res = await getItem(MnemonicsConst) as string | null;
   if(res) setMnemonics(res);
   })()

  }, []);

  
  
  

  useEffect(() => {
    (async() => {
      console.log("Conditons:- ", wallets[currentChain].length == 0)
      console.log("mnemonics: -", mnemonics);
      if(wallets[currentChain].length == 0 && mnemonics){
      await CreateSolAccount({ password: passwordRef.current, wallets, currentChain, setWallets, mnemonics });
      await CreateBTCAccount({ password: passwordRef.current, wallets, currentChain: 'BTC', setWallets, mnemonics });
      await CreateEthAccount({ password: passwordRef.current, wallets, currentChain: "ETH", setWallets, mnemonics });
      await CreatePolyAccount({ password: passwordRef.current, wallets, setWallets, currentChain: 'POLY', mnemonics });
    }
    })()
  }, []);
  
  

  const handleReloadClick = async() => {
    setIsLoading(true);
    await loadWallet();
    setIsLoading(false);
  }


  if(isPasswordOpen){
    return <PasswordGate onClose={() => setIsPasswordOpen(false)}/>
  }

  if(error) {
    return <ReloadPage handleClick={handleReloadClick} isLoading={isLoading}/>
  }
  

  return (
    <div className='text-4xl text-gray-300 min-h-screen pb-8'>
      <Navbar isValid={true} />
      <BalanceCard />
      <MoneyControl />
      <Tokens />
   </div>
  )
}

export default Wallet
