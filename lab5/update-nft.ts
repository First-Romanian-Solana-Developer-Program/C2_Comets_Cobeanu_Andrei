import { Metaplex, PublicKey } from "@metaplex-foundation/js";
import { getExplorerLink } from "@solana-developers/helpers";

// [BONUS] TODO: Implement helper function update NFT
async function updateNftUri(
    metaplex: Metaplex,
    uri: string,
    mintAddress: PublicKey,
) {
    console.log("🚀 Updating NFT URI...");
    // TODO: fetch NFT data using mint address
    const nft = null

    // TODO: update the NFT metadata
    const { respnose } = null

    const link = getExplorerLink("address", nft.address.toString(), "devnet");
    console.log(`✅ Token Mint: ${link}`);

    console.log(
        `Token Mint: https://explorer.solana.com/address/${nft.address.toString()}?cluster=devnet`,
    );

    const txLink = getExplorerLink("tx", response.signature, "devnet");
    console.log(`✅ Transaction: ${txLink}`);
}
