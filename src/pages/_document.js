import { Html, Head, Main, NextScript } from 'next/document'
import { MenuBar } from './menuBar'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
      <MenuBar />
    </Html>
  )
}
