import { motion, AnimatePresence, type Variants } from "framer-motion"
import Button from "./Button";

const WarningForDeleteKey = ({ handleDelete, handleCancel } : { handleDelete: () => void; handleCancel: () => void}) => {

  const variants: Variants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.3 },
    },
  }

  return (
    <>
      <AnimatePresence>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          >
            {/* Attach the ref HERE */}
            <motion.div
              className="relative w-3/4 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-900 dark:border-gray-700 pt-12"
              variants={variants}
            >
              <h4 className="text-lg text-center w-full">Are you Sure, You wanted to delete it permanently??</h4>
              <p className="text-red-800 font-semibold text-sm text-center w-full py-3">Think twice, it's irreversible process!!</p>
               <div className="flex w-full items-center justify-around ">
                  <Button text='Cancel' onClick={handleCancel} />
                  <Button text="Delete" onClick={handleDelete} themeColor="red"/>
               </div>
              <button
                onClick={handleCancel}
                className="absolute top-3 right-3 text-gray-400 hover:text-white cursor-pointer text-lg"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
      </AnimatePresence>
    </>
  )
}

export default WarningForDeleteKey
