import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Favorites } from "../target/types/favorites";

import { assert, use } from "chai";
import { web3 } from "@coral-xyz/anchor";

describe("favorites", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const user = (provider.wallet as anchor.Wallet).payer;
  const program = anchor.workspace.Favorites as Program<Favorites>;

  before(async () => {
    const balance = await provider.connection.getBalance(user.publicKey);
    const balanceInSol = balance / web3.LAMPORTS_PER_SOL;
    const formattedBalance = new Intl.NumberFormat().format(balanceInSol);

    console.log(`Balance of account ${user.publicKey}: ${formattedBalance} SOL`);
  })

  it("Save user's favourites to the blockchain!", async () => {
    const favoriteNumber = new anchor.BN(23);
    const favoriteColor = "purple";
    const favoriteHobies = ["skiing", "skydiving", "biking"];

    let txtHash = await program.methods
      .setFavorites(favoriteNumber, favoriteColor, favoriteHobies)
      .signers([user])
      .rpc();
    console.log("txtHash", txtHash);


    const [favoritePda, favoriteBump] = web3.PublicKey
      .findProgramAddressSync(
        [Buffer.from("favorites"), user.publicKey.toBuffer()],
        program.programId
      );

    const favoriteAccount = await program.account.favorites.fetch(favoritePda)

    assert.equal(favoriteAccount.number.toString(), favoriteNumber.toString());
    assert.equal(favoriteAccount.color, favoriteColor);
    assert.deepEqual(favoriteAccount.hobbies, favoriteHobies);
  });
});
