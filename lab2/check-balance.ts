import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js"
import { airdropIfRequired } from "@solana-developers/helpers";

const conn = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log("Connected to devnet", conn.rpcEndpoint);

const myPubKey = new PublicKey(
    "4Pp82FZHnFUnE5jtMbo2Lf5zg6kVcSLmLTsjDnxjwDvq"
)
const balanceInLamports = await conn.getBalance(myPubKey)

console.log("Done! Balance in lamports is", balanceInLamports)

await airdropIfRequired(
    conn,
    myPubKey,
    1 * LAMPORTS_PER_SOL,
    0.5 * LAMPORTS_PER_SOL
)

console.log("airdrop done")
const balanceInLamports2 = await conn.getBalance(myPubKey)
console.log("Done! Balance in lamports after airdrop is", balanceInLamports2)