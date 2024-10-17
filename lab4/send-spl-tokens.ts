import {  getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import "dotenv/config"

import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const conn = new Connection(clusterApiUrl("devnet"),
    "confirmed")

const user = getKeypairFromEnvironment(
    "SECRET_KEY"
)

const AMOUNT = 11.7
const DECIMALS = 6

console.log(`User account loaded: ${user.publicKey.toBase58()}`)

const tokenMintAcc = new PublicKey("Hg2uicX988eNS43R3ZwaCy8zaeXfknPvSGRvLuzn3Vmn")

const recipient = new PublicKey("39TkHzgzPUPuidbLxcJMhoANW4CrSZ9gevHynTpVKZwM")

const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
    conn,
    user,
    tokenMintAcc,
    user.publicKey
)

const destinationTokenAccount  = await getOrCreateAssociatedTokenAccount(
    conn,
    user,
    tokenMintAcc,
    recipient
)

const sign = await transfer(
    conn,
    user,
    sourceTokenAccount.address,
    destinationTokenAccount.address,
    user,
    AMOUNT * 10 ** DECIMALS
)

console.log("Signature: ", sign)
