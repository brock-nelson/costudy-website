import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press & Media Kit - CoStudy",
  description: "Download CoStudy brand assets, logos, screenshots, and press materials. Media kit for journalists, conference organizers, and partners.",
  openGraph: {
    title: "Press & Media Kit - CoStudy",
    description: "Download CoStudy brand assets, logos, screenshots, and press materials. Media kit for journalists, conference organizers, and partners.",
    type: "website",
    url: "https://costudy.co/press",
  },
  twitter: {
    card: "summary_large_image",
    title: "Press & Media Kit - CoStudy",
    description: "Download CoStudy brand assets, logos, screenshots, and press materials. Media kit for journalists, conference organizers, and partners.",
  },
};

const brandColors = [
  { name: "Primary Blue", hex: "#6B3DCB", rgb: "107, 61, 203" },
  { name: "Secondary Purple", hex: "#9333EA", rgb: "147, 51, 234" },
  { name: "Accent Green", hex: "#10B981", rgb: "16, 185, 129" },
  { name: "Light Background", hex: "#EDE7F9", rgb: "237, 231, 249" },
];

const logos = [
  { name: "Full Color Logo", file: "logo_purple.svg", format: "SVG" },
  { name: "White Logo", file: "logo_white.svg", format: "SVG" },
  { name: "Black Logo", file: "logo_black.svg", format: "SVG" },
];

const companyFacts = [
  { label: "Founded", value: "2024" },
  { label: "Headquarters", value: "United States" },
  { label: "Website", value: "costudy.co", link: "https://costudy.co" },
  { label: "Focus", value: "Student Collaboration & Teamwork" },
];

const leadership = [
  {
    name: "Brock Nelson",
    title: "Co-Founder",
    bio: "Passionate about transforming student collaboration through evidence-based tools and structured teamwork frameworks.",
    image: "/press-kit/headshots/brock-nelson.jpg",
    linkedin: "#",
    twitter: "#",
  },
];

