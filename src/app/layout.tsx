import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollEffects from "@/components/ScrollEffects";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trekking in Munnar – Guided Hikes, Sunrise Treks & Jeep Safari",
  description: "Experience the best trekking in Munnar. We offer Kolukkumalai sunrise trekking, Chokramudi trek, Meesapulimala, jeep safaris & camping. Book your adventure now!",
  keywords: "trekking in Munnar, Munnar hiking tours, Kolukkumalai sunrise trekking, Chokramudi trek, Meesapulimala trek, Munnar jeep safari, best trekking agency in Munnar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen flex flex-col pt-0 pb-0">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <ScrollEffects />
      </body>
    </html>
  );
}
