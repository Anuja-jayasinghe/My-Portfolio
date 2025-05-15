import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import GoToTopButton from "./components/GoToTopButton";
import Script from "next/script";

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
  openGraph: {
    images: [
      {
        url: '/website-preview.png',
        width: 1200,
        height: 630,
        alt: 'Website Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/website-preview.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-81WWQP8VE4"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-81WWQP8VE4');
          `}
        </Script>
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

