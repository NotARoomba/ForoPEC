import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import MenuBar from './menuBar'

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
        <Image alt='Foro Pensando en Colombia 2023' src='/logo.png' width="0"
    height="0"
    sizes="100vw"
    style={{ width: '100%', height: 'auto', paddingTop: '5px'}}/>
        {/* MAIN PAGE, INSERT PHOTOS AND  TEXT ABOUT EH FORO*/}
      </main>
    </>
  )
}
