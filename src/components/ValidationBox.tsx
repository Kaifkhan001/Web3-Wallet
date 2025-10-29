

const ValidationBox = ({validationArray, randomIndexValue, onClick, round} : { validationArray: string[], randomIndexValue: number, onClick: (value: string) => void, round: number}) => {
  return (
    <div className='w-full'>
        <p className='text-3xl font-semibold text-center w-full mb-6'>Validation!!</p>
        <p className='text-xl text-gray-400 font-semibold text-center w-full mb-6'>Step {round+1} of 3!!</p>
         <div className='w-full border-2 border-gray-500 rounded-2xl px-3 py-4'>
        <div className='w-full flex items-center justify-center text-xl font-semibold py-4'>
            {randomIndexValue} ?
        </div>
        <div className=' border-none rounded-2xl grid grid-cols-3 grid-rows-2 gap-8 px-2 py-2'>
       {validationArray.map((value, idx) => {
        return <div key={idx} onClick={() => onClick(value)} className='hover:bg-gray-800 rounded-2xl text-center border-[2px] cursor-pointer px-2 py-2'>
          {value}
        </div>
       })}
    </div>
    </div>
    </div>
   
  )
}

export default ValidationBox
