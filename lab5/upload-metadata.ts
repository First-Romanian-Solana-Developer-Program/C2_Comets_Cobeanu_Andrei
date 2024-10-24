import { Metaplex, toMetaplexFile } from "@metaplex-foundation/js";
import fs from 'fs'

interface NftData {
    name: string;
    symbol: string;
    description: string;
    sellerFeeBasisPoints: number;
    imageFile: string;
}

export async function uploadMetadata(
    metaplex: Metaplex,
    nftData: NftData,
): Promise<string> {
    console.log("🚀 Uploading metadata...");

    const buffer = fs.readFileSync(nftData.imageFile)

    const file = toMetaplexFile(buffer, nftData.imageFile)

    const imageUri = await metaplex.storage().upload(file)

    console.log("image uri:", imageUri);

    const { uri } = await metaplex.nfts().uploadMetadata({
        name: nftData.name,
        symbol: nftData.symbol,
        description: nftData.description,
        image: imageUri
    })

    console.log("Done ✅! Metadata uri:", uri);

    return uri;
}