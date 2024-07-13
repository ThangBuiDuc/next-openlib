import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import ReactQueryProvider from "./reactQueryProvider";
import localFont from "next/font/local";
import { viVN } from "@clerk/localizations";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

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
  return (
    <ReactQueryProvider>
      <ClerkProvider localization={viVN}>
        <html lang="vi">
          <body className={`${montserrat.className} bg-white `}>
            <Script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-Z7Y9M9XWNW"
            ></Script>
            <Script>
              window.dataLayer = window.dataLayer || []; function gtag()
              {dataLayer.push(arguments)}
              gtag('js', new Date()); gtag('config', 'G-Z7Y9M9XWNW');
            </Script>

            {children}
            <SpeedInsights />
          </body>
        </html>
      </ClerkProvider>
    </ReactQueryProvider>
  );
}
