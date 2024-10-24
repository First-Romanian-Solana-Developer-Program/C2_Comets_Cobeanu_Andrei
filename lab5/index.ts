import { Connection, clusterApiUrl } from "@solana/web3.js";

import {
    Metaplex,
    keypairIdentity,
    bundlrStorage,
} from "@metaplex-foundation/js";

import "dotenv/config";
import {
    getExplorerLink,
    getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { createNft } from "./create-nft";
import { uploadMetadata } from "./upload-metadata";

const nftData = {
    name: "Orion NEB",
    symbol: "ORN",
    description: "Picture of Orion nebula",
    sellerFeeBasisPoints: 500,
    imageFile: "orion.jpg",
};

// TODO: BONUS example data for updating an existing NFT
// const updateNftData = {
//     name: "Update",
//     symbol: "UPDATE",
//     description: "Update Description",
//     sellerFeeBasisPoints: 100,
//     imageFile: "success.png",
// };

async function main() {
    const conn = new Connection(clusterApiUrl("devnet"));

    const user = getKeypairFromEnvironment("SECRET_KEY");

    console.log(
        `🔑 We've loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`,
    );

    const metaplex = Metaplex
    .make(conn)
    .use(keypairIdentity(user))
    .use(
        bundlrStorage({
            address: "https://devnet.bundlr.network",
            providerUrl: "https://devnet.solana.com",
            timeout:60000
        })
    )

    const uri = await uploadMetadata(metaplex, nftData)

    const nft = await createNft(metaplex, uri, nftData);

    // BONUS: Update an existing NFT
    // 1. upload updated NFT data and get the new URI for the metadata
    //const updatedUri = await uploadMetadata(metaplex, updateNftData);

    // 2. update the NFT using the helper function and the new URI from the metadata
    //await updateNftUri(metaplex, updatedUri, nft.address);
}

main()
    .then(() => {
        console.log("Finished successfully");
        process.exit(0);
    })
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });

