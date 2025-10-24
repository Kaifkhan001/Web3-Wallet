import { useNavigate } from 'react-router-dom';
import Button from './Button'
import Navbar from './Navbar';

const CreateWallet = () => {
  const navigate = useNavigate();
  const handleClick = () => 
    navigate('/seed-phrase');
  return (
    <div className='w-full'>
      <Navbar isValid={false}/>
      <div className='w-full h-[100vh] flex items-center justify-start flex-col gap-12 pt-60 md:pt-32 px-4'>
      <h3 className='text-3xl font-semibold  w-full text-center '>Create Your Secure Web3 Wallet</h3>
      <Button text='Create Wallet' onClick={handleClick}/>
    </div>
    </div>
  )
}

export default CreateWallet;