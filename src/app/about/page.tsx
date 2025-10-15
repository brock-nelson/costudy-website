import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Student Retention & Engagement Platform",
  description: "CoStudy helps universities improve student retention through peer learning and collaborative tools. Evidence-based approach to student success.",
  keywords: [
    "student retention solution",
    "university engagement platform",
    "evidence-based learning",
    "peer learning research",
    "student success mission",
  ],
};

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Hero Section - Creative & Student-Forward */}
      <section className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-700 dark:via-purple-700 dark:to-pink-700 text-white py-20 overflow-hidden">
        {/* Playful background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Student-forward icons */}
          <div className="absolute top-12 left-12 text-5xl opacity-20 animate-float">🎓</div>
          <div className="absolute top-20 right-16 text-4xl opacity-20 animate-bounce">🤝</div>
          <div className="absolute bottom-16 left-1/4 text-4xl opacity-20 animate-pulse">💡</div>
          <div className="absolute bottom-20 right-1/3 text-3xl opacity-20 animate-spin-slow">⭐</div>

          {/* Geometric shapes */}
          <div className="absolute top-1/4 right-1/4 w-20 h-20 border-4 border-white/20 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 left-1/3 w-16 h-16 bg-white/10 rotate-45 animate-morph"></div>

          {/* Gradient orbs */}
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-gradient-to-tl from-yellow-400/20 to-transparent rounded-full blur-3xl animate-float"></div>

          {/* Dot pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 animate-pulse-slow">
                <span className="text-sm font-semibold">🌟 Built by educators, for educators</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              About CoStudy
            </h1>
            <p className="text-xl leading-relaxed drop-shadow-md text-white/95">
              We&apos;re on a mission to help students develop essential collaboration skills
              that prepare them for success in school, work, and life! 🚀
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16 relative">
        {/* Subtle background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-1/4 w-32 h-32 bg-gradient-to-br from-purple-200/20 dark:from-purple-600/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-1/4 w-40 h-40 bg-gradient-to-tr from-blue-200/20 dark:from-blue-600/20 to-transparent rounded-full blur-2xl"></div>
        </div>
        <div className="max-w-4xl mx-auto relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#6B3DCB] dark:text-[#E9EEFF]">Our Mission</h2>
          <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-4 leading-relaxed">
            Student collaboration is essential for deep learning, yet it&apos;s often left to chance.
            Teams struggle with unclear expectations, poor communication, and unequal participation.
          </p>
          <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-4 leading-relaxed">
            CoStudy provides the structure and tools that make teamwork work. We help students
            establish clear expectations, track their growth, and give meaningful feedback to
            their teammates.
          </p>
          <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
            By making collaboration visible and intentional, we empower students to build
            skills that will serve them throughout their academic and professional careers.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-[#EDE7F9] dark:bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#6B3DCB] dark:text-[#E9EEFF]">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-white dark:bg-[#1a1a1a] w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E9EEFF]">Student-Centered</h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                Everything we build is designed to help students grow and succeed.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white dark:bg-[#1a1a1a] w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
                <span className="text-4xl">🔬</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E9EEFF]">Evidence-Based</h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                Our approach is grounded in research on effective learning and teamwork.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white dark:bg-[#1a1a1a] w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E9EEFF]">Collaborative</h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                We partner with educators to continuously improve and innovate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16 relative">
        {/* Subtle background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-10 w-28 h-28 bg-gradient-to-br from-teal-200/20 dark:from-teal-600/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-36 h-36 bg-gradient-to-tl from-cyan-200/20 dark:from-cyan-600/20 to-transparent rounded-full blur-2xl"></div>
        </div>
        <div className="max-w-4xl mx-auto relative">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#6B3DCB] dark:text-[#E9EEFF]">Our Team</h2>
          <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] text-center mb-12 leading-relaxed">
            We&apos;re a team of educators, researchers, and technologists passionate about
            transforming how students learn to work together.
          </p>
          {/* Placeholder for team members - can be expanded later */}
          <div className="text-center">
            <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Founded by educators with decades of experience in collaborative learning,
              CoStudy brings together expertise in pedagogy, learning science, and technology.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section - Playful & Energetic */}
      <section className="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-700 dark:via-teal-700 dark:to-cyan-700 text-white py-16 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 left-10 text-4xl opacity-20 animate-bounce">🚀</div>
          <div className="absolute top-12 right-12 text-3xl opacity-20 animate-pulse">✨</div>
          <div className="absolute bottom-10 left-1/4 text-4xl opacity-20 animate-spin-slow">🎯</div>
          <div className="absolute bottom-8 right-1/4 text-3xl opacity-20 animate-float">💫</div>

          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-white/10 rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg">
            Join Us in Transforming Student Collaboration! 🎉
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md text-white/95">
            Whether you&apos;re an educator, administrator, or student, we&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group bg-white text-teal-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center gap-2">
                Get in Touch
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link
              href="/demo"
              className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all hover:scale-105 border-2 border-white/50 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center gap-2">
                Schedule a Demo
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
