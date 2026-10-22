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
  metadataBase: new URL("https://munnarhikingtours.com"),
  title: "Munnar Hiking Tours – Guided Hikes, Sunrise Treks & Jeep Safari",
  description:
    "Experience the best trekking in Munnar with Munnar Hiking Tours. We offer Kolukkumalai sunrise trekking, Chokramudi trek, Meesapulimala, jeep safaris & camping. Book your adventure now!",
  keywords:
    "trekking in Munnar, Munnar hiking tours, Kolukkumalai sunrise trekking, Chokramudi trek, Meesapulimala trek, Munnar jeep safari, best trekking agency in Munnar",
  alternates: {
    canonical: "https://munnarhikingtours.com/",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    url: "https://munnarhikingtours.com/",
    siteName: "Munnar Hiking Tours",
    title: "Munnar Hiking Tours – Guided Hikes, Sunrise Treks & Jeep Safari",
    description:
      "Experience the best trekking in Munnar with Munnar Hiking Tours. We offer Kolukkumalai sunrise trekking, Chokramudi trek, Meesapulimala, jeep safaris & camping.",
    images: [
      {
        url: "https://munnarhikingtours.com/logo.png",
        width: 512,
        height: 512,
        alt: "Munnar Hiking Tours Official Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Munnar Hiking Tours – Guided Hikes, Sunrise Treks & Jeep Safari",
    description:
      "Experience the best trekking in Munnar with Munnar Hiking Tours. Guided hikes, sunrise treks & 4x4 jeep safaris.",
    images: ["https://munnarhikingtours.com/logo.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "TravelAgency"],
      "@id": "https://munnarhikingtours.com/#organization",
      name: "Munnar Hiking Tours",
      alternateName: "MHT",
      url: "https://munnarhikingtours.com/",
      logo: {
        "@type": "ImageObject",
        "@id": "https://munnarhikingtours.com/#logo",
        url: "https://munnarhikingtours.com/logo.png",
        contentUrl: "https://munnarhikingtours.com/logo.png",
        width: 512,
        height: 512,
        caption: "Munnar Hiking Tours",
      },
      image: "https://munnarhikingtours.com/logo.png",
    },
    {
      "@type": "WebSite",
      "@id": "https://munnarhikingtours.com/#website",
      url: "https://munnarhikingtours.com/",
      name: "Munnar Hiking Tours",
      publisher: {
        "@id": "https://munnarhikingtours.com/#organization",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
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
