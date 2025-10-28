import { motion, AnimatePresence, type Variants } from "framer-motion"
import { useEffect, useState } from "react";
import useWallet, {type  CurrentChainValueType } from "../context/UseWallet";
import { type Chain } from "../context/UseWallet";
import getFullWalletValue from "../utils/getFullWalletValue";
import Slot from "./Slot";

const ShowAllWallet = ({ handleClose, chain }: { handleClose: () => void; chain: Chain}) => {
    const { wallets } = useWallet();
    const [allSolWallet, setAllSolWallet] = useState<CurrentChainValueType[] | []>([]);
    
    useEffect(() => {
    (async () => {
      const res = await getFullWalletValue({ chain, wallets });
      console.log("Show wallet values:- ", res);
      if (res) setAllSolWallet(res.values);
      console.log("Res from the function:- ",res);
    })();
    }, [chain, wallets]);

    useEffect(() => {
       console.log("SolAllWallet:- ", allSolWallet);
    }, [allSolWallet]);
    

    

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
              className="relative w-3/4 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-900 dark:border-gray-700"
              variants={variants}
            >
             <div className="flex items-center w-full justify-center gap-2 flex-col pt-8">
                {allSolWallet.length > 0 ?
                 allSolWallet.map((val, idx) => (
                    <Slot
                    key={idx} 
                    src={`/${chain.toLowerCase()}.png`} 
                    TokenName={chain} 
                    TokenValue={val.coinBalance} 
                    CurrentPrice={`${val.UsdPrice}`} 
                    TodayUpdate="+0.5$"
                    walletName={wallets[chain][idx].label}/>
                 )) : (
                  allSolWallet.length == 0 ? "Loading..." : "Something went wrong!!"
                 )
                }
                <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-white cursor-pointer text-lg"
              >
                ✕
              </button>
             </div>
            </motion.div>
          </motion.div>
      </AnimatePresence>
    </>
  )
}

export default ShowAllWallet
