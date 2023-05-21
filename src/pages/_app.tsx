import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Navigation from "@/components/navigation"
import {DefaultSeo} from 'next-seo'
import Head from "next/head";
import {ThemeProvider} from "@mui/material";
import theme from "@/theme";

const App = ({Component, pageProps}: AppProps) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Head>
          <link rel="icon" href="/icons/favicon.png"/>
          <meta name="viewport" content="initial-scale=1, width=device-width"/>
        </Head>
        <DefaultSeo
          title="Nenad Bursać - Senior Frontend Developer"
          description="I'm Nenad Bursać, a seasoned Senior Frontend Developer who boasts over eight years of expertise in the realm of web development. My areas of expertise span across JavaScript, creative coding, and AI, and I'm particularly adept at developing intuitive and visually striking user interfaces."
          canonical="https://www.nenadbursac.com/"
          openGraph={{
            type: 'website',
            locale: 'en_IE',
            url: 'https://www.nenadbursac.com/',
            siteName: 'Nenad Bursać - Senior Frontend Developer',
          }}
          themeColor="#000000"
        />
        <Navigation/>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App;