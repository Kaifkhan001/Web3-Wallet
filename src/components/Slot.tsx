import { useState } from "react"
import ShowAllWallet from "./ShowAllWallet"
import capitalize from "../utils/Capitalize"
import type { Chain } from "../context/UseWallet"


const Slot = ({
  src,
  TokenName,
  TokenValue,
  CurrentPrice,
  TodayUpdate,
  isMoreThanOne=false,
  walletName
}: {
  src: string
  TokenName: Chain
  TokenValue: number
  CurrentPrice: string
  TodayUpdate: string,
  isMoreThanOne?: boolean,
  walletName: string
}) => {
  const [isShowAllWalletOpen, setIsShowAllWalletOpen] = useState(false);
  const handleShowAllWallet = (Coin: string) => {
    console.log("Wallet Opens up:- ", Coin);
    setIsShowAllWalletOpen(prev => !prev);
  }
  return (
    <div className=' relative w-full border-[2px] rounded-2xl flex flex-col overflow-hidden'>
      { isShowAllWalletOpen && <ShowAllWallet handleClose={() => setIsShowAllWalletOpen(false)} chain={TokenName} />}
      <div className='W-full text-center flex items-center justify-center pt-2  text-base text-slate-300 font-semibold'>{capitalize(walletName)}</div>
      {/* Top content */}
      <div className='flex items-center justify-between text-md px-2 pb-2'>
        <div className='flex gap-4 w-1/2'>
          <img src={src} alt='tokenImg' className='rounded-full w-12 h-12' />
          <div className='flex flex-col'>
            <span className='text-md'>{TokenName}</span>
            <span className='text-sm'>{Number(TokenValue).toFixed(2)}</span>
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <span className='text-shadow-md'>{Number(CurrentPrice).toFixed(2) + "$"}</span>
          <span className='text-sm text-green-600 flex items-center justify-center'>
            {TodayUpdate}
          </span>
        </div>
      </div>

      {/* Full-width button */}
     {isMoreThanOne && 
      <button onClick={() => handleShowAllWallet(TokenName)} className='w-full bg-gray-800 text-white font-medium hover:bg-blue-700 transition-all text-sm border-t-[1px] border-white'>
        Show All
      </button>}
    </div>
  )
}

export default Slot
