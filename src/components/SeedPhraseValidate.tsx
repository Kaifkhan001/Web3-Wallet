import { useEffect, useState } from 'react'
import getSixRandom from '../utils/getSixRandom';
import useWallet from '../context/UseWallet';
import Navbar from './Navbar';
import ValidationBox from './ValidationBox';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
// import MnemonicsBox from './MnemonicsBox';

const SeedPhraseValidate = () => {
  const navigate = useNavigate();
  const [round, setRound] = useState(0);
  const [wrongAnswerN, setwrongAnswerN] = useState(0)
  const { mnemonics } = useWallet();
  const [random, setRandom] = useState<number[] | null>(null);
  const [ValidationArray, setValidationArray] = useState<string[] | []>([])
  useEffect(() => {
    const newRand: number[] = []
    while(newRand.length < 4){
      const rand = Math.floor(Math.random() * 12) + 1;
      if(newRand.includes(rand)) continue;
      newRand.push(rand);
    }
    setRandom(newRand);
  }, []);
  
  useEffect(() => {
    if(!random || !mnemonics) return;
    const mne = mnemonics.split(' ');
    const validatorArr = getSixRandom(mne, mne[random[round]-1]);
    console.log("validation array:- ", validatorArr);
    setValidationArray(validatorArr);
    console.log("validation array:- ", ValidationArray);
  }, [random, mnemonics, round]);

  const handleClick = (value: string) => {
    if(!random) {
      toast.error("Something went wrong!!, Please try again.");
      return;
    }
    console.log("Value clicked:- ", value);
    const mne = mnemonics.split(' ');
    const trueVal = mne[random[round]-1];
    console.log(trueVal);
    if(trueVal == value){
      console.log("Correct bro");
      if(round <= 1){ 
        setRound(prev  => prev += 1)
      }else{
        navigate('/create-password')
      }
    }else{
      toast.error("Wrong answer!!");
      setwrongAnswerN(prev => prev += 1)
      console.log("Wrong move!!");
    }
  }




  if(!ValidationArray || !random){
    return (
      <div className='w-full'>
        <Navbar isValid={false}/>
        <div className='w-full flex min-h-[50%] items-center justify-center'>
       Loading.....
      </div>
      </div>
    )
  }

  if(wrongAnswerN > 2){
    return (
      <div className='w-full'>
        <Navbar isValid={false}/>
        <div className='w-full flex items-center flex-col gap-6 justify-center min-h-[50%] py-8 px-3 '>
        <p className='text-xl text-red-800 font-semibold text-center'>You have choose wrong options more three times!!</p>
        <Link to={'/'} className='px-2 py-2 bg-gray-700 rounded-xl border-none hover:bg-gray-800 cursor-pointer'>Go back to Home page.</Link>
      </div>
      </div>
    )
  }
  
  return (
    <div className='w-full'>
      <Navbar isValid={false}/>
      <div className='w-full py-6 px-4 flex items-center '>
      <ValidationBox validationArray={ValidationArray} randomIndexValue={random[round]} onClick={handleClick} round={round} />
    </div>
    </div>
  )
}

export default SeedPhraseValidate
