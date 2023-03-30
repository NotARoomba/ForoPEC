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
        <div className={styles.scrolling}>
  <h1>Presentantes</h1>
  <Image src="/person1.jpg" alt='person1' width={100} height={100} className={styles.image}/>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean interdum sit amet enim a semper. Maecenas congue bibendum nibh, eget feugiat ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam malesuada purus sit amet metus tristique faucibus.</p>
  <div className={styles.line}/>
  <Image src="/person2.jpg" alt='person2' width={100} height={100} className={styles.image}/>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean interdum sit amet enim a semper. Maecenas congue bibendum nibh, eget feugiat ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam malesuada purus sit amet metus tristique faucibus.</p>

</div>
      </main>
    </>
  )
}
