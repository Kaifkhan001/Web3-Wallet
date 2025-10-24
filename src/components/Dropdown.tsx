import { useEffect, useRef, useState } from "react";
import ShortenKeys from "../utils/shortenKey";
import { FaCheck, FaRegCopy } from "react-icons/fa6";
import { toast } from "sonner";
import useWallet from "../context/UseWallet";

type ChainType = 'SOL' | 'BTC' | 'ETH' | 'POLY';

const Dropdown = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isChainOpen, setIsChainOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { currentChain, setCurrentChain } = useWallet();

  const Wallet = {
    SOL: "dnalfnlanfiwoneflksnfjsdnfjsdnf",
    ETH: "kjafnwoenfsjndfskdjnfsjns",
    POL: "sdfjsndkjsngkdjngeiurnfsdn",
  };

  const Chain: ChainType[] = ['SOL', 'BTC', 'ETH', 'POLY'];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsChainOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="flex items-center justify-center relative">
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-[1px] focus:outline-none focus:ring-blue-300 font-medium rounded-l-lg text-sm px-5 py-2.5 text-center inline-flex items-center cursor-pointer border-r-[2px] border-blue-200" onClick={() => setIsChainOpen(prev => !prev)}>
        {currentChain}
        <svg
          className="w-2.5 h-2.5 ms-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
        </button>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-[1px] focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm px-5 py-2.5 text-center inline-flex items-center cursor-pointer"
        type="button"
      >
        Account01
        <svg
          className="w-2.5 h-2.5 ms-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isChainOpen && (
        <div className="absolute top-12 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-24 dark:bg-black border border-white dark:text-white left-0" >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {Chain.map((val: ChainType, idx: number) => (
              <li onClick={async() => {
                setCurrentChain(val);
                setIsChainOpen(false);
              }} key={idx} className="flex items-center justify-between py-1 px-2 cursor-pointer">
                <div>{val}</div>
                {/* <div
                  className="flex gap-1 cursor-pointer hover:text-gray-400"
                  onClick={async () => {
                    await navigator.clipboard.writeText(value);
                    toast.success("Key Copied to clipboard!");
                    setCopiedKey(value);
                    setTimeout(() => setCopiedKey(null), 2000);
                  }}
                > */}
                  {/* {ShortenKeys(value)}{" "}
                  <span title="copy">
                    {copiedKey === value ? <FaCheck /> : <FaRegCopy />}
                  </span> */}
                {/* </div> */}
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && (
        <div className="absolute top-12 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-black border border-white dark:text-white right-0">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {Object.entries(Wallet).map(([key, value]) => (
              <li key={key} className="flex items-center justify-between py-1 px-2">
                <div>{key}</div>
                <div
                  className="flex gap-1 cursor-pointer hover:text-gray-400"
                  onClick={async () => {
                    await navigator.clipboard.writeText(value);
                    toast.success("Key Copied to clipboard!");
                    setCopiedKey(value);
                    setTimeout(() => setCopiedKey(null), 2000);
                  }}
                >
                  {ShortenKeys(value)}{" "}
                  <span title="copy">
                    {copiedKey === value ? <FaCheck /> : <FaRegCopy />}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
