import { Connection, PublicKey } from '@solana/web3.js';
import axios from 'axios';

// Define a stable, publicly available RPC endpoint
// You can use a mainnet endpoint or a dedicated provider like Helius, Alchemy, etc.
const SOLANA_RPC_ENDPOINT = 'https://mainnet.helius-rpc.com/?api-key=0cc958f5-a505-4e82-8bbf-0bb77bce8a1e';
const CRYPTO_PRICE_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'; 

/**
 * Fetches the SOL balance for a given public key.
 * @param publicKeyString The public key as a base58 string.
 * @returns The SOL balance (in SOL, not lamports), or null on error.
 */
export async function getSolValue({ publicKey } : { publicKey: string}): Promise<{ coinBalance: number, UsdPrice: number} | null> {
    try {
        console.log("Publick key got from the somewhere:- ", publicKey)
        // 1. Establish a connection to the Solana cluster
        const connection = new Connection(SOLANA_RPC_ENDPOINT);

        // 2. Convert the string to a PublicKey object
        const pbcKey = new PublicKey(publicKey);

        // 3. Fetch the balance in lamports (1 SOL = 1,000,000,000 lamports)
        const lamports = await connection.getBalance(pbcKey);

        // 4. Convert lamports to SOL
        const solBalance = lamports / 1_000_000_000;

        const res = await axios.get(CRYPTO_PRICE_URL);
        console.log("value is getSol method:- ", solBalance, res.data.solana.usd)
        const solInUsd = res.data.solana.usd * solBalance;
        return {coinBalance: solBalance, UsdPrice: solInUsd };

    } catch (error) {
        console.error("Error fetching SOL balance:", error);
        return null;
    }
}