import { toast } from 'sonner';

const MnemonicsBox = ({ mnemonics, isBorder=true }:  { mnemonics: string, isBorder?: boolean}) => {
     const handleCopy = () => {
        const text = mnemonics;
        navigator.clipboard.writeText(text);
        toast.success("Mnemonics Copied Successfully");
    }
  return (
      <div onClick={handleCopy} className=" md:w-[60%] min-h-[8rem] bg-gray-800 rounded-xl flexx items-center justify-center flex-wrap mt-2 px-4 py-4 ">
       <div className="grid grid-cols-3 gap-3 text-sm cursor-pointer">
         {mnemonics.split(' ').map((value, idx) => {
            return <div key={idx} className=" rounded-xl text-lg text-white flex items-center justify-center md:py-2 px-2 py-1 wrap">{idx + 1 + '.'} {value}</div>
        })}
       </div>
        {isBorder && 
        <p className="w-full text-sm text-center border-t-[1px] border-white mt-2 pt-2">Click anywhere on this card to copy </p>}
       </div>
  )
}

export default MnemonicsBox
