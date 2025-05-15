import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import GoToTopButton from "./components/GoToTopButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Anuja Jayasinghe',
  icons: {
    icon: '/favicon.svg',
  },
  description: "Welcome to my personal portfolio website.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        
        {/* Your existing background lines */}
        <div className="background-lines z-40">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Main content */}
        <div className="relative z-50">
          {children}
        </div>

        {/* Go to Top Button */}
        <GoToTopButton />
      </body>
    </html>
  );

}

