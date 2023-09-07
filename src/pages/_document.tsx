import {Head, Html, Main, NextScript} from 'next/document'

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body className="relative h-screen w-screen overflow-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document;
