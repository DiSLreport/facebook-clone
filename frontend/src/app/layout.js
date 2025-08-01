import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./components/providers";

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
  description: "lonely Effi at your area",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* {hideHeader ?(
          {children}

        ):( */}
          <Providers attribute="class">
          {children}
          </Providers>
        {/* ) */}
        {/* } */}
        {/* <Providers attribute="class">
          {/* <LayoutWrapper> */}
          {/* {children} */}
          {/* </LayoutWrapper> */}
        {/* </Providers> */}
      </body>
    </html>
  );
}
