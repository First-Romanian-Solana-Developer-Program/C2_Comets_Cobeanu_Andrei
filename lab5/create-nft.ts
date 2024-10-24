import { Metaplex, Nft } from "@metaplex-foundation/js";
import { getExplorerLink } from "@solana-developers/helpers";

interface NftData {
    name: string;
    symbol: string;
    description: string;
    sellerFeeBasisPoints: number;
    imageFile: string;
}

export async function createNft(
    metaplex: Metaplex,
    uri: string,
    nftData: NftData,
): Promise<Nft> {
    console.log("🚀 Creating NFT...");

    const { nft } = await metaplex.nfts().create({
        uri: uri,
        name: nftData.name,
        sellerFeeBasisPoints: 500,
        symbol: nftData.symbol
    }, { commitment: "finalized"})

    const link = getExplorerLink("address", nft.address.toBase58(), "devnet");
    console.log(`✅ Token Mint: ${link}`);

    return nft;
}