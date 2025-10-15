import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// Case study data type
interface CaseStudy {
  slug: string;
  universityName: string;
  department: string;
  studentCount: number;
  location: string;
  universityType: string;
  challenge: {
    title: string;
    description: string;
    bullets: string[];
  };
  solution: {
    title: string;
    description: string;
    bullets: string[];
  };
  results: {
    title: string;
    description: string;
    metrics: Array<{
      label: string;
      value: string;
      change?: string;
    }>;
    bullets: string[];
  };
  quotes: Array<{
    text: string;
    author: string;
    title: string;
    image?: string;
  }>;
  keyTakeaways: string[];
}

// Case studies data - in production, this would come from a CMS
const caseStudies: Record<string, CaseStudy> = {
  "stanford-cs-department": {
    slug: "stanford-cs-department",
    universityName: "Stanford University",
    department: "Computer Science Department",
    studentCount: 850,
    location: "Stanford, CA",
    universityType: "Large Research University",
    challenge: {
      title: "The Challenge",
      description: "Stanford's CS department faced significant obstacles in fostering student collaboration within large lecture courses.",
      bullets: [
        "Large lecture courses with 200+ students per class",
        "Students felt isolated and struggled to form effective study groups",
        "TA office hours were consistently overwhelmed with questions",
        "Only 12% of students were participating in study groups before CoStudy"
      ]
    },
    solution: {
      title: "The Solution",
      description: "The department deployed CoStudy across three flagship computer science courses to systematically connect students.",
      bullets: [
        "Deployed CoStudy for CS 101, CS 106A, and CS 106B",
        "Reached 850 students across the three courses",
        "Auto-created study groups directly from course rosters",
        "Integrated with existing Canvas LMS for seamless adoption"
      ]
    },
    results: {
      title: "The Results",
      description: "The implementation delivered measurable improvements in student engagement and satisfaction.",
      metrics: [
        { label: "Study Group Participation", value: "78%", change: "vs. 12% before" },
        { label: "Avg. Study Sessions", value: "2.3x", change: "per week" },
        { label: "Course Evaluations", value: "+23%", change: "improvement" },
        { label: "Student Satisfaction", value: "89%", change: "positive feedback" }
      ],
      bullets: [
        "Study group participation increased from 12% to 78%",
        "Students met for study sessions an average of 2.3 times per week",
        "Course evaluations improved by 23% across all three courses",
        "Students reported feeling more connected to their peers and the material"
      ]
    },
    quotes: [
      {
        text: "CoStudy solved our biggest challenge: helping students connect in 200-person lectures. The data shows it works.",
        author: "Dr. Sarah Chen",
        title: "CS 101 Professor"
      },
      {
        text: "I finally found people who get it. My study group became my support system throughout the quarter.",
        author: "Jessica Martinez",
        title: "CS 106A Student"
      }
    ],
    keyTakeaways: [
      "Structured tools can dramatically increase collaboration in large classes",
      "Auto-matching reduces the friction of forming study groups",
      "Regular study sessions correlate with improved course satisfaction",
      "LMS integration is critical for faculty and student adoption"
    ]
  },
  "ucla-pre-med": {
    slug: "ucla-pre-med",
    universityName: "UCLA",
    department: "Pre-Med Program",
    studentCount: 450,
    location: "Los Angeles, CA",
    universityType: "Large Public Research University",
    challenge: {
      title: "The Challenge",
      description: "UCLA's pre-med program struggled with high attrition rates in a competitive, high-stress environment.",
      bullets: [
        "Highly competitive environment creating student isolation",
        "Students were afraid to ask for help or appear weak",
        "22% drop rate from the pre-med track annually",
        "Limited peer support structures in place"
      ]
    },
    solution: {
      title: "The Solution",
      description: "The program piloted CoStudy in Organic Chemistry I & II to create supportive study accountability pods.",
      bullets: [
        "Piloted CoStudy for Organic Chemistry I & II",
        "Created 'study accountability pods' of 4-6 students each",
        "Reached 450 pre-med students across both courses",
        "Emphasized collaborative learning over competition"
      ]
    },
    results: {
      title: "The Results",
      description: "The pilot demonstrated significant improvements in retention and student well-being, with compelling ROI.",
      metrics: [
        { label: "Drop Rate", value: "14%", change: "down from 22%" },
        { label: "Stress Reduction", value: "67%", change: "less stress reported" },
        { label: "Group Exam Prep", value: "81%", change: "up from 18%" },
        { label: "ROI", value: "$1.2M", change: "in retained tuition" }
      ],
      bullets: [
        "Drop rate decreased from 22% to 14% (8 percentage point improvement)",
        "67% of students reported significantly reduced stress levels",
        "Group exam preparation increased from 18% to 81% of students",
        "Estimated $1.2M in retained tuition based on 8% retention improvement"
      ]
    },
    quotes: [
      {
        text: "The ROI is undeniable. For every dollar spent on CoStudy, we retain $12 in tuition from students who would have dropped out.",
        author: "Maria Rodriguez",
        title: "Director of Academic Success"
      },
      {
        text: "My study pod became my lifeline. We helped each other succeed instead of competing.",
        author: "David Kim",
        title: "Pre-Med Student"
      }
    ],
    keyTakeaways: [
      "Structured peer support can significantly reduce attrition in high-stakes programs",
      "Creating accountability pods transforms competitive environments into collaborative ones",
      "Mental health and academic success are deeply interconnected",
      "The financial ROI of retention interventions can be substantial"
    ]
  },
  "community-college-system": {
    slug: "community-college-system",
    universityName: "Community College System",
    department: "System-Wide Deployment",
    studentCount: 12000,
    location: "Multi-campus system",
    universityType: "Community College System",
    challenge: {
      title: "The Challenge",
      description: "A community college system serving 15,000 students faced unique obstacles with their diverse, non-traditional student population.",
      bullets: [
        "15,000 students spread across 3 campuses",
        "60% of students work full-time with severe scheduling conflicts",
        "Low engagement rates in online courses",
        "Students juggling work, family, and education responsibilities"
      ]
    },
    solution: {
      title: "The Solution",
      description: "The system deployed CoStudy across all three campuses with flexible hybrid study options.",
      bullets: [
        "System-wide deployment across all 3 campuses",
        "Hybrid model supporting both in-person and remote study groups",
        "Calendar integration for flexible scheduling around work/life commitments",
        "Mobile-first design for students on the go"
      ]
    },
    results: {
      title: "The Results",
      description: "The system-wide implementation achieved remarkable adoption and measurable improvements in course completion.",
      metrics: [
        { label: "Student Adoption", value: "80%", change: "12,000 active users" },
        { label: "Online Completion", value: "81%", change: "up from 68%" },
        { label: "NPS Score", value: "73", change: "would recommend" },
        { label: "Study Sessions", value: "45K", change: "total sessions" }
      ],
      bullets: [
        "12,000 students adopted CoStudy (80% adoption rate)",
        "Online course completion increased from 68% to 81%",
        "Net Promoter Score of 73 (students would recommend to friends)",
        "45,000+ study sessions conducted in the first semester"
      ]
    },
    quotes: [
      {
        text: "CoStudy met our students where they are: working full-time, juggling family, studying late at night. It works.",
        author: "James Thompson",
        title: "VP of Student Affairs"
      },
      {
        text: "Being able to study with classmates at 10 PM after my shift was a game-changer. I couldn't have done it without this.",
        author: "Ana Gutierrez",
        title: "Nursing Student"
      }
    ],
    keyTakeaways: [
      "Flexible scheduling is essential for non-traditional students",
      "Hybrid learning models can dramatically improve course completion",
      "Mobile accessibility is crucial for working students",
      "System-wide adoption requires strong leadership support"
    ]
  }
};

