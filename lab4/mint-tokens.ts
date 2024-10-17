import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { mintTo } from "@solana/spl-token";
import "dotenv/config"

import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const conn = new Connection(clusterApiUrl("devnet"),
    "confirmed")

const user = getKeypairFromEnvironment(
    "SECRET_KEY"
)

const AMOUNT = 9
const DECIMALS = 6

const tokenMint = new PublicKey("Hg2uicX988eNS43R3ZwaCy8zaeXfknPvSGRvLuzn3Vmn")
//florin's account on my token
const destTokenAcc = new PublicKey("GicvnJEUXUbRqMsgeknk3DvcrzLq5udrCKkxvb6zZQwf")

//my acc
//const destTokenAcc = new PublicKey("8Pi1Bi5AWyDBU5B56qbLHbDKEPAPAL6zTC5ijdh4UAeo")

const sig = await mintTo(
    conn,
    user,
    tokenMint,
    destTokenAcc,
    user,
    AMOUNT * 10 ** DECIMALS
)

console.log("Signature", sig)

const link = getExplorerLink("address",
    tokenMint.toBase58(),
    "devnet"
)

console.log(`Minted ${AMOUNT} `)


