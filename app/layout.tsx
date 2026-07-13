import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "./components/mobile-nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "4Geeks Travel",
  description: "4Geeks Travel - encuentra estadias y experiencias.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="app-page-shell">
          <header className="app-global-header" aria-label="Cabecera del sitio">
            <Link href="/" aria-label="Ir al inicio" className="app-logo-corner">
              <Image src="/logo-staynest.svg" alt="4Geeks Travel" width={154} height={28} priority />
            </Link>
          </header>
          {children}
        </div>
        <MobileNav />
      </body>
    </html>
  );
}
