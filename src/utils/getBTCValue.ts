import axios from 'axios';

export default async function getBTCValue({ publicKey }: { publicKey: string }): Promise<{ coinBalance: number, UsdPrice: number} | null> {
      try {
        const res = await axios.get(`https://blockchain.info/q/addressbalance/${publicKey}`);
          const btc = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');

        const val = Number(res.data)/1e8;
        const btcVal = btc.data.bitcoin.usd;

        return {
            coinBalance: val,
            UsdPrice: val * btcVal
        }
      } catch (error) {
        console.log("Something went wrong while fetching the real values:- ", error);
        return null;
      }
} 