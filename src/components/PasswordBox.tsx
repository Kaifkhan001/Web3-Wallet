import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { getItem } from "../utils/DbInteration";
import { passwordConst } from "../utils/ConstValues";

export default function PasswordGate({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(true);
  const [error, setError] = useState(false);
  const [pastError, setPastError] = useState(false);
  const passFromDb = useRef('');

  useEffect(() => {
   (async() => {
    try {
        const password = await getItem(passwordConst);
        passFromDb.current = password as string;
        console.log("Password got from indexedDB:- ", password);
    } catch (error) {
        toast.error("Error Fetching Password!!");
        console.log("Error while fetching the pass:- ", error);
        return;
    }
   })();
  }, [])
  

  const handleVerify = (e: FormEvent) => {
    e.preventDefault();
    if (input === passFromDb.current) {
      setVisible(false);
      setTimeout(() => {
        onClose();
      }, 600);
    } else {
      setError(true);
      setPastError(true);
      toast.error("Wrong password");
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col items-center justify-center h-screen 
            bg-black/80 text-white z-50 gap-8"
            >
            <h4 className="text-4xl ">Kaif Khan.</h4>
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
              className={`px-3 py-2 rounded-md bg-gray-800 border border-gray-700 outline-none ${
                pastError ? "border-2 border-red-600" : ""
              }`}
              placeholder="Password"
            />

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
            >
              Verify
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
