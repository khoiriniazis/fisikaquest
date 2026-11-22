import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "FisikaQuest — Taklukkan Usaha dan Energi",
  description:
    "Media pembelajaran fisika SMA yang interaktif. Jelajahi konsep usaha dan energi lewat visualisasi dan tantangan.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.19.1/dist/katex.min.css" crossOrigin="anonymous" /></head>
      <body className="min-h-full flex flex-col">
        <Script src="https://cdn.jsdelivr.net/npm/mathlive" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/katex@0.19.1/dist/katex.min.js" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}
