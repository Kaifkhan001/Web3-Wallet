import { motion, AnimatePresence, type Variants } from "framer-motion"
import {  useEffect, useRef, useState } from "react"
import useWallet from "../context/UseWallet";
import type { ChainType } from "./Dropdown";
import CreateSolAccount from "../utils/createSolAccount";
import { getItem } from "../utils/DbInteration";
import { passwordConst } from "../utils/ConstValues";
import { toast } from "sonner";
import CreateEthAccount from "../utils/createEthAccount";
import CreatePolyAccount from "../utils/createPOLYAccount";
import CreateBTCAccount from "../utils/createBTCAccount";
import LoadingButton from "./LoadingButton";

const AddWallet = ({ onClick } : { onClick: () => void;}) => {
  const [label, setLabel] = useState('');
  const { currentChain, setCurrentChain, password, setPassword, wallets, mnemonics, setWallets } = useWallet(); 
  const Chain: ChainType[] = ['SOL', 'BTC', 'ETH', 'POLY'];
  const [isDropOpen, setIsDropOpen] = useState(false);
  const setDropDown = useRef<HTMLButtonElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (setDropDown.current && !setDropDown.current.contains(event.target as Node)) {
        setIsDropOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleCreate = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true)
    if(!password){
       const res = await getItem(passwordConst) as string;
       setPassword(res);
    }
    switch(currentChain){
        case 'SOL': await CreateSolAccount({ password, label, wallets, setWallets, mnemonics, currentChain});
                    break;
        case 'BTC': await CreateBTCAccount({ password, label, wallets, setWallets, mnemonics, currentChain});
                    break;
        case 'ETH': await CreateEthAccount({ password, label, wallets, setWallets, mnemonics, currentChain});
                    break;
        case 'POLY':await CreatePolyAccount({ password, label, wallets, setWallets, mnemonics, currentChain});
                    break;
        default : 
                    console.log("No method found for creating the wallet");
                    toast.error("Error creating the wallet");
                    break;
    }
    setIsProcessing(false);
    onClick();
  }
  



  const variants: Variants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.3 },
    },
  }

  return (
    <>
      <AnimatePresence>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          >
            {/* Attach the ref HERE */}
            <motion.div
              className="relative w-3/4 max-w-sm p-4 px-2 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-900 dark:border-gray-700"
              variants={variants}
            >
              <form onSubmit={handleCreate} className="space-y-6 w-full" action="#">
                <h5 className="pt-8 w-full flex text-center text-2xl font-semibold items-center justify-center relative ">
                Create a{" "}
                <span className="relative  flex items-center justify-center px-2 hover:text-gray-500">
                    {/* clickable chain selector */}
                    <button
                    ref={setDropDown}
                    type="button"
                    onClick={() => setIsDropOpen((prev) => !prev)}
                    className="flex items-center gap-1 cursor-pointer"
                    >
                    {currentChain}▼
                    </button>

                    {/* dropdown menu */}
                    {isDropOpen && (
                    <div className="absolute top-full mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-24 dark:bg-black border border-gray-700 dark:text-white">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        {Chain.map((val: ChainType, idx: number) => (
                            <li
                            onClick={() => {
                                setCurrentChain(val)
                                setIsDropOpen(false)
                            }}
                            key={idx}
                            className="flex items-center justify-between py-1 px-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                            {val}
                            </li>
                        ))}
                        </ul>
                    </div>
                    )}
                </span>
                Wallet.
                </h5>

                 <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name:- 
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                    focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 
                    dark:placeholder-gray-400 dark:text-white"
                    placeholder="Account01"
                    required
                  />
                </div>

                {isProcessing ? (
                 <LoadingButton text='Creating...'/>
                ) : (
                  <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 
                  py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                >
                  Create 
                </button>
                )}
               
              </form>

              <button
                onClick={onClick}
                className="absolute top-3 right-3 text-gray-400 hover:text-white cursor-pointer text-lg"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
      </AnimatePresence>
    </>
  )
}

export default AddWallet