const pressReleases = [
  {
    title: "CoStudy Launches to Transform Student Collaboration",
    date: "2024",
    description: "CoStudy introduces structured teamwork tools for higher education.",
  },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-700 dark:via-purple-700 dark:to-pink-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-12 left-12 text-5xl opacity-20 animate-float">📰</div>
          <div className="absolute top-20 right-16 text-4xl opacity-20 animate-bounce">📸</div>
          <div className="absolute bottom-16 left-1/4 text-4xl opacity-20 animate-pulse">🎨</div>
          <div className="absolute bottom-20 right-1/3 text-3xl opacity-20 animate-spin-slow">✨</div>

          <div className="absolute -top-10 -left-10 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-gradient-to-tl from-yellow-400/20 to-transparent rounded-full blur-3xl animate-float"></div>

          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 animate-pulse-slow">
                <span className="text-sm font-semibold">📦 Media Resources & Brand Assets</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              Press & Media Kit
            </h1>
            <p className="text-xl leading-relaxed drop-shadow-md text-white/95">
              Download brand assets, logos, screenshots, and press materials for CoStudy.
              Everything you need for articles, presentations, and media coverage.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#6B3DCB] dark:text-[#E9EEFF]">
            About CoStudy
          </h2>
          <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-4 leading-relaxed">
            CoStudy is a student collaboration platform that helps universities increase retention
            and student success through structured teamwork tools and peer learning. We provide
            team charters, growth-goal scales, and peer feedback systems that make collaboration
            visible and intentional.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {companyFacts.map((fact, index) => (
              <div key={index} className="bg-[#EDE7F9] dark:bg-[#1a1a1a] p-4 rounded-lg">
                <div className="text-sm text-[#6B3DCB] dark:text-[#E9EEFF] font-semibold mb-1">
                  {fact.label}
                </div>
                {fact.link ? (
                  <a
                    href={fact.link}
                    className="text-[#2D3748] dark:text-[#E9EEFF] hover:text-[#6B3DCB] dark:hover:text-[#A78BFA] transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {fact.value}
                  </a>
                ) : (
                  <div className="text-[#2D3748] dark:text-[#E9EEFF]">{fact.value}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="bg-[#EDE7F9] dark:bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#6B3DCB] dark:text-[#E9EEFF]">
            Quick Facts
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#6B3DCB] dark:text-[#A78BFA] mb-2">
                100%
              </div>
              <div className="text-[#4A5568] dark:text-[#A0AEC0]">
                Cloud-based platform
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#6B3DCB] dark:text-[#A78BFA] mb-2">
                Web + Mobile
              </div>
              <div className="text-[#4A5568] dark:text-[#A0AEC0]">
                Available on all platforms
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#6B3DCB] dark:text-[#A78BFA] mb-2">
                FERPA
              </div>
              <div className="text-[#4A5568] dark:text-[#A0AEC0]">
                Compliant & secure
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#6B3DCB] dark:text-[#A78BFA] mb-2">
                24/7
              </div>
              <div className="text-[#4A5568] dark:text-[#A0AEC0]">
                Support available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos & Brand Assets */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#6B3DCB] dark:text-[#E9EEFF]">
            Logos & Brand Assets
          </h2>
          <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-8">
            Our logos are available in multiple formats. Please maintain proper clear space
            and do not modify, distort, or recolor the logos.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {logos.map((logo, index) => (
              <div key={index} className="bg-white dark:bg-[#1a1a1a] border-2 border-[#EDE7F9] dark:border-[#2D3748] rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-[#EDE7F9] dark:bg-[#2D3748] rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-[#6B3DCB] dark:text-[#E9EEFF] font-bold">
                    {logo.name}
                  </div>
                </div>
                <h3 className="font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-2">
                  {logo.name}
                </h3>
                <div className="text-sm text-[#4A5568] dark:text-[#A0AEC0] mb-4">
                  Format: {logo.format}
                </div>
                <button className="w-full bg-[#6B3DCB] hover:bg-[#5B2DBB] text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Colors */}
      <section className="bg-[#EDE7F9] dark:bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#6B3DCB] dark:text-[#E9EEFF]">
              Brand Colors
            </h2>
            <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-8">
              Our color palette reflects our commitment to creating an engaging and
              professional learning environment.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {brandColors.map((color, index) => (
                <div key={index} className="bg-white dark:bg-[#2D3748] rounded-lg overflow-hidden shadow-md">
                  <div
                    className="h-32 w-full"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-2">
                      {color.name}
                    </h3>
                    <div className="text-sm text-[#4A5568] dark:text-[#A0AEC0] space-y-1">
                      <div>HEX: {color.hex}</div>
                      <div>RGB: {color.rgb}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Screenshots */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#6B3DCB] dark:text-[#E9EEFF]">
            Product Screenshots
          </h2>
          <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-8">
            High-resolution screenshots of our platform. All images are at least 1920x1080
            and suitable for print and digital media.
          </p>
          <div className="bg-white dark:bg-[#1a1a1a] border-2 border-[#EDE7F9] dark:border-[#2D3748] rounded-lg p-8 text-center">
            <div className="aspect-video bg-[#EDE7F9] dark:bg-[#2D3748] rounded-lg mb-4 flex items-center justify-center">
              <div className="text-[#6B3DCB] dark:text-[#E9EEFF]">
                <div className="text-4xl mb-2">📸</div>
                <div className="font-semibold">Product Screenshots</div>
                <div className="text-sm text-[#4A5568] dark:text-[#A0AEC0] mt-2">
                  Coming Soon
                </div>
              </div>
            </div>
            <p className="text-[#4A5568] dark:text-[#A0AEC0]">
              Contact us for access to product screenshots and demo materials.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="bg-[#EDE7F9] dark:bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#6B3DCB] dark:text-[#E9EEFF]">
              Leadership Team
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {leadership.map((person, index) => (
                <div key={index} className="bg-white dark:bg-[#2D3748] rounded-lg p-6 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-24 bg-[#EDE7F9] dark:bg-[#4A5568] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">👤</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#2D3748] dark:text-[#E9EEFF] mb-1">
                        {person.name}
                      </h3>
                      <div className="text-[#6B3DCB] dark:text-[#A78BFA] font-semibold mb-3">
                        {person.title}
                      </div>
                      <p className="text-sm text-[#4A5568] dark:text-[#A0AEC0] mb-3">
                        {person.bio}
                      </p>
                      <div className="flex gap-3">
                        <a
                          href={person.linkedin}
                          className="text-[#6B3DCB] dark:text-[#A78BFA] hover:underline text-sm"
                        >
                          LinkedIn
                        </a>
                        <a
                          href={person.twitter}
                          className="text-[#6B3DCB] dark:text-[#A78BFA] hover:underline text-sm"
                        >
                          Twitter
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#6B3DCB] dark:text-[#E9EEFF]">
            Press Releases
          </h2>
          <div className="space-y-4">
            {pressReleases.map((release, index) => (
              <div key={index} className="bg-white dark:bg-[#1a1a1a] border-2 border-[#EDE7F9] dark:border-[#2D3748] rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[#2D3748] dark:text-[#E9EEFF]">
                    {release.title}
                  </h3>
                  <span className="text-sm text-[#4A5568] dark:text-[#A0AEC0] whitespace-nowrap ml-4">
                    {release.date}
                  </span>
                </div>
                <p className="text-[#4A5568] dark:text-[#A0AEC0] mb-4">
                  {release.description}
                </p>
                <button className="text-[#6B3DCB] dark:text-[#A78BFA] hover:underline font-semibold">
                  Read Full Release →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="bg-[#EDE7F9] dark:bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-[#6B3DCB] dark:text-[#E9EEFF]">
              As Featured In
            </h2>
            <p className="text-center text-[#4A5568] dark:text-[#A0AEC0] mb-8">
              CoStudy has been featured in leading education technology publications.
            </p>
            <div className="bg-white dark:bg-[#2D3748] rounded-lg p-12 text-center">
              <div className="text-[#4A5568] dark:text-[#A0AEC0]">
                Media coverage coming soon
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#6B3DCB] dark:text-[#E9EEFF]">
            Media Contact
          </h2>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-[#6B3DCB] dark:border-[#A78BFA] rounded-lg p-8">
            <p className="text-lg text-[#2D3748] dark:text-[#E9EEFF] mb-6">
              For press inquiries, interviews, or additional information:
            </p>
            <div className="space-y-3 text-[#4A5568] dark:text-[#A0AEC0]">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-[#6B3DCB] dark:text-[#A78BFA]">Email:</span>
                <a
                  href="mailto:press@costudy.co"
                  className="hover:underline"
                >
                  press@costudy.co
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-[#6B3DCB] dark:text-[#A78BFA]">Response Time:</span>
                <span>Within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download All Assets */}
      <section className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-700 dark:via-purple-700 dark:to-pink-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg">
            Download Complete Press Kit
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md text-white/95">
            Get all logos, screenshots, brand guidelines, and press materials in one convenient package.
          </p>
          <button className="group bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all hover:scale-105 shadow-lg hover:shadow-xl">
            <span className="flex items-center justify-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              Download Press Kit (ZIP)
            </span>
          </button>
          <p className="mt-4 text-sm text-white/80">
            Includes: Logos, brand guidelines, screenshots, and company information
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#6B3DCB] dark:text-[#E9EEFF]">
            Need Something Else?
          </h2>
          <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-8">
            Have questions or need additional materials? We&apos;re here to help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#6B3DCB] hover:bg-[#5B2DBB] text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg"
          >
            Contact Us
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
