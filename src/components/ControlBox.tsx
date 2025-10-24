import { motion } from 'framer-motion'
import React, { type ReactElement } from 'react'

const ControlBox = ({ text, icon } : {text : string, icon: ReactElement}) => {
  return (
    <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
    >
    <div className='w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center flex-col text-sm md:text-xl  justify-center text-white bg-black border-[1px] px-4 hover:bg-gray-950 cursor-pointer'>
      {icon}
      {text}
    </div>
    </motion.div>
  )
}

export default ControlBox
