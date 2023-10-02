import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], fallback: ["montserrat"] });

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body
        className={`${montserrat.className} bg-white scrollbar-none md:scrollbar md:scrollbar-track-[#ededed] md:scrollbar-thumb-[#b8b4b4]`}
      >
        {children}
      </body>
    </html>
  );
}
