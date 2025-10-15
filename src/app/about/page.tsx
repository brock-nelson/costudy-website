import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About CoStudy - Building the Future of Student Success",
  description: "Founded in 2023, CoStudy makes peer learning accessible to every student, everywhere. Learn about our mission, values, team, and commitment to student privacy. Join 50+ universities transforming student success.",
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
              Building the Future of Student Success
            </h1>
            <p className="text-xl leading-relaxed drop-shadow-md text-white/95">
              We believe every student deserves the support to thrive
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="container mx-auto px-4 py-16 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-200/20 dark:from-blue-600/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-gradient-to-tr from-purple-200/20 dark:from-purple-600/20 to-transparent rounded-full blur-2xl"></div>
        </div>
        <div className="max-w-4xl mx-auto relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#6B3DCB] dark:text-[#E9EEFF]">Our Story</h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">Founded: 2023</h3>
              <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                We launched CoStudy with a clear mission to transform how students collaborate and learn together.
              </p>
            </div>
            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">Why We Started</h3>
              <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                We saw students struggling to connect in 200-person lectures. Study groups formed by chance,
                not by design. Students who needed collaboration most often missed out entirely. We knew there
                had to be a better way to help every student find their learning community.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-xl shadow-md border-2 border-purple-200 dark:border-purple-700">
              <h3 className="text-xl font-bold mb-2 text-[#6B3DCB] dark:text-[#E9EEFF]">Our Mission</h3>
              <p className="text-lg text-[#2D3748] dark:text-[#E9EEFF] leading-relaxed font-semibold">
                Make peer learning accessible to every student, everywhere
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl shadow-md border-2 border-blue-200 dark:border-blue-700">
              <h3 className="text-xl font-bold mb-2 text-[#6B3DCB] dark:text-[#E9EEFF]">Our Vision</h3>
              <p className="text-lg text-[#2D3748] dark:text-[#E9EEFF] leading-relaxed font-semibold">
                A world where no student learns alone
              </p>
            </div>
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
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            <div className="text-center">
              <div className="bg-white dark:bg-[#2a2a2a] w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E9EEFF]">Students First</h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                Every decision prioritizes student success
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white dark:bg-[#2a2a2a] w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
                <span className="text-4xl">📊</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E9EEFF]">Data-Driven</h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                We measure what matters: retention and engagement
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white dark:bg-[#2a2a2a] w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E9EEFF]">Partnership</h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                We&apos;re an extension of your university team
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white dark:bg-[#2a2a2a] w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
                <span className="text-4xl">💡</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E9EEFF]">Innovation</h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                Constantly improving based on feedback
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white dark:bg-[#2a2a2a] w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
                <span className="text-4xl">♿</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E9EEFF]">Accessibility</h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                Learning should be available to everyone
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
        <div className="max-w-6xl mx-auto relative">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-[#6B3DCB] dark:text-[#E9EEFF]">Our Team</h2>
          <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] text-center mb-12 leading-relaxed italic">
            We&apos;ve been in your shoes
          </p>

          {/* Team Members Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Team Member 1 - Placeholder */}
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                ?
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">Founder Name</h3>
              <p className="text-sm text-[#6B3DCB] dark:text-[#A78BFA] font-semibold mb-3">Co-Founder & CEO</p>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mb-4">
                Former professor with 15+ years in higher education. Ph.D. in Educational Technology.
                Passionate about evidence-based learning practices.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
            </div>

            {/* Team Member 2 - Placeholder */}
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                ?
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">Founder Name</h3>
              <p className="text-sm text-[#6B3DCB] dark:text-[#A78BFA] font-semibold mb-3">Co-Founder & CTO</p>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mb-4">
                Software engineer with experience building education technology at scale.
                Former university teaching assistant who understands student needs.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
            </div>

            {/* Team Member 3 - Placeholder */}
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                ?
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">Team Member Name</h3>
              <p className="text-sm text-[#6B3DCB] dark:text-[#A78BFA] font-semibold mb-3">Head of Product</p>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mb-4">
                Product designer with deep expertise in student experience design.
                Former academic advisor with firsthand knowledge of student challenges.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>

          <div className="text-center bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-xl">
            <p className="text-lg text-[#2D3748] dark:text-[#E9EEFF] leading-relaxed">
              Founded by educators with decades of combined experience in collaborative learning,
              CoStudy brings together expertise in pedagogy, learning science, and technology.
            </p>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="bg-[#EDE7F9] dark:bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#6B3DCB] dark:text-[#E9EEFF]">Our Commitment</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#2a2a2a] p-6 rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">FERPA Compliant from Day One</h3>
                    <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                      We built our platform with student privacy at its core, ensuring full compliance with federal regulations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#2a2a2a] p-6 rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">Student Privacy is Non-Negotiable</h3>
                    <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                      Your students&apos; data belongs to them. We never sell data or use it for purposes beyond improving their learning experience.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#2a2a2a] p-6 rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">Transparent Data Practices</h3>
                    <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                      We&apos;re open about what data we collect, how we use it, and how we protect it. No hidden practices or fine print surprises.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#2a2a2a] p-6 rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">Open to Feedback & Co-Creation</h3>
                    <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                      We partner closely with educators to continuously improve. Your insights directly shape our product roadmap.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* By the Numbers Section */}
      <section className="container mx-auto px-4 py-16 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-1/3 w-32 h-32 bg-gradient-to-br from-emerald-200/20 dark:from-emerald-600/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-gradient-to-tr from-cyan-200/20 dark:from-cyan-600/20 to-transparent rounded-full blur-2xl"></div>
        </div>
        <div className="max-w-5xl mx-auto relative">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#6B3DCB] dark:text-[#E9EEFF]">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="text-center p-6 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-md">
              <div className="text-4xl font-bold text-[#6B3DCB] dark:text-[#A78BFA] mb-2">2023</div>
              <div className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">Founded</div>
            </div>

            <div className="text-center p-6 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-md">
              <div className="text-4xl font-bold text-[#6B3DCB] dark:text-[#A78BFA] mb-2">50+</div>
              <div className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">Universities</div>
            </div>

            <div className="text-center p-6 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-md">
              <div className="text-4xl font-bold text-[#6B3DCB] dark:text-[#A78BFA] mb-2">10K+</div>
              <div className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">Students Supported</div>
            </div>

            <div className="text-center p-6 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-md">
              <div className="text-4xl font-bold text-[#6B3DCB] dark:text-[#A78BFA] mb-2">12</div>
              <div className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">Team Members</div>
            </div>

            <div className="text-center p-6 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-md col-span-2 md:col-span-1">
              <div className="text-4xl font-bold text-[#6B3DCB] dark:text-[#A78BFA] mb-2">15%</div>
              <div className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">Avg Retention Improvement</div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl shadow-md col-span-2 md:col-span-3 lg:col-span-1">
              <div className="text-4xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-2">∞</div>
              <div className="text-sm text-[#2D3748] dark:text-[#E9EEFF] font-semibold">Impact Potential</div>
            </div>
          </div>
        </div>
      </section>

      {/* Press & Recognition Section */}
      <section className="bg-[#EDE7F9] dark:bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#6B3DCB] dark:text-[#E9EEFF]">Press & Recognition</h2>

            <div className="space-y-6 mb-12">
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 p-6 rounded-xl border-2 border-yellow-300 dark:border-yellow-700">
                <span className="text-3xl mb-2 block">🏆</span>
                <p className="text-lg font-bold text-[#2D3748] dark:text-[#E9EEFF]">
                  Winner: Best Student Success Platform 2024
                </p>
              </div>

              <div className="bg-white dark:bg-[#2a2a2a] p-6 rounded-xl shadow-md">
                <span className="text-3xl mb-2 block">📰</span>
                <p className="text-lg font-semibold text-[#2D3748] dark:text-[#E9EEFF]">
                  Featured in EdTech Magazine
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-[#4A5568] dark:text-[#A0AEC0] mb-4">As seen in:</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                {/* Placeholder for press logos */}
                <div className="w-32 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Press Logo</span>
                </div>
                <div className="w-32 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Press Logo</span>
                </div>
                <div className="w-32 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Press Logo</span>
                </div>
              </div>
            </div>
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
            Join the universities transforming student success
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md text-white/95">
            Ready to see how CoStudy can help your students thrive through better collaboration?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="group bg-white text-teal-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center gap-2">
                Schedule Demo
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
            <Link
              href="/resources"
              className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all hover:scale-105 border-2 border-white/50 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center gap-2">
                View Case Studies
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
