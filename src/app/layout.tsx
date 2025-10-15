import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SkipToContent from "@/components/ui/SkipToContent";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://costudy.co"),
  title: {
    default: "CoStudy - Student Success & Retention Platform for Universities",
    template: "%s | CoStudy",
  },
  description:
    "Increase retention and engagement with CoStudy's peer learning platform. Trusted by 50+ universities. LMS integration, SSO, analytics.",
  keywords: [
    "student retention software",
    "university engagement platform",
    "LMS study group integration",
    "peer learning software",
    "student success platform",
    "collaborative learning tools for universities",
    "Canvas LMS integration",
    "student engagement tools",
    "peer-to-peer learning software",
    "higher education retention",
    "university student engagement",
    "LMS integration tools",
    "student collaboration platform",
  ],
  authors: [{ name: "CoStudy" }],
  creator: "CoStudy",
  publisher: "CoStudy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://costudy.co",
    siteName: "CoStudy",
    title: "CoStudy - Student Success & Retention Platform for Universities",
    description:
      "Increase retention and engagement with CoStudy's peer learning platform. Trusted by 50+ universities. LMS integration, SSO, analytics.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CoStudy - Student Success Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoStudy - Student Success & Retention Platform for Universities",
    description:
      "Increase retention and engagement with CoStudy's peer learning platform. Trusted by 50+ universities. LMS integration, SSO, analytics.",
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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CoStudy",
    url: "https://costudy.co",
    logo: "https://costudy.co/og-image.png",
    description: "Student success and retention platform for universities with peer learning tools and LMS integration.",
    sameAs: [
      "https://twitter.com/costudy",
      "https://linkedin.com/company/costudy",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      email: "hello@costudy.co",
    },
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CoStudy",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "0",
      highPrice: "9",
      offerCount: "3",
    },
    description: "Increase retention and engagement with CoStudy's peer learning platform. Trusted by 50+ universities. LMS integration, SSO, analytics.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "127",
    },
  };

  return (
    <html lang="en">
      <GoogleAnalytics />
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased preload`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Remove preload class after page loads to enable animations
              window.addEventListener('load', () => {
                document.body.classList.remove('preload');
              });
            `,
          }}
        />
        <ErrorBoundary>
          <SkipToContent />
          <Header />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </ErrorBoundary>
      </body>
    </html>
  );
}
