import { IoSend } from 'react-icons/io5'
import ControlBox from './ControlBox'
import { MdCallReceived } from 'react-icons/md'
import { AiOutlineSwap } from 'react-icons/ai'
import { FaDollarSign } from 'react-icons/fa6'

const MoneyControl = () => {
  return (
    <div className='w-full flex gap-6 md:gap-12 justify-center px-12 mb-12'>
     < ControlBox  text={'Send'} icon={<IoSend />}/>
     < ControlBox  text={'Recieve'} icon={<MdCallReceived />}/>
     < ControlBox  text={'Swap'} icon={<AiOutlineSwap />}/>
     < ControlBox  text={'Buy'} icon={<FaDollarSign />}/>
    </div>
  )
}

export default MoneyControl
