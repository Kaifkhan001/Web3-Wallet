import  { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import BalanceCard from './BalanceCard'
import MoneyControl from './MoneyControl'
import Tokens from './Tokens'
import PasswordGate from './PasswordBox'
import initDB, { getItem, setItem } from '../utils/DbInteration'
import { passwordConst, privateKey, publicKey,  } from '../utils/ConstValues'
import ReloadPage from './ReloadPage'
import useWallet from '../context/UseWallet'
import CreateSolAccount from '../utils/createSolAccount'
import encryptKey from '../utils/encryptKey'

const Wallet = () => {
  const { mnemonics } = useWallet();
  const [IsOpen, setIsOpen] = useState(true);
  const [error, setError] = useState(false);
  const [dbPublicKey, setDbPublicKey] = useState('');
  const [hashedPrivateKey, setHashedPrivateKey] = useState('');
  const [currentAccountNo, setcurrentAccountNo] = useState(1);
  const passwordRef = useRef('');
  
  const loadKeys = async() => {
    const key = await getItem(publicKey) as string;
    setDbPublicKey(key);
    const privKey = await getItem(privateKey) as string;
    setHashedPrivateKey(privKey);
    console.log("Public key from the indexedDB:- ", key);
    console.log("Hashed Private key:- ", privKey);
  }
  useEffect(() => {
   (async() => {
    initDB();
   loadKeys();
   passwordRef.current = await getItem(passwordConst) as string
   })()

  }, []);

  useEffect(() => {
    (async() => {
      if(!hashedPrivateKey || !publicKey){
      console.log("Mnemonics value:- ", mnemonics);
      const account = CreateSolAccount(mnemonics, currentAccountNo);
      setDbPublicKey(account.publicKey);
      await setItem(publicKey, account.publicKey);
      const enc = await encryptKey(account.secretKeyBase58,passwordRef.current);
      await setItem(privateKey, enc);
    }
    })()
  }, [])
  

  const handleReloadClick = () => {

  }


  if(IsOpen){
    return <PasswordGate onClose={() => setIsOpen(false)}/>
  }

  if(error) {
    return <ReloadPage handleClick={handleReloadClick}/>
  }
  

  return (
    <div className='text-4xl text-gray-300'>
      <Navbar isValid={true} />
      <BalanceCard />
      <MoneyControl />
      <Tokens />
   </div>
  )
}

export default Wallet
