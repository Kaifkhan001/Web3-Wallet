
const BalanceCard = () => {
  return (
    <div className='w-full h-16 flex flex-col items-center justify-center text-4xl font-semibold pt-8 mb-16'>
     <div className='my-2'>34.5$</div>
     <div className='text-sm flex gap-2'>
        <span className='text-green-600 px-[2px] border-x-[1px] border-green-600'>+0.7$</span>
        <span className='text-green-400 '>+0.5%</span>
     </div>
    </div>
  )
}

export default BalanceCard
