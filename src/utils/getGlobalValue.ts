import { type globalValueType, type Wallets } from "../context/UseWallet";
import getFullWalletValue from "./getFullWalletValue";

export default async function GetGlobalValue({ wallets }: { wallets: Wallets}){
    const Values: globalValueType = { SOL: 0, BTC: 0, ETH: 0, POLY: 0 }
    try {
       const sol = await getFullWalletValue({ chain: 'SOL', wallets });
       Values['SOL'] = sol?.totalUsdValue ?? 0;
       const btc = await getFullWalletValue({ chain: 'BTC', wallets });
       Values['BTC'] = btc?.totalUsdValue ?? 0;
       const eth = await getFullWalletValue({ chain: 'ETH', wallets });
       Values['ETH'] = eth?.totalUsdValue ?? 0;
       const poly = await getFullWalletValue({ chain: 'POLY', wallets });
       console.log("Bhencho::- ", poly?.totalUsdValue);
       Values['POLY'] = poly?.totalUsdValue ?? 0;
        return Values;
    } catch (error) {
        console.log("Error :- ", error);
        return null;
    }
}