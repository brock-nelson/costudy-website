import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies - See How Universities Transform Student Success | CoStudy",
  description: "Real results from universities using CoStudy. Learn how Stanford, UCLA, and community colleges improved student retention, engagement, and outcomes.",
  openGraph: {
    title: "Case Studies - University Success Stories | CoStudy",
    description: "See how universities are transforming student success with CoStudy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies - University Success Stories | CoStudy",
    description: "See how universities are transforming student success with CoStudy",
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* JSON-LD Schema Markup for Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Case Studies - CoStudy University Success Stories",
            description:
              "Real results from universities using CoStudy to improve student retention, engagement, and academic outcomes.",
            url: "https://costudy.co/case-studies",
            about: {
              "@type": "Product",
              name: "CoStudy",
              description:
                "Student collaboration platform that transforms how students work together",
            },
            publisher: {
              "@type": "Organization",
              name: "CoStudy",
              url: "https://costudy.co",
            },
          }),
        }}
      />
      {children}
    </>
  );
}
