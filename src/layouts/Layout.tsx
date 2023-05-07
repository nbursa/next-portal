import Head from 'next/head'
import React from "react";
import {GA_TRACKING_ID} from "@/utils/analytics";
import Script from "next/script";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  classNames?: string;
}

const Layout: React.FC<LayoutProps> = ({children, title, description = "Portal | Nenad Bursać | Frontend Developer", classNames = ""}) => {
  return (
    <>
      <Head>
        <title>{`Portal | ${title || "Nenad Bursać"}`}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/favicon.png" />
      </Head>
        {GA_TRACKING_ID && (
          <>
            <Script
              id="gtag-script"
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_TRACKING_ID}');
                  `,
              }}
            />
          </>
        )}
      <main className={`px-4 py-3 h-[calc(100vh-64px)] overflow-hidden overflow-y-auto ${classNames}`}>
        {children}
      </main>
    </>
  )
}

export default Layout;