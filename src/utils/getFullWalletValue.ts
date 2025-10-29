import type { Account, Chain, CurrentChainValueType, Wallets } from "../context/UseWallet";
import getBTCValue from "./getBTCValue";
import getEthValue from "./getEthValue";
import getPolyValue from "./getPolyValue";
import { getSolValue } from "./getSolValue";

export default async function getFullWalletValue({
  chain,
  wallets,
}: {
  chain: Chain;
  wallets: Wallets;
}): Promise<{
  values: CurrentChainValueType[];
  totalUsdValue: number;
} | null> {
  try {
    const ValuesArray: CurrentChainValueType[] = [];
    const selectedWallets = wallets[chain];
    if (!selectedWallets) return null;

    let valueGetter: ((args: { publicKey: string }) => Promise<CurrentChainValueType | null>) | null = null;

    switch (chain) {
      case "SOL":
        valueGetter = getSolValue;
        break;
      case "BTC":
        valueGetter = getBTCValue;
        break;
      case "ETH":
        valueGetter = getEthValue;
        break;
      case "POLY":
        valueGetter = getPolyValue;
        break;
      default:
        return null;
    }

    const promises = selectedWallets.map(async (account: Account) => {
      const res = await valueGetter!({ publicKey: account.publicKey });
      if (res) ValuesArray.push(res);
    });

    await Promise.all(promises);

    const totalUsdValue = ValuesArray.reduce((sum, item) => sum + item.UsdPrice, 0);
    return { values: ValuesArray, totalUsdValue };
  } catch (error) {
    console.log("Something went wrong while fetching wallet values:", error);
    return null;
  }
}
