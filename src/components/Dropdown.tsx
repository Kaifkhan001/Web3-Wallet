import { useEffect, useRef, useState } from "react";
import ShortenKeys from "../utils/shortenKey";
import { FaCheck, FaRegCopy } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";

import { toast } from "sonner";
import useWallet, { type Account, type CurrentChainValueType } from "../context/UseWallet";
import AddWallet from "./AddWallet";
import { getSolValue } from "../utils/getSolValue";
import getEthValue from "../utils/getEthValue";
import getBTCValue from "../utils/getBTCValue";
import getPolyValue from "../utils/getPolyValue";
import ShowPrivateKey from "./ShowPrivateKey";
import { setItem } from "../utils/DbInteration";
import { WalletConst } from "../utils/ConstValues";
import WarningForDeleteKey from "./WarningForDeleteKey";

export type ChainType = 'SOL' | 'BTC' | 'ETH' | 'POLY';

const Dropdown = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [CurrentKey, setCurrentKey] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isChainOpen, setIsChainOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  // const [showPasswordBox, setshowPasswordBox] = useState(false);
  const [showPrivateKey, setshowPrivateKey] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const  { wallets, setCurrentChainValue, currentChain, setCurrentChain, setWallets } = useWallet();
  const [warningForDelete, setwarningForDelete] = useState(false);
  const LogoArray = ['/sol.png', '/btc.png', '/eth.png', '/poly.png'];
  const [currentEncPrivateKey, setCurrentEncprivateKey] = useState<string | null>(null);
  const [currentDelAccount, setCurrentDelAccount] = useState<string | null>(null);

  const handleClick = () => {
    setIsVisible(prev => !prev);
  }

  const handleShowPrivateKey = (e: string) => {
    // setIsPasswordOpen(true);
    setCurrentEncprivateKey(e);
    setshowPrivateKey(true);
    setIsChainOpen(false);
    setIsOpen(false)

  }
  
  useEffect(() => {
    console.log("private Key Showinf box:- ", showPrivateKey);
    console.log("Current enc private key:- ", currentEncPrivateKey);
  }, [showPrivateKey]);
  

  useEffect(() => {
    if(wallets['SOL'].length == 0) return;
    setCurrentKey(wallets[currentChain][0].publicKey);
  }, [wallets])
  

  const Chain: ChainType[] = ['SOL', 'BTC', 'ETH', 'POLY'];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsChainOpen(false);
        setOpenMenuIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if(wallets['SOL'].length == 0) return;
      setCurrentKey(wallets[currentChain][0].publicKey);
  }, [currentChain, wallets]);

  const handleThreeDotClick = (e: string) => {
    console.log(`Publick of the of the chain:- ${currentChain} :- ${e}`);
  }
  const deleteWallet = () => {
    if (wallets[currentChain]) {
  const newWallet = wallets[currentChain].filter(
    wallet => wallet.publicKey !== currentDelAccount
  );
  
  setWallets({
    ...wallets,
    [currentChain]: newWallet
  });
  setwarningForDelete(false);
  setCurrentDelAccount(null);
  toast.success("Wallet deleted successfully");
    }
  }

  useEffect(() => {
    (async() => {
     await setItem(WalletConst, wallets)
    })()
  }, [wallets])
  
  

  useEffect(() => {
    if(wallets['SOL'].length == 0) return;
   (async() => {
     switch(currentChain){
      case 'SOL': 
                  getSolValue({publicKey: CurrentKey}).then((val: CurrentChainValueType | null) => {
                    if(!val){
                      console.log("Some error got logged:- ", val);
                      return;
                    }
                    const data = {
                      coinBalance: val.coinBalance,
                      UsdPrice: val.UsdPrice
                    }
                    setCurrentChainValue(data);
                  });
                  break;
      case 'ETH': console.log("Eth function is going to be called");
                 getEthValue({ publicKey: CurrentKey})
                 .then((res: {coinBalance: number, UsdPrice: number} | null) => {
                  if(!res){
                    toast.error("Something went wrong");
                    return;
                  }
                  const data = {
                   coinBalance: res.coinBalance,
                   UsdPrice: res.UsdPrice
                  }
                  setCurrentChainValue(data);
                  console.log("Eth function gets called");
                  console.log('Eth value:- ', res.coinBalance);
                  console.log("In USD:- ", res.UsdPrice);
                 });
                 break;
      case 'BTC': getBTCValue({ publicKey: CurrentKey })
                  .then((res: {coinBalance: number, UsdPrice: number} | null) => {
                     if(!res){
                      toast.error("Something went wrong, Try again!!");
                      return;
                     }
                     const data = {
                      coinBalance: res.coinBalance,
                      UsdPrice: res.UsdPrice
                     }
                     setCurrentChainValue(data);
                  });
                  break;
      case 'POLY': getPolyValue({ publicKey: CurrentKey })
                   .then((res: {coinBalance: number, UsdPrice: number} | null) => {
                    if(!res) {
                      toast.error("Something went wrong, Please try again!!");
                      return;
                    }
                    const data = {
                      coinBalance: res.coinBalance,
                      UsdPrice: res.UsdPrice
                    };
                    setCurrentChainValue(data);
                   });
                   break;
      default: 
            toast.error("Invalid Curreny type selected!!");
            break;

    }
   })()
  }, [CurrentKey, wallets]);

  // if(showPasswordBox){
  //   return <PasswordGate className="absolute" onClose={() => {
  //     setshowPasswordBox(false);
  //     setshowPrivateKey(true);
  //   }}/>
  // }
  
  // if(showPrivateKey){
  //   return <ShowPrivateKey onClick={() => setshowPrivateKey(false)}/>
  // }
  
  return (
    <div ref={dropdownRef} className="flex items-center justify-center relative">
      {isVisible && <AddWallet onClick={handleClick}/>}
      {showPrivateKey && currentEncPrivateKey && <ShowPrivateKey onClose={() => {
        setshowPrivateKey(false);
        setCurrentEncprivateKey(null);
      }} encprivateKey={currentEncPrivateKey}/>}
      {warningForDelete && <WarningForDeleteKey handleDelete={deleteWallet} handleCancel={() => {
        setwarningForDelete(false);
        setCurrentDelAccount(null);
      }}/>}
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-[1px] focus:outline-none focus:ring-blue-300 font-medium rounded-l-lg text-sm px-5 py-2.5 text-center inline-flex items-center cursor-pointer border-r-[2px] border-blue-200" onClick={() => {
        setIsChainOpen(prev => !prev);
        setIsOpen(false);
      }}>
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
        onClick={() => {
          setIsOpen((prev) => !prev);
          setIsChainOpen(false);
          setOpenMenuIndex(null);
        }}
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
                setOpenMenuIndex(null);
              }} key={idx} className="flex items-center justify-between py-1 px-3 cursor-pointer">
                <img src={LogoArray[idx]} alt="cryptoimg" className="w-8 h-8" />
                <div>{val}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && (
        <div className="absolute top-12 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm min-w-44 dark:bg-black border border-white dark:text-white right-0">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
           {wallets[currentChain].length == 0 ? (
            <div className="px-2 py-1">Empty Wallet..</div>
           ) : (
            wallets[currentChain].map((acc: Account, index: number) => (
              <li
                onClick={() => {
                  setCurrentKey(acc.publicKey);
                  setIsOpen(false);
                  setIsChainOpen(false);
                }}
                key={acc.publicKey}
                className={`relative flex items-center justify-between py-1 px-2 my-2 gap-3 ${
                  CurrentKey === acc.publicKey ? "outline-[2px] outline-blue-400 rounded-lg" : ""
                }`}
              >
                <div  className="px-2 text-sm flex-nowrap">
                  {acc.label.length > 5 ? acc.label.slice(0, 5) + "..." : acc.label}
                </div>

                <div
                  className="flex gap-1 cursor-pointer hover:text-gray-400"
                  onClick={async () => {
                    await navigator.clipboard.writeText(acc.publicKey);
                    toast.success("Key Copied to clipboard!");
                    setCopiedKey(acc.publicKey);
                    setTimeout(() => setCopiedKey(null), 2000);
                    setOpenMenuIndex(null);
                  }}
                >
                  <span title="copy">
                    {copiedKey === acc.publicKey ? <FaCheck /> : <FaRegCopy />}
                  </span>
                </div>

                <div>{ShortenKeys(acc.publicKey)}</div>

                <div
                  onClick={(e) => {
                    e.stopPropagation(); 
                    setOpenMenuIndex(openMenuIndex === index ? null : index);
                    handleThreeDotClick(acc.publicKey);
                    
                  }}
                  className="cursor-pointer text-white"
                >
                  <BsThreeDotsVertical />
                </div>

                {/* Mini menu */}
                {openMenuIndex === index && (
                  <div className="absolute right-0 top-8 bg-gray-800 text-white rounded-lg shadow-md min-w-32 z-10">
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-700 font-semibold" onClick={() => {
                      handleShowPrivateKey(acc.privateKey);
                    }}>
                      Show Private Key
                    </button>
                    <button
                    onClick={() => {
                      setwarningForDelete(true);
                      setCurrentDelAccount(acc.publicKey);
                      setIsChainOpen(false);
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-700 text-red-800 font-semibold">
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))
           )}
           <li className="flex items-center justify-between py-3 px-2 text-blue-600 text-sm font-semibold cursor-pointer" onClick={() => {
            setIsOpen(false);
            setIsVisible(true);
            setOpenMenuIndex(null);
           }}>+ Add a new {currentChain} Wallet.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
