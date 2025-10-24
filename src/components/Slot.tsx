import React from 'react'

const Slot = ({ src, TokenName, TokenValue, CurrentPrice, TodayUpdate } : { src: string, TokenName: string, TokenValue: number, CurrentPrice: string, TodayUpdate: string}) => {
  return (
    <div className='w-full border-[2px] rounded-2xl flex items-center justify-between text-md px-2 py-1'>
       <div className='flex gap-4 w-1/2'>
        <img src={src} alt="tokenImg"   className='rounded-full w-12 h-12' />
       <div className='flex flex-col'>
        <span className='text-md'>{TokenName}</span>
        <span className='text-sm'>{TokenValue}</span>
       </div>
       </div>
       <div className='flex flex-col'>
        <span className='text-shadow-md'>{CurrentPrice}</span>
        <span className='text-sm text-green-600 flex items-center justify-center'>{TodayUpdate}</span>
       </div>
    </div>
  )
}

export default Slot
