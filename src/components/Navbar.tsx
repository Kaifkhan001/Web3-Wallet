import Dropdown from './Dropdown'

const Navbar = ({ isValid } : { isValid: boolean}) => {
  return (
    <div className='w-full h-[4rem] flex items-center justify-between bg-black border-b-1 px-4 py-2 border-white '>
      <div className='font-semibold text-3xl'>Kaif.</div>
      {isValid && <Dropdown />}
    </div>
  )
}

export default Navbar
