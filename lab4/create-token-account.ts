import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import "dotenv/config"

import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const conn = new Connection(clusterApiUrl("devnet"),
    "confirmed")

const user = getKeypairFromEnvironment(
    "SECRET_KEY"
)

//token's address
const tokenMint = new PublicKey("Hg2uicX988eNS43R3ZwaCy8zaeXfknPvSGRvLuzn3Vmn")

//florin's public key
const destPubKey = new PublicKey("39TkHzgzPUPuidbLxcJMhoANW4CrSZ9gevHynTpVKZwM")

const destTokenAcc = await getOrCreateAssociatedTokenAccount(
    conn,
    user,
    tokenMint,
    destPubKey
)

console.log("Token account created: ",
    destTokenAcc.address.toBase58())

