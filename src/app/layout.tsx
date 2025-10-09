import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SkipToContent from "@/components/ui/SkipToContent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://costudy.co"),
  title: {
    default: "CoStudy - Transform Student Collaboration",
    template: "%s | CoStudy",
  },
  description:
    "Empower students with structured teamwork tools. CoStudy provides team charters, growth-goal scales, and peer feedback for meaningful collaboration.",
  keywords: [
    "student collaboration",
    "teamwork",
    "peer feedback",
    "education technology",
    "collaborative learning",
    "team-based learning",
    "student engagement",
  ],
  authors: [{ name: "CoStudy" }],
  creator: "CoStudy",
  publisher: "CoStudy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://costudy.co",
    siteName: "CoStudy",
    title: "CoStudy - Transform Student Collaboration",
    description:
      "Empower students with structured teamwork tools. CoStudy provides team charters, growth-goal scales, and peer feedback for meaningful collaboration.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CoStudy - Transform Student Collaboration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoStudy - Transform Student Collaboration",
    description:
      "Empower students with structured teamwork tools. CoStudy provides team charters, growth-goal scales, and peer feedback for meaningful collaboration.",
    images: ["/og-image.png"],
    creator: "@costudy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <SkipToContent />
        <Header />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
