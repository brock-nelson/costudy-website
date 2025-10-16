import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import universities from "@/data/universities.json";
import { University } from "@/types/university";
import DynamicDots from "@/components/ui/DynamicDots";
import GradientText from "@/components/ui/GradientText";

// Cast the imported JSON to the correct type
const universitiesData = universities as University[];

// Generate static params for all universities at build time
export async function generateStaticParams() {
  return universitiesData.map((university) => ({
    slug: university.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const university = universitiesData.find((u) => u.slug === slug);

  if (!university) {
    return {
      title: "University Not Found",
    };
  }

  return {
    title: `CoStudy for ${university.name} | Student Collaboration Platform`,
    description: `Empower ${university.name} students with CoStudy's structured teamwork tools. Join ${university.stats.students.toLocaleString()} students already using our platform.`,
    openGraph: {
      title: `CoStudy for ${university.name}`,
      description: `Transform student collaboration at ${university.name} with structured teamwork tools and proven results.`,
      url: `https://costudy.co/universities/${university.slug}`,
      images: [
        {
          url: `/og-universities/${university.slug}.png`,
          width: 1200,
          height: 630,
          alt: `CoStudy for ${university.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `CoStudy for ${university.name}`,
      description: `Transform student collaboration at ${university.name} with structured teamwork tools and proven results.`,
    },
  };
}

// Feature highlights based on institution type
const getFeaturesByInstitutionType = (type: string) => {
  const features = {
    "research-university": [
      {
        title: "Advanced Analytics",
        description:
          "Track collaboration patterns and research team dynamics with detailed insights.",
        icon: "📊",
      },
      {
        title: "Cross-Disciplinary Teams",
        description:
          "Support diverse research groups spanning multiple departments.",
        icon: "🔬",
      },
      {
        title: "Publication-Ready Skills",
        description:
          "Develop collaboration skills essential for academic research careers.",
        icon: "📚",
      },
    ],
    "doctoral-university": [
      {
        title: "Research Team Support",
        description: "Tools designed for graduate-level research collaboration.",
        icon: "🎓",
      },
      {
        title: "Mentor-Student Tracking",
        description: "Monitor and improve advisor-student relationships.",
        icon: "👥",
      },
      {
        title: "Professional Development",
        description: "Build skills for academic and industry careers.",
        icon: "💼",
      },
    ],
    "masters-college": [
      {
        title: "Career-Focused Skills",
        description:
          "Develop collaboration competencies employers are looking for.",
        icon: "🎯",
      },
      {
        title: "Industry Connections",
        description: "Showcase teamwork abilities to potential employers.",
        icon: "🤝",
      },
      {
        title: "Practical Application",
        description: "Apply teamwork frameworks to real-world projects.",
        icon: "⚡",
      },
    ],
    "baccalaureate-college": [
      {
        title: "Small Group Excellence",
        description: "Perfect for intimate liberal arts learning communities.",
        icon: "👨‍🎓",
      },
      {
        title: "Discussion-Based Learning",
        description: "Enhance seminar-style courses with structured teamwork.",
        icon: "💬",
      },
      {
        title: "Holistic Development",
        description: "Support well-rounded education and personal growth.",
        icon: "🌟",
      },
    ],
    "community-college": [
      {
        title: "Mobile-First Design",
        description: "Access everywhere, from any device, for busy students.",
        icon: "📱",
      },
      {
        title: "Affordable Excellence",
        description: "Enterprise features at community college pricing.",
        icon: "💰",
      },
      {
        title: "Transfer-Ready Skills",
        description: "Build collaboration skills that transfer anywhere.",
        icon: "🚀",
      },
    ],
    "for-profit-university": [
      {
        title: "Career Outcomes",
        description: "Demonstrate employability skills to accreditors.",
        icon: "📈",
      },
      {
        title: "Flexible Learning",
        description: "Support working students with async collaboration tools.",
        icon: "⏰",
      },
      {
        title: "ROI Tracking",
        description: "Measure and report student success metrics.",
        icon: "💡",
      },
    ],
  };

  return (
    features[type as keyof typeof features] || features["research-university"]
  );
};

export default async function UniversityPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const queryParams = await searchParams;

  const university = universitiesData.find((u) => u.slug === slug);

  if (!university) {
    notFound();
  }

  const features = getFeaturesByInstitutionType(university.type);

  // Build UTM parameters for tracking
  const utmParams = new URLSearchParams();
  utmParams.set("utm_source", queryParams.utm_source as string || "university-landing");
  utmParams.set("utm_medium", queryParams.utm_medium as string || "website");
  utmParams.set("utm_campaign", queryParams.utm_campaign as string || university.slug);

  // Pre-fill demo form with university context
  const demoUrl = `/demo?university=${encodeURIComponent(university.name)}&${utmParams.toString()}`;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <section
        className="relative container mx-auto px-4 py-24 md:py-32 overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <DynamicDots />
        <div className="hero-content text-center max-w-5xl mx-auto relative z-10">
          {/* University Logo (if available) */}
          {/* <div className="mb-8">
            <img
              src={university.logo}
              alt={`${university.name} logo`}
              className="h-16 mx-auto opacity-80"
            />
          </div> */}

          {/* Main Heading */}
          <h1
            id="hero-heading"
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-[1.1]"
          >
            <GradientText>
              {university.name}, empower your students with CoStudy
            </GradientText>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-[#5E6E76] dark:text-[#A0AEC0] mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
            Join the{" "}
            <span className="font-bold text-purple-600 dark:text-purple-400">
              {university.stats.students.toLocaleString()} students
            </span>{" "}
            at {university.name} who are already transforming their collaboration
            skills with CoStudy.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={demoUrl}
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden"
              aria-label={`Schedule a demo for ${university.name}`}
            >
              <span className="relative z-10 flex items-center gap-2">
                Schedule a Demo for {university.name}
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              href="/contact"
              className="group bg-white dark:bg-[#1a1a1a] text-[#4A12C0] dark:text-[#A78BFA] px-8 py-4 rounded-xl font-semibold border-2 border-purple-200 dark:border-[#404040] hover:border-purple-300 dark:hover:border-[#606060] hover:bg-purple-50/50 dark:hover:bg-purple-900/30 transition-all duration-300 hover:shadow-lg"
              aria-label="Contact us for more information"
            >
              <span className="flex items-center gap-2">
                Get a Custom Quote
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </Link>
          </div>

          {/* University Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-black text-purple-600 dark:text-purple-400 mb-2">
                {university.stats.studyGroups.toLocaleString()}+
              </div>
              <div className="text-sm text-[#5E6E76] dark:text-[#A0AEC0]">
                Active Study Groups
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-purple-600 dark:text-purple-400 mb-2">
                {university.stats.students.toLocaleString()}+
              </div>
              <div className="text-sm text-[#5E6E76] dark:text-[#A0AEC0]">
                Students Engaged
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-purple-600 dark:text-purple-400 mb-2">
                {university.stats.retentionImprovement}
              </div>
              <div className="text-sm text-[#5E6E76] dark:text-[#A0AEC0]">
                Retention Improvement
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section
        className="py-20 bg-gray-50 dark:bg-[#1a1a1a]"
        aria-labelledby="testimonial-heading"
      >
        <div className="container mx-auto px-4">
          <h2
            id="testimonial-heading"
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#6B3DCB] dark:text-[#E9EEFF]"
          >
            Trusted by Leading Institutions
          </h2>

          {/* Testimonial */}
          <div className="max-w-4xl mx-auto bg-white dark:bg-[#0a0a0a] rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                {/* <img
                  src={university.testimonial.photo}
                  alt={university.testimonial.author}
                  className="w-24 h-24 rounded-full object-cover"
                /> */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                  {university.testimonial.author.charAt(0)}
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <blockquote className="text-xl text-[#374045] dark:text-[#E9EEFF] mb-4 leading-relaxed italic">
                  &quot;{university.testimonial.quote}&quot;
                </blockquote>
                <div className="text-[#5E6E76] dark:text-[#A0AEC0]">
                  <div className="font-semibold text-[#2D3748] dark:text-white">
                    {university.testimonial.author}
                  </div>
                  <div>{university.testimonial.title}</div>
                  <div className="text-sm text-purple-600 dark:text-purple-400 font-medium mt-1">
                    {university.name}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Peer Institution Logos */}
          <div className="mt-16 text-center">
            <p className="text-sm text-[#92A2AA] dark:text-[#A0AEC0] mb-6">
              Join other leading institutions using CoStudy
            </p>
            <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
              {/* Placeholder for peer institution logos */}
              <div className="text-[#5E6E76] dark:text-[#A0AEC0] font-semibold">
                Stanford
              </div>
              <div className="text-[#5E6E76] dark:text-[#A0AEC0] font-semibold">
                MIT
              </div>
              <div className="text-[#5E6E76] dark:text-[#A0AEC0] font-semibold">
                Berkeley
              </div>
              <div className="text-[#5E6E76] dark:text-[#A0AEC0] font-semibold">
                Harvard
              </div>
              <div className="text-[#5E6E76] dark:text-[#A0AEC0] font-semibold">
                Yale
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Institution-Type Specific */}
      <section className="py-20" aria-labelledby="features-heading">
        <div className="container mx-auto px-4">
          <h2
            id="features-heading"
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#6B3DCB] dark:text-[#E9EEFF]"
          >
            Built for {university.name}
          </h2>
          <p className="text-center text-[#5E6E76] dark:text-[#A0AEC0] mb-16 max-w-2xl mx-auto">
            Features designed specifically for{" "}
            {university.type.replace(/-/g, " ")} environments
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group text-center p-8 rounded-2xl border border-purple-100 dark:border-[#404040] hover:border-purple-200 dark:hover:border-[#606060] bg-white dark:bg-[#1a1a1a] hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E9EEFF]">
                  {feature.title}
                </h3>
                <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        className="py-20 bg-gray-50 dark:bg-[#1a1a1a]"
        aria-labelledby="pricing-heading"
      >
        <div className="container mx-auto px-4">
          <h2
            id="pricing-heading"
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#6B3DCB] dark:text-[#E9EEFF]"
          >
            Pricing for {university.name}
          </h2>
          <p className="text-center text-[#5E6E76] dark:text-[#A0AEC0] mb-12 max-w-2xl mx-auto">
            Flexible pricing based on your institution&apos;s size and needs
          </p>

          <div className="max-w-4xl mx-auto bg-white dark:bg-[#0a0a0a] rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-[#2D3748] dark:text-[#E9EEFF]">
                  Estimated Investment
                </h3>
                <p className="text-[#5E6E76] dark:text-[#A0AEC0] mb-6 leading-relaxed">
                  Based on approximately{" "}
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    {university.studentCount.toLocaleString()} students
                  </span>
                  , we can create a custom package that fits your budget and
                  goals.
                </p>
                <ul className="space-y-3 text-[#4A5568] dark:text-[#A0AEC0]">
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Unlimited students and teams
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    LMS integration included
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Dedicated support and training
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Advanced analytics and reporting
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-8 rounded-xl border border-purple-200 dark:border-[#404040]">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-black text-purple-600 dark:text-purple-400 mb-2">
                      Custom
                    </div>
                    <div className="text-[#5E6E76] dark:text-[#A0AEC0]">
                      Tailored to your needs
                    </div>
                  </div>
                  <Link
                    href={demoUrl}
                    className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-center"
                  >
                    Get Your Custom Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2
              id="cta-heading"
              className="text-3xl md:text-4xl font-bold mb-6 text-[#374045] dark:text-[#E9EEFF]"
            >
              Ready to transform collaboration at {university.name}?
            </h2>
            <p className="text-xl text-[#5E6E76] dark:text-[#A0AEC0] mb-10 leading-relaxed">
              Join the thousands of students and faculty already experiencing
              better teamwork with CoStudy.
            </p>
            <Link
              href={demoUrl}
              className="group relative bg-blue-600 text-white px-10 py-5 rounded-xl font-semibold hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-300 inline-block shadow-md overflow-hidden"
              aria-label={`Schedule demo for ${university.name}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative">
                Schedule a Demo for {university.name}
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
