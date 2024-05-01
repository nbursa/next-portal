import React from 'react';
import { GA_TRACKING_ID } from '../utils/analytics';
import Script from 'next/script';
import { NextSeo } from 'next-seo';

interface LayoutProps {
    children: React.ReactNode;
    title: string;
    description?: string;
    classNames?: string;
}

const Layout: React.FC<LayoutProps> = ({
                                           children,
                                           title,
                                           description = "",
                                           classNames = ""
                                       }) => {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <NextSeo
                title={`Portal | ${title || "Nenad Bursać"}`}
                description={description}
                openGraph={{
                    type: 'website',
                    locale: 'en_IE',
                    url: 'https://www.nenadbursac.com/',
                    siteName: 'Nenad Bursać - Senior Frontend Developer',
                }}
            />
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
            <main
                className={`w-full h-full min-h-screen max-h-screen overflow-hidden overflow-y-auto flex flex-col justify-end flex-1 bg-transparent`}>
                {children}
            </main>
        </>
    )
}

export default Layout;
