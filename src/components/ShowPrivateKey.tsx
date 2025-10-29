import { motion, AnimatePresence, type Variants } from "framer-motion"
import { useEffect, useRef, useState, type FormEvent } from "react";
import { FaCheck, FaRegCopy } from "react-icons/fa6";
import { decryptKey } from "../utils/encryptKey";
import useWallet from "../context/UseWallet";
import { toast } from "sonner";
import { getItem } from "../utils/DbInteration";
import { passwordConst } from "../utils/ConstValues";

const AddWallet = ({ onClose, encprivateKey } : { onClose: () => void; encprivateKey: string;}) => {
  const [prKey, setPrKey] = useState<string | null>(null);
  const [isPassword, setIsPassword] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [input, setInput] = useState<string>('');
  const [pastError, setPastError] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const { password } = useWallet();
  const passwordRef = useRef<string | null>(null);
  
  useEffect(() => {
    if(password) return;
    (async() => {
      const getPass = await getItem(passwordConst) as string;
      if(getPass) passwordRef.current = getPass;
    })()
  }, [password])
  

    const loadKeyValue = () => {
      console.log("Got into the private key showing process:- ", encprivateKey);
       const decrypt = decryptKey(encprivateKey, password);
       console.log("Decrpyted private key:- ", decrypt);
       if(decrypt) setPrKey(decrypt);
    }
  

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

  const handleVerify = (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    if (input === passwordRef.current) {
      console.log("Inside the correct block");
      loadKeyValue();
      setTimeout(() => {
        setIsPassword(false);
        setIsProcessing(false);
      }, 600);
    } else {
      setError(true);
      setPastError(true);
      toast.error("Wrong password");
      setTimeout(() => {
        setError(false);
        setIsProcessing(false);
      }, 2000);
    }
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
              className="relative w-3/4 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-900 dark:border-gray-700 pt-12 flex items-center justify-center gap-2 flex-col"
              variants={variants}
            >
              {isPassword && (<div className="w-full">
          <form onSubmit={handleVerify} className="bg-gray-900 p-6 rounded-2xl shadow-lg flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-center">Enter Password</h2>

            <motion.input
              type="password"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setPastError(false);
              }}
              animate={
                error
                  ? { x: [0, -10, 10, -10, 10,-10, 0] } 
                  : { x: 0 }
              }
              transition={{ duration: 0.4 }}
              className={`px-3 py-2 rounded-md text-lg bg-gray-800 border border-gray-700 outline-none ${
                pastError ? "border-2 border-red-600" : ""
              }`}
              placeholder="Password"
            />

            <button
            disabled={isProcessing}
              className={` text-base  text-white py-2 rounded-md ${isProcessing? " hover:bg-blue-500 bg-blue-400" : " hover:bg-blue-700 bg-blue-600 "}`}
            >
              {isProcessing ? 'Processing...' : "Verify"}
            </button>
          </form>
              <div
                className="absolute top-3 right-1/2 text-gray-400 hover:text-white cursor-pointer  translate-x-[50%] text-xl font-semibold"
              >
                Private Key
              </div>
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-white cursor-pointer text-lg"
              >
                ✕
              </button>
              </div>)}
              {!isPassword && (
                <div className="w-full">
                  <div className="border-white border-2 rounded-xl p-3 w-full text-base">
                 <span onClick={() => {
                  if(!prKey) {
                    toast.error("Something went wrong, Retry!!");
                    return;
                  }
                  navigator.clipboard.writeText(prKey);
                  toast.success("Key Copied Successfully");
                  setCopiedKey(prKey);
                  setTimeout(() => {
                    setCopiedKey(null);
                  }, 2000);

                 }} className="w-full flex items-center justify-end cursor-pointer">
                  {copiedKey ? <FaCheck /> : <FaRegCopy color="gray"/> }  
                 </span>
                 <textarea name="prKey" id="prKey" className="w-full flex text-wrap py-1 px-3">
                  {prKey ? prKey : "Something went wrong!!"}
                 </textarea>
              </div>

              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-white cursor-pointer text-lg"
              >
                ✕
              </button>
              <div
                className="absolute top-3 right-1/2 text-gray-400 hover:text-white cursor-pointer  translate-x-[50%] text-xl font-semibold"
              >
                Private Key
              </div>
                </div>
              )}
            </motion.div>
          </motion.div>
      </AnimatePresence>
    </>
  )
}

export default AddWallet
