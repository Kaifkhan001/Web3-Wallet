import axios from 'axios';


export default async function getPolyValue({ publicKey }: { publicKey : string}): Promise<{coinBalance: number, UsdPrice: number} | null>{
    try {
        const res = await axios.post("https://polygon-mainnet.g.alchemy.com/v2/shVqB4599lBmCdxfftkLc", {
    "jsonrpc": "2.0",
    "id": 1,
    "method": 'eth_getBalance',
    "params": [
        publicKey,
        "latest"
    ]
    }
    );
    const currentPolyVal =  await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=polygon-ecosystem-token&vs_currencies=usd");  

    const val = Number(res.data.result)/1e18;
    const usdValue = currentPolyVal.data["polygon-ecosystem-token"].usd

    return {
        coinBalance: val,
        UsdPrice: usdValue * val
    }
    } catch (error) {
        console.log("Error fetching the value from key:- ", error);
        return null;
    }
}