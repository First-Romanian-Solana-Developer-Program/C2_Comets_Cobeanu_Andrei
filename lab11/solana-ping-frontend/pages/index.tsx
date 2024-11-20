import { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { AppBar } from '../components/AppBar'
import Head from 'next/head'
import WalletContextProvider from '../components/WalletContextProvider'
import { useState } from 'react'
import { useConnection } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import SendSolanaForm from '../components/SendSolanaForm'

const Home: NextPage = (props) => {
  return (
    <div className={styles.App}>
      <Head>
        <title>Wallet-Adapter Example</title>
        <meta
          name="description"
          content="Wallet-Adapter Example"
        />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <div className={styles.AppBody}>
          <SendSolanaForm />
        </div>

      </WalletContextProvider>
    </div>
  );
}

export default Home;

function useWallet(): { publicKey: any; sendTransaction: any } {
  throw new Error('Function not implemented.')
}
