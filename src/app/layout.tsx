import type { Metadata } from "next";
import { Turret_Road, Numans } from "next/font/google";
import "./globals.css";

const turretRoad = Turret_Road({
  weight: ["400", "500", "700", "800"],
  variable: "--font-turret-road",
  subsets: ["latin"],
});

const numans = Numans({
  weight: "400",
  variable: "--font-numans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anuja Jayasinghe | Portfolio",
  description: "Personal Portfolio of Anuja Jayasinghe, a continuous learner and software engineer.",
  icons: [
    {
      media: "(prefers-color-scheme: light)",
      url: "/logo-black.svg",
      href: "/logo-black.svg",
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: "/logo-white.svg",
      href: "/logo-white.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${numans.variable} ${turretRoad.variable} font-sans antialiased bg-white text-black min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
