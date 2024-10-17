import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { createMint } from "@solana/spl-token";
import "dotenv/config"

import { Connection, clusterApiUrl } from "@solana/web3.js";

const conn = new Connection(clusterApiUrl("devnet"),
    "confirmed")

const user = getKeypairFromEnvironment(
    "SECRET_KEY"
)

const DECIMALS = 6
console.log(`User account loaded: ${user.publicKey.toBase58()}`)

const tokenMint = await createMint(
    conn,
    user,
    user.publicKey,
    null,
    DECIMALS
)

const link = getExplorerLink("address",
    tokenMint.toBase58(), "devnet")

console.log(`Token mint created:${link}`)

