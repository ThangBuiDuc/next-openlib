import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import ReactQueryProvider from "./reactQueryProvider";
import localFont from "next/font/local";
import { viVN } from "@clerk/localizations";
import { SpeedInsights } from "@vercel/speed-insights/next";
// import { GoogleAnalytics } from "@next/third-parties/google";
// import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
// import { useEffect } from "react";

const montserrat = localFont({
  src: [
    {
      path: "./Montserrat-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
    {
      path: "./Montserrat-VariableFont_wght.ttf",
      style: "normal",
    },
  ],
  display: "auto",
});

export default function RootLayout({ children }) {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-Z7Y9M9XWNW");
  }, []);

  return (
    <ReactQueryProvider>
      <ClerkProvider localization={viVN}>
        <html lang="vi">
          <head>
            <Script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-Z7Y9M9XWNW"
              strategy="afterInteractive"
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Z7Y9M9XWNW');
            `,
              }}
            />
          </head>
          <body className={`${montserrat.className} bg-white `}>
            {/* <Analytics /> */}
            {/* <Script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-Z7Y9M9XWNW"
            ></Script>
            <Script>
              window.dataLayer = window.dataLayer || []; function gtag()
              {dataLayer.push(arguments)}
              gtag('js', new Date()); gtag('config', 'G-Z7Y9M9XWNW');
            </Script> */}

            {children}
            {/* <GoogleAnalytics gaId="G-Z7Y9M9XWNW" /> */}
            <SpeedInsights />
          </body>
        </html>
      </ClerkProvider>
    </ReactQueryProvider>
  );
}
