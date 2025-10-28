import { useEffect, useState } from "react";
import GetGlobalValue from "../utils/getGlobalValue";
import useWallet from "../context/UseWallet";

const BalanceCard = () => {
  const [globalValue, setGlobalValue] = useState(0);
  // const [localValue, setlocalValue] = useState({})
  const { wallets } = useWallet();
  useEffect(() => {
    (async() => {
      const res = await GetGlobalValue({ wallets });
      console.log("GLobal Value from the function:- ", res);
      if(!res) return
      const val = res['SOL'] + res['BTC'] + res['ETH'] + res['POLY'];
      console.log("val in the balance card:- ", val);
      if (res) setGlobalValue(val);
    })()
  }, [wallets])

  return (
    <div className='w-full h-16 flex flex-col items-center justify-center text-4xl font-semibold pt-8 mb-16'>
     <div className='my-2'>{globalValue.toFixed(2) + "$"}</div>
     <div className='text-sm flex gap-2'>
        <span className='text-green-600 px-[2px] border-x-[1px] border-green-600'>+0.7$</span>
        <span className='text-green-400 '>+0.5%</span>
     </div>
    </div>
  )
}

export default BalanceCard
