// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import useWallet from "../context/UseWallet"
import Slot from "./Slot"
import { getSolValue } from "../utils/getSolValue";
import getBTCValue from "../utils/getBTCValue";
import getEthValue from "../utils/getEthValue";
import getPolyValue from "../utils/getPolyValue";
// import { getSolValue } from "../utils/getSolValue";

// interface ValueArray {
//   coinBalance: number,
//   UsdPrice: number
// }

type CoinType = {
    coinBalance: number
    UsdPrice: number
  
}

const Tokens = () => {
  const { wallets } = useWallet();
  const [SolValue, setSolValue] = useState<CoinType>({
    coinBalance: 0,
    UsdPrice: 0
  });
  const [BtcValue, setBtcValue] = useState<CoinType>({
    coinBalance: 0,
    UsdPrice: 0
  });
  const [EthValue, setEthValue] = useState({
    coinBalance: 0,
    UsdPrice: 0
  });
  const [PolyValue, setPolyValue] = useState({
    coinBalance: 0,
    UsdPrice: 0
  });

  useEffect(() => {
    (async() => {
      const sol = await getSolValue({ publicKey: wallets['SOL'][0].publicKey});
      if (sol) setSolValue(sol);
      const btc = await getBTCValue({ publicKey: wallets['BTC'][0].publicKey});
      if(btc) setBtcValue(btc);
      const eth = await getEthValue({ publicKey: wallets['ETH'][0].publicKey});
      if(eth) setEthValue(eth);
      const poly = await getPolyValue({ publicKey: wallets['POLY'][0].publicKey});
      if(poly) setPolyValue(poly);
    })()
  }, [])
  
  
  return (
    <div className="px-8 text-2xl">
     Tokens :-
     <div className="w-full min-h-32 border-[1px] border-white rounded-2xl  my-6 py-3 px-2 flex flex-col gap-3">
       {/* <div className="w-full min-h-32 border-[1px] border-white rounded-2xl  my-6 py-3 px-2 flex flex-col gap-3">
        {SOLarray && SOLarray.map((val, index) => (
          <Slot 
          key={index}
          src="/sol.png" 
          TokenName="SOL" 
          TokenValue={val.coinBalance} 
          CurrentPrice={`${val.UsdPrice}$`} 
          TodayUpdate="+0.5$"
          ismore
          />
        ))}
       </div> */}
        <Slot src="/sol.png" TokenName="SOL" TokenValue={SolValue.coinBalance} CurrentPrice={`${SolValue.UsdPrice}`} TodayUpdate="+0.5$" isMoreThanOne={wallets['SOL'].length > 1 ? true : false} walletName={wallets['SOL'][0].label}/>

        <Slot src="/btc.png" TokenName="BTC" TokenValue={BtcValue.coinBalance} CurrentPrice={`${BtcValue.UsdPrice}`} TodayUpdate="+0.5$" isMoreThanOne={wallets['BTC'].length > 1 ? true : false}  walletName={wallets['BTC'][0].label}/>

        <Slot src="/eth.png" TokenName="ETH" TokenValue={EthValue.coinBalance} CurrentPrice={`${EthValue.UsdPrice}`} TodayUpdate="+0.5$" isMoreThanOne={wallets['ETH'].length > 1 ? true : false}  walletName={wallets['ETH'][0].label}/>

      <Slot src="/poly.png" TokenName="POLY" TokenValue={PolyValue.coinBalance} CurrentPrice={`${PolyValue.UsdPrice}`} TodayUpdate="+0.5$"
      isMoreThanOne={wallets['POLY'].length > 1 ? true : false}
       walletName={wallets['POLY'][0].label}/>
     </div>
    </div>
  )
}

export default Tokens
