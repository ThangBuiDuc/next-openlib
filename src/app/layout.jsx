import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import ReactQueryProvider from "./reactQueryProvider";
import localFont from "next/font/local";

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
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <html lang="vi">
          <body className={`${montserrat.className} bg-white `}>
            {children}
          </body>
        </html>
      </ClerkProvider>
    </ReactQueryProvider>
  );
}
