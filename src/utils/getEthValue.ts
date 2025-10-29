import axios from "axios";

// const ETH_PRICE_URL = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";

export  default async function getEthValue({ publicKey } : { publicKey: string}): Promise<{ coinBalance: number, UsdPrice: number} | null>  {
   try {
    const res = await axios.post("https://eth-mainnet.g.alchemy.com/v2/CW1mvn98bW8dXUU0IQy5_", {
        "jsonrpc": "2.0",
        "id": 1,
        "method": 'eth_getBalance',
        "params": [publicKey, "latest"]
    }); 

    const ethBalance = Number(res.data.result)/1e18;
    const usdRes = 4000
    // await axios.get(ETH_PRICE_URL);
    const usdValue = usdRes * ethBalance;
    // .data.ethereum.usd

    return {
        coinBalance: ethBalance,
        UsdPrice: usdValue
    }
   } catch (error) {
    console.log("Something went wrong while fetching the details", error);
    return { 
      coinBalance: 0,
      UsdPrice: 0
    }
   }
}