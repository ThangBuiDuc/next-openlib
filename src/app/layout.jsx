import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import ReactQueryProvider from "./reactQueryProvider";
import localFont from "next/font/local";
import { viVN } from "@clerk/localizations";

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
            {children}
          </body>
        </html>
      </ClerkProvider>
    </ReactQueryProvider>
  );
}
