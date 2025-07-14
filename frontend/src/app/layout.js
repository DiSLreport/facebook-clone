import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./components/providers";
import Header from "./components/Header";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Effi-book",
  description: "Lonly Effi at your area",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers attribute="class">
          <Header/>
        {children}
        </Providers>


      </body>
    </html>
  );
}
