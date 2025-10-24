import { useEffect, useState } from "react";
import Button from "./Button"
import { generateMnemonic } from "bip39";
import { useNavigate } from "react-router-dom";
import useWallet from "../context/UseWallet";
import MnemonicsBox from "./MnemonicsBox";
import Navbar from "./Navbar";


const SeedPhrase = () => {
    const navigate = useNavigate();
    const { setMnemonics, mnemonics } = useWallet();
    const [isTrue, setIsTrue] = useState(false);
    
    useEffect(() => {
    const mnemonic = generateMnemonic();
    setMnemonics(mnemonic);
    }, []);

    const handleClick = () => {
       navigate('/seed-phrase/validate');
    }

    
  return (
    <div className="w-full">
     <Navbar isValid={false}/>
     <div className="w-full  flex items-center justify-start flex-col text-center pt-32 md:pt-12">
      <h2 className="text-3xl md:text-4xl">Secret Recovery Phrase</h2>
      <h6 className="mt-2 text-gray-400 text-sm">Safe these words in a safe place, Better offline</h6>
       <p className="text-red-300 text-sm mt-1">Read this warning Again!!</p>
      <MnemonicsBox mnemonics={mnemonics}/>
       <div className="flex items-center justify-center gap-3 py-3">
        <input type="checkbox" name="Ready" id="ready" checked={isTrue} onChange={(e) => {
            setIsTrue(e.target.checked)
            console.log("Value:- ", isTrue);
        }} className="cursor-pointer" />
        <span>I Saved my secret recovery phrase </span>
       </div>
       <Button text="Next" onClick={handleClick} className="px-8 mt-4" disabled={isTrue}/>
    </div>
   </div>
  )
}

export default SeedPhrase
