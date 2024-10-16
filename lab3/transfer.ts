import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers"
import {
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
    clusterApiUrl,
    Connection,
    sendAndConfirmTransaction
} from "@solana/web3.js"

import { createMemoInstruction } from "@solana/spl-memo"

const sender = getKeypairFromEnvironment("SECRET_KEY")

const conn = new Connection(clusterApiUrl("devnet"))

console.log(`Loaded  keypair, public key is: ${sender.publicKey.toBase58()}`)

//Florin public key
const recipient = new PublicKey("39TkHzgzPUPuidbLxcJMhoANW4CrSZ9gevHynTpVKZwM")

console.log(`Attempting to send 1 SOL to ${recipient.toBase58()}`)

const transaction = new Transaction();

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: recipient,
    lamports: 1 * LAMPORTS_PER_SOL
})

transaction.add(sendSolInstruction)

const addMemoInstruction = createMemoInstruction("Hello from Solana!");

transaction.add(addMemoInstruction)

const signature = await sendAndConfirmTransaction(conn, transaction, [sender])

console.log(`Transaction confirmed, signature: ${signature}`)