// Generate static params for all case studies
export async function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({
    slug,
  }));
}

// Generate metadata for each case study
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug];

  if (!study) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${study.universityName} Case Study - ${study.department} | CoStudy`,
    description: `Learn how ${study.universityName} improved student outcomes with CoStudy. ${study.results.metrics[0].label}: ${study.results.metrics[0].value}.`,
    openGraph: {
      title: `${study.universityName} Success Story | CoStudy`,
      description: `${study.challenge.description}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies[slug];

  if (!study) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* JSON-LD Schema Markup for Case Study */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CaseStudy",
            name: `${study.universityName} - ${study.department} Case Study`,
            description: study.challenge.description,
            url: `https://costudy.co/case-studies/${study.slug}`,
            about: {
              "@type": "Product",
              name: "CoStudy",
              description: "Student collaboration platform",
            },
            author: {
              "@type": "Organization",
              name: "CoStudy",
              url: "https://costudy.co",
            },
            citation: study.quotes.map(quote => ({
              "@type": "CreativeWork",
              text: quote.text,
              author: {
                "@type": "Person",
                name: quote.author,
                jobTitle: quote.title,
              },
            })),
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800 text-white py-20">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 right-20 text-5xl opacity-20 animate-float">📈</div>
          <div className="absolute bottom-20 left-16 text-4xl opacity-20 animate-pulse">🎓</div>
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Link href="/case-studies" className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Case Studies
              </Link>
            </div>

            {/* University Info */}
            <div className="mb-6">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                {study.universityName}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-4">
                {study.department}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  {study.studentCount.toLocaleString()} Students
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {study.location}
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  {study.universityType}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics Bar */}
      <section className="bg-[#EDE7F9] dark:bg-[#1a1a1a] py-8 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {study.results.metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm font-medium text-[#2D3748] dark:text-[#E9EEFF] mb-1">
                    {metric.label}
                  </div>
                  {metric.change && (
                    <div className="text-xs text-[#4A5568] dark:text-[#A0AEC0]">
                      {metric.change}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Challenge Section */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] dark:text-[#E9EEFF] mb-6">
              {study.challenge.title}
            </h2>
            <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-6 leading-relaxed">
              {study.challenge.description}
            </p>
            <ul className="space-y-3">
              {study.challenge.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#4A5568] dark:text-[#A0AEC0]">{bullet}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Solution Section */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] dark:text-[#E9EEFF] mb-6">
              {study.solution.title}
            </h2>
            <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-6 leading-relaxed">
              {study.solution.description}
            </p>
            <ul className="space-y-3">
              {study.solution.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#4A5568] dark:text-[#A0AEC0]">{bullet}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Results Section */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] dark:text-[#E9EEFF] mb-6">
              {study.results.title}
            </h2>
            <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-6 leading-relaxed">
              {study.results.description}
            </p>
            <ul className="space-y-3">
              {study.results.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#4A5568] dark:text-[#A0AEC0]">{bullet}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Quotes Section */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] dark:text-[#E9EEFF] mb-8">
              What They&rsquo;re Saying
            </h2>
            <div className="space-y-6">
              {study.quotes.map((quote, index) => (
                <div key={index} className="bg-[#EDE7F9] dark:bg-[#1a1a1a] border-l-4 border-[#6B3DCB] dark:border-[#A78BFA] p-6 rounded-r-lg">
                  <blockquote className="text-lg text-[#2D3748] dark:text-[#E9EEFF] mb-4 italic leading-relaxed">
                    &ldquo;{quote.text}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                      {quote.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-[#2D3748] dark:text-[#E9EEFF]">
                        {quote.author}
                      </div>
                      <div className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">
                        {quote.title}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] dark:text-[#E9EEFF] mb-6">
              Key Takeaways
            </h2>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
              <ul className="space-y-3">
                {study.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#6B3DCB] dark:text-[#A78BFA] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-[#2D3748] dark:text-[#E9EEFF] font-medium">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Share & Download Section */}
          <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-2">
                  Share this case study
                </h3>
                <div className="flex gap-3">
                  <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </button>
                </div>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                </svg>
                Download PDF
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            See CoStudy in Action
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Schedule a personalized demo to learn how CoStudy can transform student success at your institution.
          </p>
          <Link
            href="/demo"
            className="inline-block px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-50 transition-all hover:scale-105 shadow-lg"
          >
            Schedule Your Demo
          </Link>
        </div>
      </section>
    </div>
  );
}
