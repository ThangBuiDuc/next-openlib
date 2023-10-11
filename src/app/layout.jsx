import "./globals.css";

import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ReactQueryProvider from "./reactQueryProvider";

const montserrat = Montserrat({ subsets: ["latin"], fallback: ["montserrat"] });

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
