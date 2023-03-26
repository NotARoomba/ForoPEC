import '@/styles/globals.css'
import MenuBar from './menuBar'
//FOR GLOBAL CSS AND STUFF
export default function App({ Component, pageProps }) {
  return (<>
  <Component {...pageProps} />
  <MenuBar />
  </>)
}
