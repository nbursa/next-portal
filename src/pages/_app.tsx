import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {DefaultSeo} from 'next-seo'
import Head from "next/head";
import Navigation from "@/components/navigation";
import Spotlight from "@/components/Spotlight";
import {useEffect, useState} from "react";

const App = ({Component, pageProps}: AppProps) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  if (width === 0 || height === 0) return null;

  return (
    <div className="overflow-hidden max-h-screen">
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
      <>
        <Spotlight id={1} initialX={0} initialY={0} boundaryX={[0, width / 2]} boundaryY={[0, height / 2]} ringColor="red" />
        <Spotlight id={2} initialX={width} initialY={0} boundaryX={[width / 2, width]} boundaryY={[0, height / 2]} ringColor="blue" />
        <Spotlight id={3} initialX={0} initialY={height} boundaryX={[0, width / 2]} boundaryY={[height / 2, height]} ringColor="green" />
        <Spotlight id={4} initialX={width} initialY={height} boundaryX={[width / 2, width]} boundaryY={[height / 2, height]} ringColor="yellow" />
      </>
    </div>
  )
}

export default App;
