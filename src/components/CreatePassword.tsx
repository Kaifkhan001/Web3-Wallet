
import { useState, type FormEvent } from 'react';
import Navbar from './Navbar'
import { toast } from 'sonner';
import { setItem } from '../utils/DbInteration';
import { passwordConst } from '../utils/ConstValues';
import { useNavigate } from 'react-router-dom';

const CreatePassword = () => {
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    if(pass != confirmPass){
        toast.error("Password isn't matching");
        return;
    }
    await setItem(passwordConst, pass)
    .then((res) => {
        console.log("Res of password saving process:- ", res);
    });
    navigate('/wallet');
    }
  return (
    <div className='w-full flex items-center justify-center flex-col gap-3'>
        <Navbar isValid={false}/>
        
        <form onSubmit={handleSubmit} className='w-full px-6 py-6 md:w-1/2 lg:w-1/3 flex items-center justify-center flex-col gap-3'>
            <h5 className='text-3xl font-semibold text-center w-full mb-6'>Create Password</h5>
            <div className="mb-6 w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input 
                type="password" 
                id="password" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" 
                required 
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                />
            </div> 
            <div className="mb-6 w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                <input 
                type="password" 
                id="confirm_password" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" 
                required 
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5  py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer ">Submit</button>
        </form>

    </div>
  )
}

export default CreatePassword
