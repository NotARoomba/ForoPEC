import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Foro Pensando en Colombia 2023</title>
        <meta name="description" content="Foro Pensando en Colombia 2023" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Foro Pensando en Colombia 2023</h1>
        {/* MAIN PAGE, INSERT PHOTOS AND  TEXT ABOUT EH FORO*/}
      </main>
    </>
  )
}
