import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers"
import bs58 from 'bs58'

const keypair = getKeypairFromEnvironment("SECRET_KEY")

console.log(`Secret key in base58: ${bs58.encode(keypair.secretKey)}`)
